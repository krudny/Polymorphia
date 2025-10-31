ALTER TABLE invitation_tokens RENAME TO tokens;
ALTER TABLE tokens DROP COLUMN used;