ALTER TABLE user_course_roles
DROP CONSTRAINT IF EXISTS fk_user_course_roles_on_user;

ALTER TABLE user_course_roles
    ADD CONSTRAINT fk_user_course_roles_on_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;

ALTER TABLE students
DROP CONSTRAINT IF EXISTS fk_students_on_user;

ALTER TABLE students
    ADD CONSTRAINT fk_students_on_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;

ALTER TABLE instructors
DROP CONSTRAINT IF EXISTS fk_instructors_on_user;

ALTER TABLE instructors
    ADD CONSTRAINT fk_instructors_on_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;

ALTER TABLE coordinators
DROP CONSTRAINT IF EXISTS fk_coordinators_on_user;

ALTER TABLE coordinators
    ADD CONSTRAINT fk_coordinators_on_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;

ALTER TABLE students_course_groups
DROP CONSTRAINT IF EXISTS fk_students_course_groups_on_student;

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_students_course_groups_on_student
        FOREIGN KEY (student_id)
            REFERENCES students(user_id)
            ON DELETE CASCADE;

ALTER TABLE students_course_groups
DROP CONSTRAINT IF EXISTS fk_students_course_groups_on_course_group;

ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_students_course_groups_on_course_group
        FOREIGN KEY (course_group_id)
            REFERENCES course_groups(id)
            ON DELETE CASCADE;

ALTER TABLE users
DROP CONSTRAINT IF EXISTS fk_users_on_preferred_course;

ALTER TABLE users
    ADD CONSTRAINT fk_users_on_preferred_course
        FOREIGN KEY (preferred_course_id)
            REFERENCES courses(id)
            ON DELETE SET NULL;

ALTER TABLE course_groups
    ALTER COLUMN instructor_id DROP NOT NULL;

ALTER TABLE course_groups
DROP CONSTRAINT IF EXISTS fk_course_groups_on_instructor;

ALTER TABLE course_groups
    ADD CONSTRAINT fk_course_groups_on_instructor
        FOREIGN KEY (instructor_id)
            REFERENCES instructors(user_id)
            ON DELETE SET NULL;