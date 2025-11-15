ALTER TABLE coordinators
DROP CONSTRAINT fk_coordinators_on_user;

ALTER TABLE course_groups
DROP CONSTRAINT fk_course_groups_on_instructor;

ALTER TABLE instructors
DROP CONSTRAINT fk_instructors_on_user;

ALTER TABLE project_groups
DROP CONSTRAINT fk_project_groups_on_instructor;

ALTER TABLE project_groups
DROP CONSTRAINT fk_project_groups_on_project;

ALTER TABLE project_groups_project_variants
DROP CONSTRAINT project_groups_project_variants_pkey;

CREATE TABLE teaching_role_users
(
    user_id BIGINT NOT NULL,
    CONSTRAINT pk_teaching_role_users PRIMARY KEY (user_id)
);

ALTER TABLE course_groups
    ADD teaching_role_user_id BIGINT;

ALTER TABLE project_groups
    ADD teaching_role_user_id BIGINT;

INSERT INTO teaching_role_users (user_id)
SELECT user_id FROM instructors;

INSERT INTO teaching_role_users (user_id)
SELECT user_id FROM coordinators
    ON CONFLICT (user_id) DO NOTHING;

UPDATE course_groups
SET teaching_role_user_id = instructor_id
WHERE instructor_id IS NOT NULL;

UPDATE project_groups
SET teaching_role_user_id = instructor_id
WHERE instructor_id IS NOT NULL;

ALTER TABLE project_groups
    ALTER COLUMN teaching_role_user_id SET NOT NULL;

ALTER TABLE coordinators
    ADD CONSTRAINT FK_COORDINATORS_ON_USERID FOREIGN KEY (user_id) REFERENCES teaching_role_users (user_id);

ALTER TABLE course_groups
    ADD CONSTRAINT FK_COURSE_GROUPS_ON_TEACHING_ROLE_USER FOREIGN KEY (teaching_role_user_id) REFERENCES teaching_role_users (user_id);

ALTER TABLE instructors
    ADD CONSTRAINT FK_INSTRUCTORS_ON_USERID FOREIGN KEY (user_id) REFERENCES teaching_role_users (user_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_ID FOREIGN KEY (id) REFERENCES gradable_events (id);

ALTER TABLE project_groups
    ADD CONSTRAINT FK_PROJECT_GROUPS_ON_PROJECT FOREIGN KEY (project_id) REFERENCES projects (id);

ALTER TABLE project_groups
    ADD CONSTRAINT FK_PROJECT_GROUPS_ON_TEACHING_ROLE_USER FOREIGN KEY (teaching_role_user_id) REFERENCES teaching_role_users (user_id);

ALTER TABLE teaching_role_users
    ADD CONSTRAINT FK_TEACHING_ROLE_USERS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE course_groups
DROP COLUMN instructor_id;

ALTER TABLE project_groups
DROP COLUMN instructor_id;
