BEGIN;

DROP VIEW IF EXISTS hall_of_fame_view CASCADE;
DROP VIEW IF EXISTS student_score_detail_view CASCADE;

ALTER TABLE animals
    DROP CONSTRAINT IF EXISTS fk_animals_on_course_group;

ALTER TABLE animals
    DROP CONSTRAINT IF EXISTS fk_animals_on_student;

CREATE TABLE students_course_groups
(
    animal_id       BIGINT,
    student_id      BIGINT NOT NULL,
    course_group_id BIGINT NOT NULL,
    CONSTRAINT pk_students_course_groups PRIMARY KEY (student_id, course_group_id)
);

ALTER TABLE students_course_groups
    ADD CONSTRAINT uc_students_course_groups_animal UNIQUE (animal_id);

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_students_course_groups_on_animal
        FOREIGN KEY (animal_id) REFERENCES animals (id) ON DELETE SET NULL;

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_students_course_groups_on_course_group
        FOREIGN KEY (course_group_id) REFERENCES course_groups (id) ON DELETE CASCADE;

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_students_course_groups_on_student
        FOREIGN KEY (student_id) REFERENCES students (user_id) ON DELETE CASCADE;

INSERT INTO students_course_groups (student_id, course_group_id, animal_id)
SELECT
    a.student_id,
    a.course_group_id,
    a.id AS animal_id
FROM animals a
WHERE a.student_id IS NOT NULL
  AND a.course_group_id IS NOT NULL;

ALTER TABLE animals
    DROP COLUMN IF EXISTS course_group_id;

ALTER TABLE animals
    DROP COLUMN IF EXISTS student_id;

CREATE INDEX idx_students_course_groups_student ON students_course_groups(student_id);
CREATE INDEX idx_students_course_groups_course_group ON students_course_groups(course_group_id);

CREATE OR REPLACE VIEW student_score_detail_view
            (id, student_id, animal_id, event_section_id, event_section_name, raw_xp, flat_bonus, percentage_bonus)
AS
WITH base AS (
    SELECT a.id    AS animal_id,
           scg.student_id,
           es.id   AS event_section_id,
           es.name AS event_section_name
    FROM students_course_groups scg
             JOIN animals a ON a.id = scg.animal_id
             JOIN course_groups cg ON cg.id = scg.course_group_id
             JOIN event_sections es ON es.course_id = cg.course_id
    WHERE scg.animal_id IS NOT NULL
),
     points AS (
         SELECT g.animal_id,
                ge.event_section_id,
                SUM(cg.xp) AS raw_xp
         FROM grades g
                  JOIN criteria_grades cg ON cg.grade_id = g.id
                  JOIN gradable_events ge ON ge.id = g.gradable_event_id
         GROUP BY g.animal_id, ge.event_section_id
     ),
     awarded AS (
         SELECT g.animal_id,
                ge.event_section_id,
                ar.reward_id
         FROM grades g
                  JOIN criteria_grades cg ON cg.grade_id = g.id
                  JOIN assigned_rewards ar ON ar.criterion_grade_id = cg.id
                  JOIN gradable_events ge ON ge.id = g.gradable_event_id
                  JOIN items it ON it.reward_id = ar.reward_id
         WHERE it.event_section_id = ge.event_section_id
     ),
     bonuses AS (
         SELECT a.animal_id,
                a.event_section_id,
                COALESCE(SUM(pbi.percentage_bonus)::numeric, 0.0) AS percentage_bonus
         FROM awarded a
                  LEFT JOIN flat_bonus_items fbi ON fbi.item_id = a.reward_id
                  LEFT JOIN percentage_bonus_items pbi ON pbi.item_id = a.reward_id
         GROUP BY a.animal_id, a.event_section_id
     )
SELECT (b.animal_id::text || '-'::text || b.event_section_id::text) AS id,
       b.student_id,
       b.animal_id,
       b.event_section_id,
       b.event_section_name,
       COALESCE(p.raw_xp, 0::numeric) AS raw_xp,
       0.0 AS flat_bonus,
       COALESCE(bn.percentage_bonus, 0.0) AS percentage_bonus
FROM base b
         LEFT JOIN points p ON p.animal_id = b.animal_id AND p.event_section_id = b.event_section_id
         LEFT JOIN bonuses bn ON bn.animal_id = b.animal_id AND bn.event_section_id = b.event_section_id;

CREATE OR REPLACE VIEW hall_of_fame_view
            (animal_id, animal_name, student_id, student_name, group_name, course_id, total_bonus_sum, total_xp_sum,
             position, evolution_stage, image_url)
AS
WITH scored AS (
    SELECT a.id AS animal_id,
           a.name AS animal_name,
           scg.student_id,
           (u.first_name || ' ' || u.last_name) AS student_name,
           cg.name AS group_name,
           cg.course_id,
           COALESCE(ssd.raw_xp, 0::numeric) AS raw_xp,
           COALESCE(ssd.flat_bonus, 0::numeric) AS flat_bonus,
           (COALESCE(ssd.raw_xp, 0::numeric) + COALESCE(ssd.flat_bonus, 0::numeric)) *
           COALESCE(ssd.percentage_bonus, 0::numeric) / 100.0 AS percentage_bonus_xp
    FROM students_course_groups scg
             JOIN animals a ON a.id = scg.animal_id
             JOIN students s ON s.user_id = scg.student_id
             JOIN users u ON u.id = s.user_id
             JOIN course_groups cg ON cg.id = scg.course_group_id
             LEFT JOIN student_score_detail_view ssd ON ssd.animal_id = a.id
             LEFT JOIN event_sections es ON es.id = ssd.event_section_id
    WHERE scg.animal_id IS NOT NULL
),
     summed AS (
         SELECT scored.animal_id,
                MAX(scored.animal_name) AS animal_name,
                MAX(scored.student_id) AS student_id,
                MAX(scored.student_name) AS student_name,
                MAX(scored.group_name) AS group_name,
                MAX(scored.course_id) AS course_id,
                SUM(scored.flat_bonus) AS flat_bonus_sum,
                SUM(scored.percentage_bonus_xp) AS percentage_bonus_sum,
                SUM(scored.raw_xp + scored.flat_bonus + scored.percentage_bonus_xp) AS total_xp_sum
         FROM scored
         GROUP BY scored.animal_id
     ),
     ranked AS (
         SELECT summed.animal_id,
                summed.animal_name,
                summed.student_id,
                summed.student_name,
                summed.group_name,
                summed.course_id,
                summed.flat_bonus_sum,
                summed.percentage_bonus_sum,
                summed.total_xp_sum,
                ROW_NUMBER() OVER (PARTITION BY summed.course_id ORDER BY summed.total_xp_sum DESC, summed.animal_name, summed.animal_id) AS position
         FROM summed
     ),
     evolution_mapping AS (
         SELECT DISTINCT ON (r.animal_id)
             r.animal_id,
             r.animal_name,
             r.student_id,
             r.student_name,
             r.group_name,
             r.course_id,
             r.flat_bonus_sum + r.percentage_bonus_sum AS total_bonus_sum,
             r.total_xp_sum,
             r.position,
             es.name AS evolution_stage,
             es.image_url
         FROM ranked r
                  LEFT JOIN evolution_stages es
                            ON es.course_id = r.course_id
                                AND es.min_xp <= r.total_xp_sum
         ORDER BY r.animal_id, es.min_xp DESC
     )
SELECT animal_id,
       animal_name,
       student_id,
       student_name,
       group_name,
       course_id,
       total_bonus_sum,
       total_xp_sum,
       position,
       evolution_stage,
       image_url
FROM evolution_mapping;

COMMIT;
