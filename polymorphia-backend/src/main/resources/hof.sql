CREATE TABLE hall_of_fame (
    animal_id bigint not null references students_course_groups(id),
    assignment_xp_sum numeric default 0.0, -- poprawić, jako default może suma
    project_xp_sum numeric default 0.0,
    test_xp_sum numeric default 0.0,
    flat_bonus_xp numeric default 0.0,
    percentage_bonus_xp numeric default 0.0
);