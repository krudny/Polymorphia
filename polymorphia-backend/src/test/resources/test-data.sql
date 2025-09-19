-- Users
-- Students
INSERT INTO users (id, first_name, last_name, email, password, is_password_temporary)
VALUES (2, 'Piotr', 'Budynek', 'student@agh.com', '$2a$10$k/sZH/gK6qzlLpHw1MqEFOpPXTBi17gdlIs84q2MmevjqsoHWNF4O', false);

INSERT INTO students(index_number, user_id)
values (123456, 2);

-- Coordinators
INSERT INTO users (id, first_name, last_name, email, password, is_password_temporary)
VALUES (3, 'Michał', 'Kowalski', 'coordinator@agh.com', '$2a$10$k/sZH/gK6qzlLpHw1MqEFOpPXTBi17gdlIs84q2MmevjqsoHWNF4O', false);

INSERT into coordinators(user_id)
values (3);

-- Instructors
INSERT INTO users (id, first_name, last_name, email, password, is_password_temporary)
VALUES (4, 'Sławomir', 'Nowak', 'instructor@agh.com', '$2a$10$k/sZH/gK6qzlLpHw1MqEFOpPXTBi17gdlIs84q2MmevjqsoHWNF4O', false);

INSERT into instructors(user_id)
values (4);

-- Courses
INSERT INTO courses (id, name, info_url, coordinator_id)
VALUES (1, 'Programowanie Obiektowe', '/url', 3);

INSERT INTO courses (id, name, info_url, coordinator_id)
VALUES (2, 'Programowanie Obiektowe', '/url', 3);

-- Course Groups
INSERT INTO course_groups (id, name, course_id, instructor_id)
VALUES (1, 'mi-sr12', 1, 4);

-- Animals
INSERT INTO animals (id, name, course_group_id, student_id)
VALUES (1, 'sowa', 1, 2);

-- Evolution Stages
INSERT INTO evolution_stages (id, name, min_xp, description, grade, image_url, order_index, course_id)
VALUES (1, 'Pisklak', 20, 'description', 2.0, 'imageUrl_pisklak', 1, 1),
       (2, 'Jajo', 0, 'description', 2.0, 'imageUrl_jajo', 0, 1),
       (3, 'Podlot', 50, 'description', 3.0, 'imageUrl_podlot', 2, 1),
       (4, 'Podlot2', 50, 'description2', 3.0, 'imageUrl2', 3, 2);

-- Event sections
INSERT INTO public.event_sections (id, has_gradable_events_with_topics, is_hidden, is_shown_in_road_map, name, order_index,
                                   course_id)
VALUES (2, true, true, true, 'Lab', 1, 1);
INSERT INTO public.event_sections (id, has_gradable_events_with_topics, is_hidden, is_shown_in_road_map, name, order_index,
                                   course_id)
VALUES (1, true, true, true, 'Kartkówka', 2, 1);

-- Test sections
INSERT INTO public.test_sections (id)
VALUES (1);

-- Assignment sections
INSERT INTO public.test_sections (id)
VALUES (2);

-- Rewards
INSERT INTO public.rewards (id, description, image_url, name, order_index, course_id)
VALUES (4, 'desc', 'url', 'Srebrna', 0, 1);
INSERT INTO public.rewards (id, description, image_url, name, order_index, course_id)
VALUES (5, 'desc', 'url', 'Złota', 1, 1);
INSERT INTO public.rewards (id, description, image_url, name, order_index, course_id)
VALUES (3, 'desc', 'url', 'Marchewka', 0, 1);
INSERT INTO public.rewards (id, description, image_url, name, order_index, course_id)
VALUES (2, 'desc', 'url', 'Apteczka2', 2, 1);
INSERT INTO public.rewards (id, description, image_url, name, order_index, course_id)
VALUES (1, 'desc', 'url', 'Apteczka', 1, 1);

-- Items
INSERT INTO public.items ("limit", reward_id, event_section_id)
VALUES (2, 1, 1);
INSERT INTO public.items ("limit", reward_id, event_section_id)
VALUES (2, 2, 1);
INSERT INTO public.items ("limit", reward_id, event_section_id)
VALUES (2, 3, 1);

-- Flat bonus items
INSERT INTO public.flat_bonus_items (xp_bonus, item_id, behavior)
VALUES (2.0, 1, 'ONE_EVENT');
INSERT INTO public.flat_bonus_items (xp_bonus, item_id, behavior)
VALUES (3.0, 2, 'MULTIPLE_EVENTS');

-- Percentage bonus items
INSERT INTO public.percentage_bonus_items (percentage_bonus, item_id)
VALUES (10, 3);

-- Chests
INSERT INTO public.chests (behavior, reward_id)
VALUES ('ONE_OF_MANY', 4);
INSERT INTO public.chests (behavior, reward_id)
VALUES ('ALL', 5);

-- Chests_items
INSERT INTO public.chests_items (item_id, chest_id)
VALUES (1, 4);
INSERT INTO public.chests_items (item_id, chest_id)
VALUES (2, 4);
INSERT INTO public.chests_items (item_id, chest_id)
VALUES (1, 5);
INSERT INTO public.chests_items (item_id, chest_id)
VALUES (2, 5);
INSERT INTO public.chests_items (item_id, chest_id)
VALUES (3, 5);

