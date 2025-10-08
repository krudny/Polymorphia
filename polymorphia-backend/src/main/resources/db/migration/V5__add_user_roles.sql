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

UPDATE assigned_items
SET bonus_xp = 0
WHERE bonus_xp IS NULL;
ALTER TABLE assigned_items
ALTER
COLUMN bonus_xp TYPE numeric(4, 1) USING (bonus_xp::numeric(4, 1));

ALTER TABLE assigned_items
    ALTER COLUMN bonus_xp SET DEFAULT 0,
ALTER
COLUMN bonus_xp SET NOT NULL;

ALTER TABLE grades
ALTER
COLUMN comment TYPE VARCHAR(255) USING (comment::VARCHAR(255));


ALTER TABLE gradable_events
ALTER
COLUMN markdown TYPE VARCHAR(255) USING (markdown::VARCHAR(255));