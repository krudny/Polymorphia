create or replace view student_score_detail_view
            (id, student_id, animal_id, event_section_id, event_section_name, raw_xp, flat_bonus, percentage_bonus) as
WITH base AS (SELECT scg.animal_id,
                     scg.student_id,
                     es.id   AS event_section_id,
                     es.name AS event_section_name
              FROM students_course_groups scg
                       JOIN course_groups cg ON cg.id = scg.course_group_id
                       JOIN event_sections es ON es.course_id = cg.course_id
              WHERE scg.animal_id IS NOT NULL),
     points AS (SELECT g.animal_id,
                       ge.event_section_id,
                       sum(cg.xp) AS raw_xp
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
     percentage_bonuses AS (SELECT a.animal_id,
                                   a.event_section_id,
                                   COALESCE(sum(pbi.percentage_bonus)::numeric, 0.0) AS percentage_bonus
                            FROM awarded a
                                     LEFT JOIN percentage_bonus_items pbi ON pbi.item_id = a.reward_id
                            GROUP BY a.animal_id, a.event_section_id),
     flat_bonuses AS (SELECT a.animal_id,
                             a.event_section_id,
                             COALESCE(sum(ai.bonus_xp), 0.0) AS flat_bonus
                      FROM awarded a
                               LEFT JOIN assigned_items ai ON ai.assigned_reward_id = a.assigned_reward_id
                               JOIN flat_bonus_items fbi ON fbi.item_id = a.reward_id
                      GROUP BY a.animal_id, a.event_section_id)
SELECT (b.animal_id::text || '-'::text) || b.event_section_id::text AS id,
       b.student_id,
       b.animal_id,
       b.event_section_id,
       b.event_section_name,
       COALESCE(p.raw_xp, 0.0)                                      AS raw_xp,
       COALESCE(fbn.flat_bonus, 0.0)                                AS flat_bonus,
       COALESCE(pbn.percentage_bonus, 0.0)                          AS percentage_bonus
FROM base b
         LEFT JOIN points p ON p.animal_id = b.animal_id AND p.event_section_id = b.event_section_id
         LEFT JOIN percentage_bonuses pbn ON pbn.animal_id = b.animal_id AND pbn.event_section_id = b.event_section_id
         LEFT JOIN flat_bonuses fbn ON fbn.animal_id = b.animal_id AND fbn.event_section_id = b.event_section_id;


