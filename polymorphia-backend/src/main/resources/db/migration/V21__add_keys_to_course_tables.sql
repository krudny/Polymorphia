
ALTER TABLE event_sections ADD key VARCHAR(64);
ALTER TABLE gradable_events ADD key VARCHAR(64);
ALTER TABLE evolution_stages ADD key VARCHAR(64);
ALTER TABLE project_variant_categories ADD key VARCHAR(64);
ALTER TABLE project_variants ADD key VARCHAR(64);
ALTER TABLE rewards ADD key VARCHAR(64);
ALTER TABLE criteria ADD key VARCHAR(64);
ALTER TABLE submission_requirements ADD key VARCHAR(64);


UPDATE criteria SET key = CONCAT('criterion_', id);
UPDATE submission_requirements SET key = CONCAT('submission_requirement_', id);
UPDATE event_sections SET key = CONCAT('event_section_', id);
UPDATE gradable_events SET key = CONCAT('gradable_event_', id);
UPDATE evolution_stages SET key = CONCAT('evolution_stage_', id);
UPDATE project_variant_categories SET key = CONCAT('project_variant_category_', id);
UPDATE project_variants SET key = CONCAT('project_variant_', id);
UPDATE rewards SET key = CONCAT('reward_', id);


ALTER TABLE event_sections ALTER COLUMN key SET NOT NULL;
ALTER TABLE gradable_events ALTER COLUMN key SET NOT NULL;
ALTER TABLE evolution_stages ALTER COLUMN key SET NOT NULL;
ALTER TABLE project_variant_categories ALTER COLUMN key SET NOT NULL;
ALTER TABLE project_variants ALTER COLUMN key SET NOT NULL;
ALTER TABLE rewards ALTER COLUMN key SET NOT NULL;
ALTER TABLE criteria ALTER COLUMN key SET NOT NULL;
ALTER TABLE submission_requirements ALTER COLUMN key SET NOT NULL;


CREATE OR REPLACE VIEW all_course_keys AS

SELECT course_id, key, 'event_sections' as table_name, id as record_id
FROM event_sections
UNION ALL

SELECT course_id, key, 'evolution_stages', id
FROM evolution_stages
UNION ALL

SELECT course_id, key, 'rewards', id
FROM rewards
UNION ALL

SELECT es.course_id, ge.key, 'gradable_events', ge.id
FROM gradable_events ge
         JOIN event_sections es ON es.id = ge.event_section_id
UNION ALL

SELECT es.course_id, c.key, 'criteria', c.id
FROM criteria c
         JOIN gradable_events ge ON ge.id = c.gradable_event_id
         JOIN event_sections es ON es.id = ge.event_section_id
UNION ALL

SELECT es.course_id, sr.key, 'submission_requirements', sr.id
FROM submission_requirements sr
         JOIN gradable_events ge ON ge.id = sr.gradable_event_id
         JOIN event_sections es ON es.id = ge.event_section_id
UNION ALL

SELECT es.course_id, pvc.key, 'project_variant_categories', pvc.id
FROM project_variant_categories pvc
         JOIN gradable_events ge ON ge.id = pvc.project_id
         JOIN event_sections es ON es.id = ge.event_section_id
UNION ALL

SELECT es.course_id, pv.key, 'project_variants', pv.id
FROM project_variants pv
         JOIN project_variant_categories pvc ON pvc.id = pv.project_variant_category_id
         JOIN gradable_events ge ON ge.id = pvc.project_id
         JOIN event_sections es ON es.id = ge.event_section_id;


CREATE OR REPLACE FUNCTION enforce_unique_key_event_sections()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = NEW.course_id
      AND key = NEW.key
      AND NOT (table_name = 'event_sections' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_event_sections
    BEFORE INSERT OR UPDATE ON event_sections
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_event_sections();


CREATE OR REPLACE FUNCTION enforce_unique_key_evolution_stages()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = NEW.course_id
      AND key = NEW.key
      AND NOT (table_name = 'evolution_stages' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_evolution_stages
    BEFORE INSERT OR UPDATE ON evolution_stages
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_evolution_stages();


CREATE OR REPLACE FUNCTION enforce_unique_key_rewards()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = NEW.course_id
      AND key = NEW.key
      AND NOT (table_name = 'rewards' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_rewards
    BEFORE INSERT OR UPDATE ON rewards
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_rewards();


CREATE OR REPLACE FUNCTION enforce_unique_key_gradable_events()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
    current_course_id BIGINT;
BEGIN
    SELECT course_id INTO current_course_id
    FROM event_sections
    WHERE id = NEW.event_section_id;

    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = current_course_id
      AND key = NEW.key
      AND NOT (table_name = 'gradable_events' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, current_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_gradable_events
    BEFORE INSERT OR UPDATE ON gradable_events
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_gradable_events();


CREATE OR REPLACE FUNCTION enforce_unique_key_criteria()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
    current_course_id BIGINT;
BEGIN
    SELECT es.course_id INTO current_course_id
    FROM gradable_events ge
             JOIN event_sections es ON es.id = ge.event_section_id
    WHERE ge.id = NEW.gradable_event_id;

    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = current_course_id
      AND key = NEW.key
      AND NOT (table_name = 'criteria' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, current_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_criteria
    BEFORE INSERT OR UPDATE ON criteria
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_criteria();


CREATE OR REPLACE FUNCTION enforce_unique_key_submission_requirements()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
    current_course_id BIGINT;
BEGIN
    SELECT es.course_id INTO current_course_id
    FROM gradable_events ge
             JOIN event_sections es ON es.id = ge.event_section_id
    WHERE ge.id = NEW.gradable_event_id;

    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = current_course_id
      AND key = NEW.key
      AND NOT (table_name = 'submission_requirements' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, current_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_submission_requirements
    BEFORE INSERT OR UPDATE ON submission_requirements
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_submission_requirements();


CREATE OR REPLACE FUNCTION enforce_unique_key_project_variant_categories()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
    current_course_id BIGINT;
BEGIN
    SELECT es.course_id INTO current_course_id
    FROM gradable_events ge
             JOIN event_sections es ON es.id = ge.event_section_id
    WHERE ge.id = NEW.project_id;

    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = current_course_id
      AND key = NEW.key
      AND NOT (table_name = 'project_variant_categories' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, current_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_project_variant_categories
    BEFORE INSERT OR UPDATE ON project_variant_categories
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_project_variant_categories();


CREATE OR REPLACE FUNCTION enforce_unique_key_project_variants()
    RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
    current_course_id BIGINT;
BEGIN
    SELECT es.course_id INTO current_course_id
    FROM project_variant_categories pvc
             JOIN gradable_events ge ON ge.id = pvc.project_id
             JOIN event_sections es ON es.id = ge.event_section_id
    WHERE pvc.id = NEW.project_variant_category_id;

    SELECT COUNT(*) INTO conflict_count
    FROM all_course_keys
    WHERE course_id = current_course_id
      AND key = NEW.key
      AND NOT (table_name = 'project_variants' AND record_id = NEW.id);

    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'Key "%" already exists in course %', NEW.key, current_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unique_key_project_variants
    BEFORE INSERT OR UPDATE ON project_variants
    FOR EACH ROW
EXECUTE FUNCTION enforce_unique_key_project_variants();


CREATE TABLE assignments (
                             id BIGINT NOT NULL,
                             CONSTRAINT pk_assignments PRIMARY KEY (id)
);

CREATE TABLE tests (
                       id BIGINT NOT NULL,
                       CONSTRAINT pk_tests PRIMARY KEY (id)
);

ALTER TABLE assignments
    ADD CONSTRAINT FK_ASSIGNMENTS_ON_ID FOREIGN KEY (id) REFERENCES gradable_events (id);

ALTER TABLE tests
    ADD CONSTRAINT FK_TESTS_ON_ID FOREIGN KEY (id) REFERENCES gradable_events (id);


INSERT INTO assignments(id)
SELECT ge.id
FROM gradable_events ge
         JOIN assignment_sections asn ON ge.event_section_id = asn.id;

INSERT INTO tests(id)
SELECT ge.id
FROM gradable_events ge
         JOIN test_sections ts ON ge.event_section_id = ts.id;