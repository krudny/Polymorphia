CREATE TABLE hall_of_fame_view
(
    animal_id       BIGINT NOT NULL,
    animal_name     VARCHAR(255),
    student_name    VARCHAR(255),
    group_name      VARCHAR(255),
    course_id       BIGINT,
    position        INTEGER,
    evolution_stage VARCHAR(255),
    image_url       VARCHAR(255),
    total_bonus_sum DECIMAL,
    total_xp_sum    DECIMAL,
    CONSTRAINT pk_hall_of_fame_view PRIMARY KEY (animal_id)
);

CREATE TABLE student_score_detail_view
(
    id                 VARCHAR(255) NOT NULL,
    animal_id          BIGINT,
    event_section_id   BIGINT,
    event_section_name VARCHAR(255),
    raw_xp             DECIMAL,
    flat_bonus         DECIMAL,
    percentage_bonus   DECIMAL,
    CONSTRAINT pk_student_score_detail_view PRIMARY KEY (id)
);

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
