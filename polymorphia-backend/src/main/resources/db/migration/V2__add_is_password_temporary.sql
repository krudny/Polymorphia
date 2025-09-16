ALTER TABLE users
    ADD is_password_temporary BOOLEAN;

UPDATE users
SET is_password_temporary = 'false'
WHERE is_password_temporary IS NULL;
ALTER TABLE users
    ALTER COLUMN is_password_temporary SET NOT NULL;