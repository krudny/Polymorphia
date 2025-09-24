CREATE TABLE invitation_tokens (
                                   id BIGSERIAL PRIMARY KEY,
                                   token VARCHAR(255) NOT NULL UNIQUE,
                                   user_email VARCHAR(255) NOT NULL,
                                   first_name VARCHAR(255) NOT NULL,
                                   last_name VARCHAR(255) NOT NULL,
                                   index_number INTEGER NOT NULL,
                                   expiry_date TIMESTAMP NOT NULL,
                                   used BOOLEAN NOT NULL DEFAULT FALSE,
                                   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invitation_tokens_user_email ON invitation_tokens(user_email);
CREATE INDEX idx_invitation_tokens_token ON invitation_tokens(token);
CREATE INDEX idx_invitation_tokens_expiry_date ON invitation_tokens(expiry_date);

/* TODO: false */
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE users DROP COLUMN is_password_temporary;