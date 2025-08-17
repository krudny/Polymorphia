CREATE VIEW student_score_detail_view AS
SELECT (a.id || '-' || es.id)::text        AS id,
       a.id                                AS animal_id,
       es.id                               AS event_section_id,
       es.name                             AS event_section_name,
       ROUND((RANDOM() * 10)::numeric, 2)  AS raw_xp,
       ROUND((RANDOM() * 2)::numeric, 2)   AS flat_bonus,
       ROUND((RANDOM() * 0.3)::numeric, 2) AS percentage_bonus
FROM students_course_groups a
         JOIN course_groups cg ON cg.id = a.course_group_id
         JOIN event_sections es ON es.course_id = cg.course_id;

CREATE VIEW hall_of_fame_view AS
WITH scored AS (SELECT scg.id                                                      AS animal_id,
                       scg.name                                                    AS animal_name,
                       u.first_name || ' ' || u.last_name                          AS student_name,
                       cg.name                                                     AS group_name,
                       cg.course_id,
                       COALESCE(ssd.raw_xp, 0)                                     AS raw_xp,
                       COALESCE(ssd.flat_bonus, 0)                                 AS flat_bonus,
                       COALESCE(ssd.raw_xp, 0) * COALESCE(ssd.percentage_bonus, 0) AS percentage_bonus_xp
                FROM students_course_groups scg
                         JOIN students s ON s.user_id = scg.student_id
                         JOIN users u ON u.id = s.user_id
                         JOIN course_groups cg ON cg.id = scg.course_group_id
                         LEFT JOIN student_score_detail_view ssd ON ssd.animal_id = scg.id
                         LEFT JOIN event_sections es ON es.id = ssd.event_section_id),
     summed AS (SELECT animal_id,
                       MAX(animal_name)                               AS animal_name,
                       MAX(student_name)                              AS student_name,
                       MAX(group_name)                                AS group_name,
                       MAX(course_id)                                 AS course_id,
                       SUM(flat_bonus)                                AS flat_bonus_sum,
                       SUM(percentage_bonus_xp)                       AS percentage_bonus_sum,
                       SUM(raw_xp + flat_bonus + percentage_bonus_xp) AS total_xp_sum
                FROM scored
                GROUP BY animal_id),
     ranked AS (SELECT *,
                       RANK() OVER (PARTITION BY course_id ORDER BY total_xp_sum DESC) AS position
                FROM summed),
     evolution_mapping AS (SELECT DISTINCT ON (r.animal_id) r.animal_id,
                                                            r.animal_name,
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
                           ORDER BY r.animal_id, es.min_xp DESC)
SELECT *
FROM evolution_mapping;

