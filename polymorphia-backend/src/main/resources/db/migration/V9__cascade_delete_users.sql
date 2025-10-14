ALTER TABLE students_course_groups
DROP CONSTRAINT IF EXISTS fk_student_id;

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_student_id
        FOREIGN KEY (student_id)
            REFERENCES students(user_id)
            ON DELETE CASCADE;

ALTER TABLE user_course_roles
DROP CONSTRAINT IF EXISTS fk_user_id;

ALTER TABLE user_course_roles
    ADD CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;