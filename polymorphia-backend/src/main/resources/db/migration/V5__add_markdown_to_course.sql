ALTER TABLE courses
    ADD markdown VARCHAR(255);

ALTER TABLE courses
    ADD markdown_source_url VARCHAR(128);

ALTER TABLE courses
DROP COLUMN info_url;