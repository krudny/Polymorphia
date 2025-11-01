DROP VIEW hall_of_fame_view;
DROP VIEW student_score_detail_view;

ALTER TABLE assigned_items
    ALTER COLUMN bonus_xp TYPE numeric(4,1)
        USING bonus_xp::numeric(4,1);

ALTER TABLE assigned_items
    ALTER COLUMN bonus_xp SET NOT NULL,
    ALTER COLUMN bonus_xp SET DEFAULT 0;

ALTER TABLE gradable_events
    ALTER COLUMN order_index TYPE BIGINT
        USING order_index::BIGINT;

ALTER TABLE gradable_events
    ALTER COLUMN road_map_order_index TYPE BIGINT
        USING road_map_order_index::BIGINT;


CREATE OR REPLACE VIEW student_score_detail_view AS
WITH base AS (SELECT scg.animal_id  AS animal_id,
                     scg.student_id AS student_id,
                     es.id          AS event_section_id,
                     es.name        AS event_section_name
              FROM students_course_groups scg
                       JOIN course_groups cg ON cg.id = scg.course_group_id
                       JOIN event_sections es ON es.course_id = cg.course_id
              WHERE scg.animal_id IS NOT NULL),
     points AS (SELECT g.animal_id,
                       ge.event_section_id,
                       SUM(cg.xp) AS raw_xp
                FROM grades g
                         JOIN criteria_grades cg ON cg.grade_id = g.id
                         JOIN gradable_events ge ON ge.id = g.gradable_event_id
                GROUP BY g.animal_id, ge.event_section_id),
     awarded AS (SELECT a.id  AS animal_id,
                        es.id AS event_section_id,
                        ar.reward_id,
                        ar.id AS assigned_reward_id
                 FROM assigned_rewards ar
                          JOIN criteria_grades cg ON cg.id = ar.criterion_grade_id
                          JOIN grades g ON g.id = cg.grade_id
                          JOIN gradable_events ge ON ge.id = g.gradable_event_id
                          JOIN items it ON it.reward_id = ar.reward_id
                          JOIN animals a ON g.animal_id = a.id
                          JOIN students_course_groups scg ON scg.animal_id = a.id
                          JOIN course_groups cg2 ON cg2.id = scg.course_group_id
                          JOIN event_sections es ON es.course_id = cg2.course_id
                 WHERE it.event_section_id = es.id),
     bonuses AS (SELECT a.animal_id,
                        a.event_section_id,
                        COALESCE(SUM(pbi.percentage_bonus)::numeric, 0.0) AS percentage_bonus,
                        COALESCE(SUM(ai.bonus_xp), 0.0)                   AS flat_bonus
                 FROM awarded a
                          LEFT JOIN assigned_items ai ON ai.assigned_reward_id = a.assigned_reward_id
                          LEFT JOIN percentage_bonus_items pbi ON pbi.item_id = a.reward_id
                 GROUP BY a.animal_id, a.event_section_id)
SELECT (b.animal_id::text || '-' || b.event_section_id::text) AS id,
       b.student_id,
       b.animal_id,
       b.event_section_id,
       b.event_section_name,
       COALESCE(p.raw_xp, 0.0)                                AS raw_xp,
       COALESCE(bn.flat_bonus, 0.0)                           AS flat_bonus,
       COALESCE(bn.percentage_bonus, 0.0)                     AS percentage_bonus
FROM base b
         LEFT JOIN points p ON p.animal_id = b.animal_id AND p.event_section_id = b.event_section_id
         LEFT JOIN bonuses bn ON bn.animal_id = b.animal_id AND bn.event_section_id = b.event_section_id;
create view hall_of_fame_view
            (animal_id, animal_name, student_id, student_name, group_name, course_id, total_bonus_sum, total_xp_sum,
             position, evolution_stage, image_url)
as
WITH scored AS (SELECT a.id                                                   AS animal_id,
                       a.name                                                 AS animal_name,
                       scg.student_id,
                       (u.first_name::text || ' '::text) || u.last_name::text AS student_name,
                       cg.name                                                AS group_name,
                       cg.course_id,
                       COALESCE(ssd.raw_xp, 0::numeric)                       AS raw_xp,
                       COALESCE(ssd.flat_bonus, 0::numeric)                   AS flat_bonus,
                       (COALESCE(ssd.raw_xp, 0::numeric) + COALESCE(ssd.flat_bonus, 0::numeric)) *
                       COALESCE(ssd.percentage_bonus, 0::numeric) / 100.0     AS percentage_bonus_xp
                FROM students_course_groups scg
                         JOIN animals a ON a.id = scg.animal_id
                         JOIN students s ON s.user_id = scg.student_id
                         JOIN users u ON u.id = s.user_id
                         JOIN course_groups cg ON cg.id = scg.course_group_id
                         LEFT JOIN student_score_detail_view ssd ON ssd.animal_id = a.id
                         LEFT JOIN event_sections es ON es.id = ssd.event_section_id),
     summed AS (SELECT scored.animal_id,
                       max(scored.animal_name::text)                                       AS animal_name,
                       max(scored.student_id)                                              AS student_id,
                       max(scored.student_name)                                            AS student_name,
                       max(scored.group_name::text)                                        AS group_name,
                       max(scored.course_id)                                               AS course_id,
                       sum(scored.flat_bonus)                                              AS flat_bonus_sum,
                       sum(scored.percentage_bonus_xp)                                     AS percentage_bonus_sum,
                       sum(scored.raw_xp + scored.flat_bonus + scored.percentage_bonus_xp) AS total_xp_sum
                FROM scored
                GROUP BY scored.animal_id),
     ranked AS (SELECT summed.animal_id,
                       summed.animal_name,
                       summed.student_id,
                       summed.student_name,
                       summed.group_name,
                       summed.course_id,
                       summed.flat_bonus_sum,
                       summed.percentage_bonus_sum,
                       summed.total_xp_sum,
                       row_number()
                       OVER (PARTITION BY summed.course_id ORDER BY summed.total_xp_sum DESC, summed.animal_name, summed.animal_id) AS "position"
                FROM summed),
     evolution_mapping AS (SELECT DISTINCT ON (r.animal_id) r.animal_id,
                                                            r.animal_name,
                                                            r.student_id,
                                                            r.student_name,
                                                            r.group_name,
                                                            r.course_id,
                                                            r.flat_bonus_sum + r.percentage_bonus_sum AS total_bonus_sum,
                                                            r.total_xp_sum,
                                                            r."position",
                                                            es.name                                   AS evolution_stage,
                                                            es.image_url
                           FROM ranked r
                                    LEFT JOIN evolution_stages es
                                              ON es.course_id = r.course_id AND es.min_xp <= r.total_xp_sum
                           ORDER BY r.animal_id, es.min_xp DESC)
SELECT animal_id,
       animal_name,
       student_id,
       student_name,
       group_name,
       course_id,
       total_bonus_sum,
       total_xp_sum,
       "position",
       evolution_stage,
       image_url
FROM evolution_mapping;

