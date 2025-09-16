DROP VIEW IF EXISTS hall_of_fame_view;
DROP VIEW IF EXISTS student_score_detail_view;

CREATE VIEW student_score_detail_view AS
WITH base AS (SELECT a.id         AS animal_id,
                     a.student_id AS student_id,
                     es.id        AS event_section_id,
                     es.name      AS event_section_name
              FROM animals a
                       JOIN course_groups cg ON cg.id = a.course_group_id
                       JOIN event_sections es ON es.course_id = cg.course_id),
     points AS (SELECT g.animal_id,
                       ge.event_section_id,
                       SUM(cg.xp) AS raw_xp
                FROM grades g
                         JOIN criteria_grades cg ON cg.grade_id = g.id
                         JOIN gradable_events ge ON ge.id = g.gradable_event_id
                GROUP BY g.animal_id, ge.event_section_id),
     awarded AS (SELECT g.animal_id,
                        ge.event_section_id,
                        ar.reward_id
                 FROM grades g
                          JOIN criteria_grades cg ON cg.grade_id = g.id
                          JOIN assigned_rewards ar ON ar.criterion_grade_id = cg.id
                          JOIN gradable_events ge ON ge.id = g.gradable_event_id
                          JOIN items it ON it.reward_id = ar.reward_id
                 WHERE (it.event_section_id = ge.event_section_id)),
     bonuses AS (SELECT a.animal_id,
                        a.event_section_id,
                        COALESCE(SUM(pbi.percentage_bonus), 0.0) AS percentage_bonus
                 FROM awarded a
                          LEFT JOIN flat_bonus_items fbi ON fbi.item_id = a.reward_id
                          LEFT JOIN percentage_bonus_items pbi ON pbi.item_id = a.reward_id
                 GROUP BY a.animal_id, a.event_section_id)
SELECT (b.animal_id::text || '-' || b.event_section_id::text) AS id,
       b.student_id,
       b.animal_id,
       b.event_section_id,
       b.event_section_name,
       COALESCE(p.raw_xp, 0)                                  AS raw_xp,
       0.0                                                    AS flat_bonus,
       COALESCE(bn.percentage_bonus, 0.0)                     AS percentage_bonus
FROM base b
         LEFT JOIN points p ON p.animal_id = b.animal_id AND p.event_section_id = b.event_section_id
         LEFT JOIN bonuses bn ON bn.animal_id = b.animal_id AND bn.event_section_id = b.event_section_id;

CREATE VIEW hall_of_fame_view AS
WITH scored AS (SELECT scg.id                                        AS animal_id,
                       scg.name                                      AS animal_name,
                       scg.student_id                                AS student_id,
                       u.first_name || ' ' || u.last_name            AS student_name,
                       cg.name                                       AS group_name,
                       cg.course_id,
                       COALESCE(ssd.raw_xp, 0)                       AS raw_xp,
                       COALESCE(ssd.flat_bonus, 0)                   AS flat_bonus,
                       (COALESCE(ssd.raw_xp, 0) + COALESCE(ssd.flat_bonus, 0))
                           * COALESCE(ssd.percentage_bonus, 0) / 100 AS percentage_bonus_xp
                FROM animals scg
                         JOIN students s ON s.user_id = scg.student_id
                         JOIN users u ON u.id = s.user_id
                         JOIN course_groups cg ON cg.id = scg.course_group_id
                         LEFT JOIN student_score_detail_view ssd ON ssd.animal_id = scg.id
                         LEFT JOIN event_sections es ON es.id = ssd.event_section_id),
     summed AS (SELECT animal_id,
                       MAX(animal_name)                               AS animal_name,
                       MAX(student_id)                                AS student_id,
                       MAX(student_name)                              AS student_name,
                       MAX(group_name)                                AS group_name,
                       MAX(course_id)                                 AS course_id,
                       SUM(flat_bonus)                                AS flat_bonus_sum,
                       SUM(percentage_bonus_xp)                       AS percentage_bonus_sum,
                       SUM(raw_xp + flat_bonus + percentage_bonus_xp) AS total_xp_sum
                FROM scored
                GROUP BY animal_id),
     ranked AS (SELECT *,
                       ROW_NUMBER() OVER (
                           PARTITION BY course_id
                           ORDER BY total_xp_sum DESC,
                               animal_name,
                               animal_id
                           ) AS position
                FROM summed),
     evolution_mapping AS (SELECT DISTINCT ON (r.animal_id) r.animal_id,
                                                            r.animal_name,
                                                            r.student_id,
                                                            r.student_name,
                                                            r.group_name,
                                                            r.course_id,
                                                            r.flat_bonus_sum + r.percentage_bonus_sum AS total_bonus_sum,
                                                            r.total_xp_sum,
                                                            r.position,
                                                            es.name                                   AS evolution_stage,
                                                            es.image_url
                           FROM ranked r
                                    LEFT JOIN evolution_stages es
                                              ON es.course_id = r.course_id
                                                  AND es.min_xp <= r.total_xp_sum
                           ORDER BY r.animal_id, es.min_xp DESC)
SELECT *
FROM evolution_mapping;

