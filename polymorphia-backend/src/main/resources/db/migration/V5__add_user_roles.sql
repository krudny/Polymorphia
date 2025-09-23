ALTER TABLE assigned_items
    DROP CONSTRAINT assigned_items_assigned_chest_id_fkey;

CREATE TABLE user_course_roles
(
    role      VARCHAR(255) NOT NULL,
    user_id   BIGINT       NOT NULL,
    course_id BIGINT       NOT NULL,
    CONSTRAINT pk_user_course_roles PRIMARY KEY (user_id, course_id)
);

ALTER TABLE courses
    ADD coordinator_image_url VARCHAR(255);

ALTER TABLE courses
    ADD image_url VARCHAR(255);

ALTER TABLE courses
    ADD instructor_image_url VARCHAR(255);

ALTER TABLE users
    ADD preferred_course_id BIGINT;

ALTER TABLE users
    ADD CONSTRAINT FK_USERS_ON_PREFERRED_COURSE FOREIGN KEY (preferred_course_id) REFERENCES courses (id);

ALTER TABLE user_course_roles
    ADD CONSTRAINT FK_USER_COURSE_ROLES_ON_COURSE FOREIGN KEY (course_id) REFERENCES courses (id);

ALTER TABLE user_course_roles
    ADD CONSTRAINT FK_USER_COURSE_ROLES_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE assigned_items
    DROP COLUMN assigned_chest_id;

ALTER TABLE grades
    ALTER COLUMN comment TYPE VARCHAR(255) USING (comment::VARCHAR(255));

ALTER TABLE grades
    ALTER COLUMN comment SET NOT NULL;

ALTER TABLE gradable_events
    ALTER COLUMN markdown TYPE VARCHAR(255) USING (markdown::VARCHAR(255));