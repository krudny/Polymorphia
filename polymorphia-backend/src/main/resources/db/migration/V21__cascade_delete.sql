ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_students_course_groups_on_course_group;
ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_scg_course_group;
ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_scg_course_group
        FOREIGN KEY (course_group_id) REFERENCES course_groups(id) ON DELETE CASCADE;

ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_students_course_groups_on_animal;
ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_scg_animal;
ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_scg_animal
        FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_students_course_groups_on_student;
ALTER TABLE students_course_groups DROP CONSTRAINT IF EXISTS fk_scg_student;
ALTER TABLE students_course_groups
    ADD CONSTRAINT fk_scg_student
        FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE;

ALTER TABLE grades DROP CONSTRAINT IF EXISTS grades_animal_id_fkey;
ALTER TABLE grades DROP CONSTRAINT IF EXISTS fk_grade_animal;
ALTER TABLE grades
    ADD CONSTRAINT fk_grade_animal
        FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE criteria_grades DROP CONSTRAINT IF EXISTS criteria_grades_grade_id_fkey;
ALTER TABLE criteria_grades DROP CONSTRAINT IF EXISTS fk_criteria_grades_grade;
ALTER TABLE criteria_grades
    ADD CONSTRAINT fk_criteria_grades_grade
        FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE;

ALTER TABLE assigned_rewards DROP CONSTRAINT IF EXISTS assigned_rewards_criterion_grade_id_fkey;
ALTER TABLE assigned_rewards DROP CONSTRAINT IF EXISTS fk_ar_criteria_grades;
ALTER TABLE assigned_rewards
    ADD CONSTRAINT fk_ar_criteria_grades
        FOREIGN KEY (criterion_grade_id) REFERENCES criteria_grades(id) ON DELETE CASCADE;

ALTER TABLE assigned_chests DROP CONSTRAINT IF EXISTS assigned_chests_assigned_reward_id_fkey;
ALTER TABLE assigned_chests DROP CONSTRAINT IF EXISTS fk_ac_assigned_rewards;
ALTER TABLE assigned_chests
    ADD CONSTRAINT fk_ac_assigned_rewards
        FOREIGN KEY (assigned_reward_id) REFERENCES assigned_rewards(id) ON DELETE CASCADE;

ALTER TABLE assigned_items DROP CONSTRAINT IF EXISTS assigned_items_assigned_reward_id_fkey;
ALTER TABLE assigned_items DROP CONSTRAINT IF EXISTS fk_ai_assigned_rewards;
ALTER TABLE assigned_items
    ADD CONSTRAINT fk_ai_assigned_rewards
        FOREIGN KEY (assigned_reward_id) REFERENCES assigned_rewards(id) ON DELETE CASCADE;

ALTER TABLE assigned_items DROP CONSTRAINT IF EXISTS assigned_items_assigned_chest_id_fkey;
ALTER TABLE assigned_items DROP CONSTRAINT IF EXISTS fk_ai_assigned_chest;
ALTER TABLE assigned_items
    ADD CONSTRAINT fk_ai_assigned_chest
        FOREIGN KEY (assigned_chest_id) REFERENCES assigned_chests(assigned_reward_id) ON DELETE CASCADE;
