CREATE TABLE notifications (
                               id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               notification_type VARCHAR(50) NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL,
                               description TEXT NOT NULL,
                               gradable_event_id BIGINT,
                               reward_id BIGINT,
                               CONSTRAINT FK_NOTIFICATION_GRADABLE_EVENT
                                   FOREIGN KEY (gradable_event_id)
                                       REFERENCES gradable_events(id)
                                       ON DELETE SET NULL,
                               CONSTRAINT FK_NOTIFICATION_REWARD
                                   FOREIGN KEY (reward_id)
                                       REFERENCES rewards(id)
                                       ON DELETE SET NULL
);

CREATE INDEX idx_notification_user_id ON notifications(user_id);
