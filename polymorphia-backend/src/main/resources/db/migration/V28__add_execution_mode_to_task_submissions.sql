ALTER TABLE task_submissions
    ADD COLUMN execution_mode VARCHAR(32);

UPDATE task_submissions
    SET execution_mode = 'DOCKER'
    WHERE execution_mode IS NULL;

ALTER TABLE task_submissions
    ALTER COLUMN execution_mode SET NOT NULL;
