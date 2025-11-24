CREATE TABLE notifications (
                               id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               notification_type VARCHAR(50) NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL,
                               description TEXT NOT NULL
);

CREATE INDEX idx_notification_user_id ON notifications(user_id);

CREATE TABLE grade_notifications (
                                     notification_id BIGINT PRIMARY KEY,
                                     gradable_event_id BIGINT,
                                     CONSTRAINT fk_grade_notification_id
                                         FOREIGN KEY (notification_id)
                                             REFERENCES notifications(id)
                                             ON DELETE CASCADE,
                                     CONSTRAINT fk_notification_gradable_event
                                         FOREIGN KEY (gradable_event_id)
                                             REFERENCES gradable_events(id)
                                             ON DELETE SET NULL
);

CREATE TABLE reward_notifications (
                                      notification_id BIGINT PRIMARY KEY,
                                      reward_id BIGINT,
                                      CONSTRAINT fk_reward_notification_id
                                          FOREIGN KEY (notification_id)
                                              REFERENCES notifications(id)
                                              ON DELETE CASCADE,
                                      CONSTRAINT fk_notification_reward
                                          FOREIGN KEY (reward_id)
                                              REFERENCES rewards(id)
                                              ON DELETE SET NULL
);
