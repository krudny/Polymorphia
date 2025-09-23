ALTER TABLE assigned_items
    ADD bonus_xp numeric(4, 1) DEFAULT 0;

ALTER TABLE assigned_items
    ALTER COLUMN bonus_xp SET NOT NULL;

ALTER TABLE assigned_items
    ADD assigned_chest_id bigint;

ALTER TABLE assigned_items
    ALTER COLUMN assigned_chest_id SET NOT NULL;

ALTER TABLE assigned_items
    ADD CONSTRAINT fk_assigned_chest
        FOREIGN KEY (assigned_chest_id) REFERENCES assigned_chests(assigned_reward_id)
            ON DELETE CASCADE;

ALTER TABLE grades
    ALTER COLUMN comment TYPE VARCHAR(255) USING (comment::VARCHAR(255));

ALTER TABLE grades
    ALTER COLUMN comment SET NOT NULL;

ALTER TABLE gradable_events
    ALTER COLUMN markdown TYPE VARCHAR(255) USING (markdown::VARCHAR(255));