ALTER TABLE courses
    ADD COLUMN markdown TEXT;

ALTER TABLE courses
    ADD markdown_source_url VARCHAR(128);

ALTER TABLE courses
DROP COLUMN info_url;
