ALTER TABLE course_groups
    ADD room VARCHAR(16);

UPDATE course_groups
SET room = 'X.YZ'
WHERE room IS NULL;

ALTER TABLE course_groups
    ALTER COLUMN room SET NOT NULL;