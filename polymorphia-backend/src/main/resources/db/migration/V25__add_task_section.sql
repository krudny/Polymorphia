CREATE TABLE task_sections (
   id bigint NOT NULL,
   CONSTRAINT pk_task_sections PRIMARY KEY (id),
   CONSTRAINT fk_task_sections_on_id FOREIGN KEY (id) REFERENCES event_sections (id)
);

CREATE TABLE tasks (
       id bigint NOT NULL,
       CONSTRAINT pk_tasks PRIMARY KEY (id),
       CONSTRAINT fk_tasks_on_id FOREIGN KEY (id) REFERENCES gradable_events (id)
);