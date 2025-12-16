BEGIN;
TRUNCATE TABLE users cascade;
TRUNCATE TABLE chests_items cascade;
TRUNCATE TABLE courses cascade;
TRUNCATE TABLE user_course_roles cascade;
TRUNCATE TABLE course_groups cascade;
TRUNCATE TABLE animals cascade;
TRUNCATE TABLE students_course_groups cascade;
TRUNCATE TABLE evolution_stages cascade;
TRUNCATE TABLE event_sections cascade;
TRUNCATE table project_variants cascade;
TRUNCATE table project_variant_categories cascade;
TRUNCATE table project_groups cascade;
TRUNCATE TABLE rewards cascade;
TRUNCATE TABLE assigned_chests cascade;
TRUNCATE TABLE assigned_items cascade;
TRUNCATE TABLE assigned_rewards cascade;
TRUNCATE TABLE grades cascade;
TRUNCATE TABLE criteria_grades cascade;
TRUNCATE TABLE criteria cascade;
TRUNCATE TABLE criteria_rewards cascade;
TRUNCATE TABLE user_course_roles cascade;
TRUNCATE TABLE project_groups cascade;
TRUNCATE TABLE project_groups_animals cascade;
TRUNCATE TABLE submission_requirements cascade;
TRUNCATE TABLE submissions cascade;
TRUNCATE TABLE teaching_role_users cascade;

INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (1, 'Michal', 'Idzik', 'michal.idzik@test.com',
        '$2a$10$AxAHAwIQqrDLxr0XaZoTfeVWoC/M1v5cWbHP1XCL5LDtBUcylGP.6', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (6, 'Piotr', 'Dąbrowski', 'student_1_3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (10, 'Tomasz', 'Jankowski', 'student_1_7@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (14, 'Tomasz', 'Nowak', 'student_2_3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (19, 'Krzysztof', 'Dąbrowski', 'student_2_8@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (21, 'Magdalena', 'Mazur', 'student_3_2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (26, 'Piotr', 'Kowalski', 'student_3_7@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (29, 'Piotr', 'Nowak', 'student_4_2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (31, 'Paweł', 'Zieliński', 'student_4_4@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (33, 'Kamil', 'Nowak', 'student_4_6@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (35, 'Magdalena', 'Nowak', 'student_4_8@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (37, 'Kamil', 'Wójcik', 'student_5_2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (40, 'Tomasz', 'Lewandowski', 'student_5_5@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (42, 'Paweł', 'Wiśniewski', 'student_5_7@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (4, 'Marcin', 'Wójcik', 'student_1_1@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (17, 'Ewa', 'Zielińska', 'student_2_6@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (22, 'Magdalena', 'Zielińska', 'student_3_3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (7, 'Agnieszka', 'Lewandowska', 'student_1_4@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (15, 'Ewelina', 'Lewandowska', 'student_2_4@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (39, 'Małgorzata', 'Wiśniewska', 'student_5_4@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (5, 'Piotr', 'Kamiński', 'student_1_2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (9, 'Adam', 'Kowalczyk', 'student_1_6@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (11, 'Jakub', 'Szymański', 'student_1_8@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (13, 'Małgorzata', 'Wójcik', 'student_2_2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (16, 'Tomasz', 'Woźniak', 'student_2_5@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (20, 'Tomasz', 'Mazur', 'student_3_1@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (23, 'Ewa', 'Woźniak', 'student_3_4@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (28, 'Marcin', 'Kamiński', 'student_4_1@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (30, 'Krzysztof', 'Lewandowski', 'student_4_3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (32, 'Tomasz', 'Kowalski', 'student_4_5@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (34, 'Adam', 'Wiśniewski', 'student_4_7@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (36, 'Piotr', 'Lewandowski', 'student_5_1@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (38, 'Krzysztof', 'Wiśniewski', 'student_5_3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (41, 'Piotr', 'Kozłowski', 'student_5_6@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (43, 'Anna', 'Nowak', 'student_5_8@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (24, 'Joanna', 'Kozłowska', 'student_3_5@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (25, 'Ewa', 'Dąbrowska', 'student_3_6@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (18, 'Anna', 'Zielińska', 'student_2_7@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (8, 'Joanna', 'Jankowska', 'student_1_5@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (27, 'Anna', 'Kozłowska', 'student_3_8@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (2, 'Janusz', 'Kowalski', 'instructor2@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (12, 'Michał', 'Kowalczyk', 'student_2_1@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);
INSERT INTO public.users (id, first_name, last_name, email, password, preferred_course_id)
VALUES (3, 'Agata', 'Nowak', 'instructor3@test.com',
        '$2a$10$kR6y9U4dFU3DhdodLWP.AOel2XayceOy4T2ADJRSqpv0Ca9G.5k9C', NULL);

INSERT INTO public.teaching_role_users (user_id)
VALUES (1);
INSERT INTO public.teaching_role_users (user_id)
VALUES (2);
INSERT INTO public.teaching_role_users (user_id)
VALUES (3);

INSERT INTO public.instructors (user_id)
VALUES (2);
INSERT INTO public.instructors (user_id)
VALUES (3);

INSERT INTO public.animals (id, name)
VALUES (1, 'Burek');
INSERT INTO public.animals (id, name)
VALUES (2, 'Reksio');
INSERT INTO public.animals (id, name)
VALUES (3, 'Mruczek');
INSERT INTO public.animals (id, name)
VALUES (4, 'Azor');
INSERT INTO public.animals (id, name)
VALUES (5, 'Puszek');
INSERT INTO public.animals (id, name)
VALUES (6, 'Fafik');
INSERT INTO public.animals (id, name)
VALUES (7, 'Łatek');
INSERT INTO public.animals (id, name)
VALUES (8, 'Szarik');
INSERT INTO public.animals (id, name)
VALUES (9, 'Kajtek');
INSERT INTO public.animals (id, name)
VALUES (10, 'Misiek');
INSERT INTO public.animals (id, name)
VALUES (11, 'Dyzio');
INSERT INTO public.animals (id, name)
VALUES (12, 'Figa');
INSERT INTO public.animals (id, name)
VALUES (13, 'Luna');
INSERT INTO public.animals (id, name)
VALUES (14, 'Bella');
INSERT INTO public.animals (id, name)
VALUES (15, 'Maja');
INSERT INTO public.animals (id, name)
VALUES (16, 'Saba');
INSERT INTO public.animals (id, name)
VALUES (17, 'Sonia');
INSERT INTO public.animals (id, name)
VALUES (18, 'Tofik');
INSERT INTO public.animals (id, name)
VALUES (19, 'Kropka');
INSERT INTO public.animals (id, name)
VALUES (20, 'Łatka');
INSERT INTO public.animals (id, name)
VALUES (21, 'Biały');
INSERT INTO public.animals (id, name)
VALUES (22, 'Czarny');
INSERT INTO public.animals (id, name)
VALUES (23, 'Rudy');
INSERT INTO public.animals (id, name)
VALUES (24, 'Pies');
INSERT INTO public.animals (id, name)
VALUES (25, 'Kot');
INSERT INTO public.animals (id, name)
VALUES (26, 'Chomik');
INSERT INTO public.animals (id, name)
VALUES (27, 'Papuga');
INSERT INTO public.animals (id, name)
VALUES (28, 'Królik');
INSERT INTO public.animals (id, name)
VALUES (29, 'Żółw');
INSERT INTO public.animals (id, name)
VALUES (30, 'Świnka');
INSERT INTO public.animals (id, name)
VALUES (31, 'Szynszyla');
INSERT INTO public.animals (id, name)
VALUES (32, 'Mysz');
INSERT INTO public.animals (id, name)
VALUES (33, 'Szczur');
INSERT INTO public.animals (id, name)
VALUES (34, 'Wąż');
INSERT INTO public.animals (id, name)
VALUES (35, 'Jaszczurka');
INSERT INTO public.animals (id, name)
VALUES (36, 'Ryba');
INSERT INTO public.animals (id, name)
VALUES (37, 'Kanarek');
INSERT INTO public.animals (id, name)
VALUES (38, 'Gołąb');
INSERT INTO public.animals (id, name)
VALUES (39, 'Kura');
INSERT INTO public.animals (id, name)
VALUES (40, 'Kaczka');

INSERT INTO public.coordinators (user_id)
VALUES (1);

INSERT INTO public.courses (id, name, coordinator_id, coordinator_image_url, image_url,
                            instructor_image_url, markdown, markdown_source_url)
VALUES (1, 'Programowanie Obiektowe 23/24', 1, 'images/evolution-stages/6.webp',
        'images/evolution-stages/7.webp', 'images/evolution-stages/6.webp', NULL,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/Readme.md');

INSERT INTO public.event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics,
                                   course_id, order_index, is_hidden, key)
VALUES (1, 'Git', true, false, 1, 0, false, 'es1');
INSERT INTO public.event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics,
                                   course_id, order_index, is_hidden, key)
VALUES (2, 'Kartkówki', true, true, 1, 1, false, 'es2');
INSERT INTO public.event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics,
                                   course_id, order_index, is_hidden, key)
VALUES (3, 'Laboratoria', true, true, 1, 2, false, 'es3');
INSERT INTO public.event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics,
                                   course_id, order_index, is_hidden, key)
VALUES (4, 'Projekt', true, false, 1, 3, false, 'es4');

INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (1, 1, 'Git', NULL, 0, 0,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab0/Readme.md',
        NULL, false, false, 'es1_ge1');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (2, 2, 'Kartkówka 1', 'Instrukcje sterujące w Javie', 0, 2, NULL, NULL, false, false,
        'es2_ge1');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (3, 2, 'Kartkówka 2', 'Tablice jednowymiarowe i wielowymiarowe', 1, 3, NULL, NULL, false,
        false, 'es2_ge2');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (4, 2, 'Kartkówka 3', 'Podstawy obiektowości: Klasy i Obiekty', 2, 6, NULL, NULL, false,
        false, 'es2_ge3');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (5, 2, 'Kartkówka 4', 'Konstruktory i słowo kluczowe this', 3, 8, NULL, NULL, false, false,
        'es2_ge4');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (6, 2, 'Kartkówka 5', 'Hermetyzacja i modyfikatory dostępu', 4, 10, NULL, NULL, false, false,
        'es2_ge5');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (7, 2, 'Kartkówka 6', 'Dziedziczenie i słowo kluczowe super', 5, 11, NULL, NULL, false,
        false, 'es2_ge6');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (8, 2, 'Kartkówka 7', 'Polimorfizm i metody wirtualne', 6, 14, NULL, NULL, false, false,
        'es2_ge7');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (9, 2, 'Kartkówka 8', 'Klasy abstrakcyjne i Interfejsy', 7, 16, NULL, NULL, false, false,
        'es2_ge8');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (10, 2, 'Kartkówka 9', 'Obsługa wyjątków (try-catch-finally)', 8, 17, NULL, NULL, false,
        false, 'es2_ge9');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (11, 2, 'Kartkówka 10', 'Wprowadzenie do Kolekcji (List, Set, Map)', 9, 18, NULL, NULL,
        false, false, 'es2_ge10');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (12, 3, 'Laboratorium 1', 'Instrukcje sterujące w Javie', 0, 1,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab1/Readme.md',
        NULL, false, false, 'es3_ge1');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (13, 3, 'Laboratorium 2', 'Tablice jednowymiarowe i wielowymiarowe', 1, 4,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab2/Readme.md',
        NULL, false, false, 'es3_ge2');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (14, 3, 'Laboratorium 3', 'Podstawy obiektowości: Klasy i Obiekty', 2, 5,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab3/Readme.md',
        NULL, false, false, 'es3_ge3');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (15, 3, 'Laboratorium 4', 'Konstruktory i słowo kluczowe this', 3, 7,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab4/Readme.md',
        NULL, false, false, 'es3_ge4');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (16, 3, 'Laboratorium 5', 'Hermetyzacja i modyfikatory dostępu', 4, 9,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab5/Readme.md',
        NULL, false, false, 'es3_ge5');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (17, 3, 'Laboratorium 6', 'Dziedziczenie i słowo kluczowe super', 5, 12,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab6/Readme.md',
        NULL, false, false, 'es3_ge6');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (18, 3, 'Laboratorium 7', 'Polimorfizm i metody wirtualne', 6, 13,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab7/Readme.md',
        NULL, false, false, 'es3_ge7');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (19, 3, 'Laboratorium 8', 'Klasy abstrakcyjne i Interfejsy', 7, 15,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/lab8/Readme.md',
        NULL, false, false, 'es3_ge8');
INSERT INTO public.gradable_events (id, event_section_id, name, topic, order_index,
                                    road_map_order_index, markdown_source_url, markdown, is_hidden,
                                    is_locked, key)
VALUES (20, 4, 'Darwin World', NULL, 0, 19,
        'https://raw.githubusercontent.com/krudny/obiektowe-lab/refs/heads/markdown-adjustments/proj/Readme.md',
        NULL, false, false, 'es4_ge1');

INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (1, 1, 'Wykonanie zadania', 4.0, 'es1_ge1_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (2, 2, 'Wynik testu', 2.0, 'es2_ge1_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (3, 3, 'Wynik testu', 2.0, 'es2_ge2_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (4, 4, 'Wynik testu', 2.0, 'es2_ge3_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (5, 5, 'Wynik testu', 2.0, 'es2_ge4_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (6, 6, 'Wynik testu', 2.0, 'es2_ge5_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (7, 7, 'Wynik testu', 2.0, 'es2_ge6_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (8, 8, 'Wynik testu', 2.0, 'es2_ge7_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (9, 9, 'Wynik testu', 2.0, 'es2_ge8_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (10, 10, 'Wynik testu', 2.0, 'es2_ge9_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (11, 11, 'Wynik testu', 2.0, 'es2_ge10_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (12, 12, 'Wykonanie zadania', 4.0, 'es3_ge1_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (13, 13, 'Wykonanie zadania', 4.0, 'es3_ge2_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (14, 14, 'Wykonanie zadania', 4.0, 'es3_ge3_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (15, 15, 'Wykonanie zadania', 4.0, 'es3_ge4_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (16, 15, 'Zadanie dodatkowe', 0.0, 'es3_ge4_c2');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (17, 16, 'Wykonanie zadania', 4.0, 'es3_ge5_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (18, 16, 'Zadanie dodatkowe', 0.0, 'es3_ge5_c2');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (19, 17, 'Wykonanie zadania', 4.0, 'es3_ge6_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (20, 18, 'Wykonanie zadania', 4.0, 'es3_ge7_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (21, 19, 'Wykonanie zadania', 4.0, 'es3_ge8_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (22, 19, 'Zadanie dodatkowe', 0.0, 'es3_ge8_c2');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (23, 20, 'Podstawa', 16.0, 'es4_ge1_c1');
INSERT INTO public.criteria (id, gradable_event_id, name, max_xp, key)
VALUES (24, 20, 'Rozszerzenia', 16.0, 'es4_ge1_c2');

INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (2, 1, 6, '2025-12-16 12:03:39.649368', '2025-12-16 12:03:39.649368', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (3, 1, 31, '2025-12-16 12:03:45.285468', '2025-12-16 12:03:45.285468', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (4, 1, 4, '2025-12-16 12:03:50.025934', '2025-12-16 12:03:50.025934', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (5, 1, 24, '2025-12-16 12:03:54.138254', '2025-12-16 12:03:54.138254', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (6, 1, 40, '2025-12-16 12:03:57.708903', '2025-12-16 12:03:57.708903', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (7, 1, 15, '2025-12-16 12:04:03.804429', '2025-12-16 12:04:03.804429', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (8, 1, 22, '2025-12-16 12:04:08.762734', '2025-12-16 12:04:08.762734', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (9, 1, 20, '2025-12-16 12:04:13.274483', '2025-12-16 12:04:13.274483', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (10, 1, 14, '2025-12-16 12:04:19.074457', '2025-12-16 12:04:19.074457', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (11, 1, 12, '2025-12-16 12:04:24.52613', '2025-12-16 12:04:24.52613', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (12, 1, 8, '2025-12-16 12:04:31.976013', '2025-12-16 12:04:31.976013', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (13, 1, 5, '2025-12-16 12:04:37.595637', '2025-12-16 12:04:37.595637', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (14, 1, 30, '2025-12-16 12:04:46.431004', '2025-12-16 12:04:46.431004', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (15, 1, 34, '2025-12-16 12:04:51.329957', '2025-12-16 12:04:51.329957', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (16, 1, 21, '2025-12-16 12:04:58.728467', '2025-12-16 12:04:58.728467', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (17, 1, 16, '2025-12-16 12:05:05.376008', '2025-12-16 12:05:05.376008', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (18, 1, 27, '2025-12-16 12:05:10.68547', '2025-12-16 12:05:10.68547', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (19, 1, 35, '2025-12-16 12:05:15.781358', '2025-12-16 12:05:15.781358', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (20, 1, 18, '2025-12-16 12:05:22.294913', '2025-12-16 12:05:22.294913', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (21, 1, 32, '2025-12-16 12:05:29.862018', '2025-12-16 12:05:29.862018', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (22, 1, 36, '2025-12-16 12:05:34.38573', '2025-12-16 12:05:34.38573', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (23, 1, 19, '2025-12-16 12:05:39.180608', '2025-12-16 12:05:39.180608', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (24, 1, 10, '2025-12-16 12:05:43.427481', '2025-12-16 12:05:43.427481', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (25, 1, 25, '2025-12-16 12:05:50.625268', '2025-12-16 12:05:50.625268', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (26, 1, 1, '2025-12-16 12:05:53.255558', '2025-12-16 12:05:53.255558', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (27, 1, 9, '2025-12-16 12:05:58.19641', '2025-12-16 12:05:58.19641', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (28, 1, 39, '2025-12-16 12:06:03.803871', '2025-12-16 12:06:03.803871', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (29, 1, 28, '2025-12-16 12:06:07.434231', '2025-12-16 12:06:07.434231', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (30, 1, 3, '2025-12-16 12:06:10.825734', '2025-12-16 12:06:10.825734', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (31, 1, 2, '2025-12-16 12:06:15.258601', '2025-12-16 12:06:15.258601', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (32, 1, 23, '2025-12-16 12:06:19.508814', '2025-12-16 12:06:19.508814', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (33, 1, 38, '2025-12-16 12:06:25.428837', '2025-12-16 12:06:25.428837', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (34, 1, 33, '2025-12-16 12:06:29.885667', '2025-12-16 12:06:29.885667', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (35, 1, 26, '2025-12-16 12:06:35.168403', '2025-12-16 12:06:35.168403', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (36, 1, 7, '2025-12-16 12:06:39.313298', '2025-12-16 12:06:39.313298', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (37, 1, 29, '2025-12-16 12:06:44.245579', '2025-12-16 12:06:44.245579', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (38, 1, 37, '2025-12-16 12:06:48.378522', '2025-12-16 12:06:48.378522', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (39, 1, 17, '2025-12-16 12:06:53.039957', '2025-12-16 12:06:53.039957', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (40, 1, 11, '2025-12-16 12:06:56.791332', '2025-12-16 12:06:56.791332', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (41, 1, 13, '2025-12-16 12:07:00.988679', '2025-12-16 12:07:00.988679', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (42, 12, 6, '2025-12-16 12:07:50.632492', '2025-12-16 12:07:50.632492', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (43, 12, 31, '2025-12-16 12:07:52.786056', '2025-12-16 12:07:52.786056', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (44, 12, 4, '2025-12-16 12:07:56.613076', '2025-12-16 12:07:56.613076', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (45, 12, 24, '2025-12-16 12:07:58.936197', '2025-12-16 12:07:58.936197', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (46, 12, 40, '2025-12-16 12:08:01.810987', '2025-12-16 12:08:01.810987', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (47, 12, 15, '2025-12-16 12:08:06.086238', '2025-12-16 12:08:06.086238', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (48, 12, 22, '2025-12-16 12:08:08.336622', '2025-12-16 12:08:08.336622', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (49, 12, 20, '2025-12-16 12:08:11.321925', '2025-12-16 12:08:11.321925', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (50, 12, 14, '2025-12-16 12:08:15.020673', '2025-12-16 12:08:15.020673', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (51, 12, 12, '2025-12-16 12:08:18.960586', '2025-12-16 12:08:18.960586', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (52, 12, 8, '2025-12-16 12:08:21.866639', '2025-12-16 12:08:21.866639', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (53, 12, 5, '2025-12-16 12:08:25.079711', '2025-12-16 12:08:25.079711', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (54, 12, 21, '2025-12-16 12:08:28.638635', '2025-12-16 12:08:28.638635', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (55, 12, 30, '2025-12-16 12:08:33.022467', '2025-12-16 12:08:33.022467', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (56, 12, 34, '2025-12-16 12:08:38.587434', '2025-12-16 12:08:38.587434', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (57, 12, 16, '2025-12-16 12:08:40.676916', '2025-12-16 12:08:40.676916', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (58, 12, 27, '2025-12-16 12:08:42.903851', '2025-12-16 12:08:42.903851', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (59, 12, 35, '2025-12-16 12:08:47.064189', '2025-12-16 12:08:47.064189', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (60, 12, 18, '2025-12-16 12:08:49.879675', '2025-12-16 12:08:49.879675', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (61, 12, 32, '2025-12-16 12:08:52.895153', '2025-12-16 12:08:52.895153', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (62, 12, 19, '2025-12-16 12:08:57.118686', '2025-12-16 12:08:57.118686', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (63, 12, 36, '2025-12-16 12:09:00.21829', '2025-12-16 12:09:00.21829', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (64, 12, 10, '2025-12-16 12:09:03.544784', '2025-12-16 12:09:03.544784', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (65, 12, 25, '2025-12-16 12:09:06.354106', '2025-12-16 12:09:06.354106', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (66, 12, 1, '2025-12-16 12:09:09.300488', '2025-12-16 12:09:09.300488', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (67, 12, 9, '2025-12-16 12:09:13.026775', '2025-12-16 12:09:13.026775', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (68, 12, 39, '2025-12-16 12:09:15.562117', '2025-12-16 12:09:15.562117', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (69, 12, 28, '2025-12-16 12:09:19.548545', '2025-12-16 12:09:19.548545', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (70, 12, 3, '2025-12-16 12:09:22.599703', '2025-12-16 12:09:22.599703', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (71, 12, 2, '2025-12-16 12:09:26.760428', '2025-12-16 12:09:26.760428', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (72, 12, 23, '2025-12-16 12:09:30.704698', '2025-12-16 12:09:30.704698', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (73, 12, 38, '2025-12-16 12:09:32.779594', '2025-12-16 12:09:32.779594', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (74, 12, 33, '2025-12-16 12:09:36.984933', '2025-12-16 12:09:36.984933', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (75, 12, 26, '2025-12-16 12:09:43.07842', '2025-12-16 12:09:43.07842', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (76, 12, 7, '2025-12-16 12:09:45.498577', '2025-12-16 12:09:45.498577', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (77, 12, 29, '2025-12-16 12:09:49.303376', '2025-12-16 12:09:49.303376', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (78, 12, 37, '2025-12-16 12:09:51.924308', '2025-12-16 12:09:51.924308', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (79, 12, 17, '2025-12-16 12:09:57.235124', '2025-12-16 12:09:57.235124', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (80, 12, 11, '2025-12-16 12:10:00.174264', '2025-12-16 12:10:00.174264', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (81, 12, 13, '2025-12-16 12:10:05.07235', '2025-12-16 12:10:05.07235', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (82, 13, 6, '2025-12-16 12:10:30.147476', '2025-12-16 12:10:30.147476', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (83, 13, 4, '2025-12-16 12:10:48.855967', '2025-12-16 12:10:48.855967', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (84, 13, 8, '2025-12-16 12:10:51.845094', '2025-12-16 12:10:51.845094', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (85, 13, 5, '2025-12-16 12:10:55.365787', '2025-12-16 12:10:55.365787', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (86, 13, 1, '2025-12-16 12:10:58.43115', '2025-12-16 12:10:58.43115', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (87, 13, 3, '2025-12-16 12:11:03.71855', '2025-12-16 12:11:03.71855', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (88, 13, 2, '2025-12-16 12:11:05.703599', '2025-12-16 12:11:05.703599', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (89, 13, 7, '2025-12-16 12:11:09.518391', '2025-12-16 12:11:09.518391', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (90, 13, 30, '2025-12-16 12:11:36.594431', '2025-12-16 12:11:36.594431', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (91, 13, 34, '2025-12-16 12:11:42.157309', '2025-12-16 12:11:42.157309', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (92, 13, 32, '2025-12-16 12:11:50.523598', '2025-12-16 12:11:50.523598', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (93, 13, 36, '2025-12-16 12:11:54.970507', '2025-12-16 12:11:54.970507', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (94, 13, 28, '2025-12-16 12:12:01.017396', '2025-12-16 12:12:01.017396', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (95, 13, 38, '2025-12-16 12:12:05.789314', '2025-12-16 12:12:05.789314', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (96, 13, 33, '2025-12-16 12:12:10.398195', '2025-12-16 12:12:10.398195', '');
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (97, 2, 1, '2025-12-16 12:16:16.975259', '2025-12-16 12:16:16.975259', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (98, 2, 2, '2025-12-16 12:16:17.005474', '2025-12-16 12:16:17.005474', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (99, 2, 3, '2025-12-16 12:16:17.026083', '2025-12-16 12:16:17.026083', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (100, 2, 4, '2025-12-16 12:16:17.046868', '2025-12-16 12:16:17.046868', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (101, 2, 5, '2025-12-16 12:16:17.06601', '2025-12-16 12:16:17.06601', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (102, 2, 6, '2025-12-16 12:16:17.087472', '2025-12-16 12:16:17.087472', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (103, 2, 7, '2025-12-16 12:16:17.109702', '2025-12-16 12:16:17.109702', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (104, 2, 8, '2025-12-16 12:16:17.123818', '2025-12-16 12:16:17.123818', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (105, 2, 9, '2025-12-16 12:16:17.139368', '2025-12-16 12:16:17.139368', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (106, 2, 10, '2025-12-16 12:16:17.1541', '2025-12-16 12:16:17.1541', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (107, 2, 11, '2025-12-16 12:16:17.1811', '2025-12-16 12:16:17.1811', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (108, 2, 12, '2025-12-16 12:16:17.200642', '2025-12-16 12:16:17.200642', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (109, 2, 13, '2025-12-16 12:16:17.222618', '2025-12-16 12:16:17.222618', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (110, 2, 14, '2025-12-16 12:16:17.237442', '2025-12-16 12:16:17.237442', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (111, 2, 15, '2025-12-16 12:16:17.248512', '2025-12-16 12:16:17.248512', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (112, 2, 16, '2025-12-16 12:16:17.258918', '2025-12-16 12:16:17.258918', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (113, 2, 17, '2025-12-16 12:16:17.268303', '2025-12-16 12:16:17.268303', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (114, 2, 18, '2025-12-16 12:16:17.277181', '2025-12-16 12:16:17.277181', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (115, 2, 19, '2025-12-16 12:16:17.287147', '2025-12-16 12:16:17.287147', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (116, 2, 20, '2025-12-16 12:16:17.296859', '2025-12-16 12:16:17.296859', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (117, 2, 21, '2025-12-16 12:16:17.306969', '2025-12-16 12:16:17.306969', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (118, 2, 22, '2025-12-16 12:16:17.317445', '2025-12-16 12:16:17.317445', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (119, 2, 23, '2025-12-16 12:16:17.327771', '2025-12-16 12:16:17.327771', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (120, 2, 24, '2025-12-16 12:16:17.337456', '2025-12-16 12:16:17.337456', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (121, 2, 25, '2025-12-16 12:16:17.347254', '2025-12-16 12:16:17.347254', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (122, 2, 26, '2025-12-16 12:16:17.357585', '2025-12-16 12:16:17.357585', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (123, 2, 27, '2025-12-16 12:16:17.367211', '2025-12-16 12:16:17.367211', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (124, 2, 28, '2025-12-16 12:16:17.378753', '2025-12-16 12:16:17.378753', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (125, 2, 29, '2025-12-16 12:16:17.391483', '2025-12-16 12:16:17.391483', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (126, 2, 30, '2025-12-16 12:16:17.403709', '2025-12-16 12:16:17.403709', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (127, 2, 31, '2025-12-16 12:16:17.416893', '2025-12-16 12:16:17.416893', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (128, 2, 32, '2025-12-16 12:16:17.429759', '2025-12-16 12:16:17.429759', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (129, 2, 33, '2025-12-16 12:16:17.47475', '2025-12-16 12:16:17.47475', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (130, 2, 34, '2025-12-16 12:16:17.51269', '2025-12-16 12:16:17.51269', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (131, 2, 35, '2025-12-16 12:16:17.526344', '2025-12-16 12:16:17.526344', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (132, 2, 36, '2025-12-16 12:16:17.538703', '2025-12-16 12:16:17.538703', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (133, 2, 37, '2025-12-16 12:16:17.55351', '2025-12-16 12:16:17.55351', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (134, 2, 38, '2025-12-16 12:16:17.568487', '2025-12-16 12:16:17.568487', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (135, 2, 39, '2025-12-16 12:16:17.582615', '2025-12-16 12:16:17.582615', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (136, 2, 40, '2025-12-16 12:16:17.597556', '2025-12-16 12:16:17.597556', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (137, 3, 1, '2025-12-16 12:17:31.131978', '2025-12-16 12:17:31.131978', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (138, 3, 2, '2025-12-16 12:17:31.156695', '2025-12-16 12:17:31.156695', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (139, 3, 3, '2025-12-16 12:17:31.180415', '2025-12-16 12:17:31.180415', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (140, 3, 4, '2025-12-16 12:17:31.199863', '2025-12-16 12:17:31.199863', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (141, 3, 5, '2025-12-16 12:17:31.218979', '2025-12-16 12:17:31.218979', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (142, 3, 6, '2025-12-16 12:17:31.241225', '2025-12-16 12:17:31.241225', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (143, 3, 7, '2025-12-16 12:17:31.265084', '2025-12-16 12:17:31.265084', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (144, 3, 8, '2025-12-16 12:17:31.287507', '2025-12-16 12:17:31.287507', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (145, 3, 9, '2025-12-16 12:17:31.306899', '2025-12-16 12:17:31.306899', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (146, 3, 10, '2025-12-16 12:17:31.329584', '2025-12-16 12:17:31.329584', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (147, 3, 11, '2025-12-16 12:17:31.362261', '2025-12-16 12:17:31.362261', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (148, 3, 12, '2025-12-16 12:17:31.395869', '2025-12-16 12:17:31.395869', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (149, 3, 13, '2025-12-16 12:17:31.430468', '2025-12-16 12:17:31.430468', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (150, 3, 14, '2025-12-16 12:17:31.464939', '2025-12-16 12:17:31.464939', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (151, 3, 15, '2025-12-16 12:17:31.48919', '2025-12-16 12:17:31.48919', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (152, 3, 16, '2025-12-16 12:17:31.513524', '2025-12-16 12:17:31.513524', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (153, 3, 17, '2025-12-16 12:17:31.541347', '2025-12-16 12:17:31.541347', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (154, 3, 18, '2025-12-16 12:17:31.579253', '2025-12-16 12:17:31.579253', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (155, 3, 19, '2025-12-16 12:17:31.610155', '2025-12-16 12:17:31.610155', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (156, 3, 20, '2025-12-16 12:17:31.641629', '2025-12-16 12:17:31.641629', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (157, 3, 21, '2025-12-16 12:17:31.676689', '2025-12-16 12:17:31.676689', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (158, 3, 22, '2025-12-16 12:17:31.708429', '2025-12-16 12:17:31.708429', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (159, 3, 23, '2025-12-16 12:17:31.74291', '2025-12-16 12:17:31.74291', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (160, 3, 24, '2025-12-16 12:17:31.783283', '2025-12-16 12:17:31.783283', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (161, 3, 25, '2025-12-16 12:17:31.822399', '2025-12-16 12:17:31.822399', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (162, 3, 26, '2025-12-16 12:17:31.863637', '2025-12-16 12:17:31.863637', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (163, 3, 27, '2025-12-16 12:17:31.901948', '2025-12-16 12:17:31.901948', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (164, 3, 28, '2025-12-16 12:17:31.943191', '2025-12-16 12:17:31.943191', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (165, 3, 29, '2025-12-16 12:17:31.985706', '2025-12-16 12:17:31.985706', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (166, 3, 30, '2025-12-16 12:17:32.028193', '2025-12-16 12:17:32.028193', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (167, 3, 31, '2025-12-16 12:17:32.072662', '2025-12-16 12:17:32.072662', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (168, 3, 32, '2025-12-16 12:17:32.108687', '2025-12-16 12:17:32.108687', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (169, 3, 33, '2025-12-16 12:17:32.143505', '2025-12-16 12:17:32.143505', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (170, 3, 34, '2025-12-16 12:17:32.192713', '2025-12-16 12:17:32.192713', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (171, 3, 35, '2025-12-16 12:17:32.248042', '2025-12-16 12:17:32.248042', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (172, 3, 36, '2025-12-16 12:17:32.288508', '2025-12-16 12:17:32.288508', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (173, 3, 37, '2025-12-16 12:17:32.323084', '2025-12-16 12:17:32.323084', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (174, 3, 38, '2025-12-16 12:17:32.35907', '2025-12-16 12:17:32.35907', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (175, 3, 39, '2025-12-16 12:17:32.407648', '2025-12-16 12:17:32.407648', NULL);
INSERT INTO public.grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES (176, 3, 40, '2025-12-16 12:17:32.441949', '2025-12-16 12:17:32.441949', NULL);

INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (2, 2, 1, 3.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (3, 3, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (4, 4, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (5, 5, 1, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (6, 6, 1, 1.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (7, 7, 1, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (8, 8, 1, 2.4);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (9, 9, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (10, 10, 1, 3.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (11, 11, 1, 2.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (12, 12, 1, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (13, 13, 1, 1.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (14, 14, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (15, 15, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (16, 16, 1, 1.3);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (17, 17, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (18, 18, 1, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (19, 19, 1, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (20, 20, 1, 2.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (21, 21, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (22, 22, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (23, 23, 1, 3.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (24, 24, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (25, 25, 1, 1.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (26, 26, 1, 1.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (27, 27, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (28, 28, 1, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (29, 29, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (30, 30, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (31, 31, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (32, 32, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (33, 33, 1, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (34, 34, 1, 2.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (35, 35, 1, 3.7);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (36, 36, 1, 1.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (37, 37, 1, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (38, 38, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (39, 39, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (40, 40, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (41, 41, 1, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (42, 42, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (43, 43, 12, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (44, 44, 12, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (45, 45, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (46, 46, 12, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (47, 47, 12, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (48, 48, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (49, 49, 12, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (50, 50, 12, 2.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (51, 51, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (52, 52, 12, 3.4);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (53, 53, 12, 3.7);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (54, 54, 12, 2.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (55, 55, 12, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (56, 56, 12, 1.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (57, 57, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (58, 58, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (59, 59, 12, 3.4);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (60, 60, 12, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (61, 61, 12, 1.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (62, 62, 12, 2.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (63, 63, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (64, 64, 12, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (65, 65, 12, 3.7);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (66, 66, 12, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (67, 67, 12, 3.6);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (68, 68, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (69, 69, 12, 2.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (70, 70, 12, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (71, 71, 12, 3.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (72, 72, 12, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (73, 73, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (74, 74, 12, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (75, 75, 12, 1.2);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (76, 76, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (77, 77, 12, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (78, 78, 12, 1.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (79, 79, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (80, 80, 12, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (81, 81, 12, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (82, 82, 13, 3.8);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (83, 83, 13, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (84, 84, 13, 2.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (85, 85, 13, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (86, 86, 13, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (87, 87, 13, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (88, 88, 13, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (89, 89, 13, 3.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (90, 90, 13, 3.5);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (91, 91, 13, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (92, 92, 13, 2.1);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (93, 93, 13, 3.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (94, 94, 13, 3.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (95, 95, 13, 4.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (96, 96, 13, 3.9);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (97, 97, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (98, 98, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (99, 99, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (100, 100, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (101, 101, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (102, 102, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (103, 103, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (104, 104, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (105, 105, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (106, 106, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (107, 107, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (108, 108, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (109, 109, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (110, 110, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (111, 111, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (112, 112, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (113, 113, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (114, 114, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (115, 115, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (116, 116, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (117, 117, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (118, 118, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (119, 119, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (120, 120, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (121, 121, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (122, 122, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (123, 123, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (124, 124, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (125, 125, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (126, 126, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (127, 127, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (128, 128, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (129, 129, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (130, 130, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (131, 131, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (132, 132, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (133, 133, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (134, 134, 2, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (135, 135, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (136, 136, 2, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (137, 137, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (138, 138, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (139, 139, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (140, 140, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (141, 141, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (142, 142, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (143, 143, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (144, 144, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (145, 145, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (146, 146, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (147, 147, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (148, 148, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (149, 149, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (150, 150, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (151, 151, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (152, 152, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (153, 153, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (154, 154, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (155, 155, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (156, 156, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (157, 157, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (158, 158, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (159, 159, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (160, 160, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (161, 161, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (162, 162, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (163, 163, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (164, 164, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (165, 165, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (166, 166, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (167, 167, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (168, 168, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (169, 169, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (170, 170, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (171, 171, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (172, 172, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (173, 173, 3, 2.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (174, 174, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (175, 175, 3, 0.0);
INSERT INTO public.criteria_grades (id, grade_id, criterion_id, xp)
VALUES (176, 176, 3, 0.0);

INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (1, 'Marchewka',
        'Marchewka to symbol ukrytej siły i cierpliwości. Choć na powierzchni wygląda skromnie, w głębi kryje soczystą energię i bogactwo doświadczeń. W Polymorphii reprezentuje wytrwałość i rozwój – potrzebuje czasu, by osiągnąć pełnię swojego potencjału. Każdy dzień spędzony na zgłębianiu świata czyni ją silniejszą i bardziej świadomą swoich możliwości. Marchewka przywraca zmęczonym duszom utracone doświadczenie, pozwalając im szybciej powrócić na ścieżkę nauki. To dar dla tych, którzy nie boją się uczyć na własnych błędach i iść naprzód.',
        'images/items/carrot.webp', 0, 1, 'i1');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (2, 'Weterynarz',
        'Weterynarz symbolizuje opiekę nad rozwojem i szybką regenerację umysłu. Reprezentuje zdolność do leczenia chwilowych braków i inwestowania w przyszłe sukcesy. Jego mocą jest podwojenie doświadczenia za kartkówkę (przeszłą lub przyszłą), co przekształca małe testy w wielkie lekcje. Oferuje także darmowy zastrzyk wiedzy – natychmiastowy impuls do zrozumienia i skokowego wzrostu kompetencji. To dar dla tych, którzy potrzebują szybkiego powrotu do formy i pewności, by ruszyć na ścieżkę nauki z podwojoną energią.',
        'images/items/vet.webp', 1, 1, 'i2');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (3, 'Pietruszka',
        'Pietruszka to dusza radosna i wszechstronna. Jej świeżość wprowadza lekkość, a obecność - mimo niewielkich rozmiarów - potrafi odmienić całe otoczenie. W Polymorphii uczy, że nawet najmniejsze działania mogą mieć wielką moc. Z otwartym sercem chłonie nowe doświadczenia, a jej naturalna ciekawość i elastyczność pozwalają jej odnaleźć się w każdej sytuacji. Pietruszka delikatnie odnawia siły witalne, regenerując energię potrzebną do dalszej drogi. Jej działanie to przypomnienie, że odnowa przychodzi często z najmniej spodziewanych miejsc.',
        'images/items/parsley.webp', 2, 1, 'i3');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (4, 'Apteczka',
        'Apteczka to symbol gotowości i szybkiej regeneracji. Choć często wygląda niepozornie, kryje w sobie narzędzia niezbędne do leczenia ran i przywracania sił witalnych. W Polymorphii reprezentuje zdolność do powrotu do formy i kontynuowania walki – pozwala przetrwać kryzysowe momenty. Użycie jej w potrzebie pozwala błyskawicznie odzyskać zdrowie i gotowość do działania. To dar dla tych, którzy cenią przezorność i potrafią zadbać o siebie lub swoich towarzyszy, nie pozwalając, by odnieśli trwałe rany.',
        'images/items/aid.webp', 3, 1, 'i4');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (5, 'Złota skrzynia laboratoryjna',
        'Złota Skrzynia symbolizuje szczyt wartości i nieokiełznany przepych. Jej olśniewający blask wprost zdradza, jakie skarby kryją się w środku. Posiada moc, której jej srebrna siostra może tylko pozazdrościć, a jej wnętrze wypełnia czyste, bezkompromisowe bogactwo i splendor. Otwarcie Złotej Skrzyni to brama do świata absolutnego luksusu, ostateczna nagroda zarezerwowana dla tych, którzy mają śmiałość sięgnąć po największe bogactwa w swoich poszukiwaniach.',
        'images/chests/s2.webp', 0, 1, 'c1');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (6, 'Srebrna skrzynia laboratoryjna',
        'Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.',
        'images/chests/s1.webp', 1, 1, 'c2');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (7, 'Brązowa skrzynia laboratoryjna',
        'Brązowa Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.',
        'images/chests/b1.webp', 2, 1, 'c3');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (8, 'Złota skrzynia projektowa',
        'Złota Skrzynia symbolizuje szczyt wartości i nieokiełznany przepych. Jej olśniewający blask wprost zdradza, jakie skarby kryją się w środku. Posiada moc, której jej srebrna siostra może tylko pozazdrościć, a jej wnętrze wypełnia czyste, bezkompromisowe bogactwo i splendor. Otwarcie Złotej Skrzyni to brama do świata absolutnego luksusu, ostateczna nagroda zarezerwowana dla tych, którzy mają śmiałość sięgnąć po największe bogactwa w swoich poszukiwaniach.',
        'images/chests/s2.webp', 3, 1, 'c4');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (9, 'Srebrna skrzynia projektowa',
        'Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.',
        'images/chests/s1.webp', 4, 1, 'c5');
INSERT INTO public.rewards (id, name, description, image_url, order_index, course_id, key)
VALUES (10, 'Brązowa skrzynia projektowa',
        'Brązowa Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.',
        'images/chests/b1.webp', 5, 1, 'c6');

INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (4, 4, 5, '2025-12-16 12:03:50.031551', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (9, 10, 5, '2025-12-16 12:04:19.084164', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (10, 11, 7, '2025-12-16 12:04:24.53717', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (12, 14, 5, '2025-12-16 12:04:46.441493', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (13, 15, 5, '2025-12-16 12:04:51.338947', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (14, 17, 5, '2025-12-16 12:05:05.384838', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (17, 20, 7, '2025-12-16 12:05:22.303436', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (18, 21, 5, '2025-12-16 12:05:29.867237', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (19, 22, 5, '2025-12-16 12:05:34.394509', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (20, 23, 6, '2025-12-16 12:05:39.188575', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (23, 27, 5, '2025-12-16 12:05:58.205217', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (24, 28, 6, '2025-12-16 12:06:03.813319', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (25, 29, 5, '2025-12-16 12:06:07.442619', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (26, 30, 5, '2025-12-16 12:06:10.834156', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (28, 32, 5, '2025-12-16 12:06:19.516472', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (31, 35, 5, '2025-12-16 12:06:35.176719', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (32, 36, 7, '2025-12-16 12:06:39.322111', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (34, 38, 5, '2025-12-16 12:06:48.38547', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (36, 40, 5, '2025-12-16 12:06:56.798716', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (38, 31, 1, '2025-12-16 12:21:54.264711', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (39, 31, 2, '2025-12-16 12:21:54.264711', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (27, 31, 5, '2025-12-16 12:06:15.266519', '2025-12-16 12:21:54.264711', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (40, 2, 1, '2025-12-16 12:22:33.8053', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (2, 2, 6, '2025-12-16 12:03:39.674215', '2025-12-16 12:22:33.8053', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (41, 12, 1, '2025-12-16 12:22:48.086761', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (42, 12, 2, '2025-12-16 12:22:48.086761', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (11, 12, 5, '2025-12-16 12:04:31.986398', '2025-12-16 12:22:48.086761', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (43, 24, 1, '2025-12-16 12:23:01.854847', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (44, 24, 2, '2025-12-16 12:23:01.854847', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (21, 24, 5, '2025-12-16 12:05:43.436016', '2025-12-16 12:23:01.854847', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (45, 41, 1, '2025-12-16 12:23:16.81731', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (46, 41, 2, '2025-12-16 12:23:16.81731', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (37, 41, 5, '2025-12-16 12:07:00.996659', '2025-12-16 12:23:16.81731', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (47, 39, 1, '2025-12-16 12:23:32.208497', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (48, 39, 2, '2025-12-16 12:23:32.208497', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (35, 39, 5, '2025-12-16 12:06:53.046487', '2025-12-16 12:23:32.208497', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (49, 9, 1, '2025-12-16 12:25:10.192821', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (50, 9, 2, '2025-12-16 12:25:10.192821', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (8, 9, 5, '2025-12-16 12:04:13.285733', '2025-12-16 12:25:10.192821', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (51, 25, 2, '2025-12-16 12:25:29.528798', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (22, 25, 7, '2025-12-16 12:05:50.632962', '2025-12-16 12:25:29.528798', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (52, 18, 2, '2025-12-16 12:25:44.251058', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (15, 18, 6, '2025-12-16 12:05:10.694635', '2025-12-16 12:25:44.251058', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (53, 37, 2, '2025-12-16 12:25:59.181477', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (33, 37, 6, '2025-12-16 12:06:44.254818', '2025-12-16 12:25:59.181477', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (54, 3, 1, '2025-12-16 12:26:12.885376', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (55, 3, 2, '2025-12-16 12:26:12.885376', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (3, 3, 5, '2025-12-16 12:03:45.299848', '2025-12-16 12:26:12.885376', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (56, 34, 2, '2025-12-16 12:26:27.794134', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (30, 34, 6, '2025-12-16 12:06:29.894874', '2025-12-16 12:26:27.794134', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (57, 19, 1, '2025-12-16 12:26:40.360619', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (16, 19, 6, '2025-12-16 12:05:15.790543', '2025-12-16 12:26:40.360619', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (58, 33, 1, '2025-12-16 12:26:52.437536', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (59, 33, 2, '2025-12-16 12:26:52.437536', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (29, 33, 5, '2025-12-16 12:06:25.436155', '2025-12-16 12:26:52.437536', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (60, 8, 2, '2025-12-16 12:31:23.54583', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (7, 8, 6, '2025-12-16 12:04:08.774593', '2025-12-16 12:31:23.54583', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (61, 7, 1, '2025-12-16 12:31:37.635418', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (6, 7, 6, '2025-12-16 12:04:03.814568', '2025-12-16 12:31:37.635418', true);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (62, 5, 2, '2025-12-16 12:32:03.598711', NULL, false);
INSERT INTO public.assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date,
                                     is_used)
VALUES (5, 5, 7, '2025-12-16 12:03:54.14497', '2025-12-16 12:32:03.598711', true);

INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (2);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (3);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (4);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (5);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (6);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (7);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (8);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (9);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (10);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (11);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (12);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (13);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (14);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (15);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (16);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (17);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (18);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (19);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (20);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (21);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (22);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (23);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (24);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (25);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (26);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (27);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (28);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (29);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (30);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (31);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (32);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (33);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (34);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (35);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (36);
INSERT INTO public.assigned_chests (assigned_reward_id)
VALUES (37);

INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (39, 27, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (38, 27, 0.8);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (40, 2, 0.8);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (42, 11, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (41, 11, 0.6);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (44, 21, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (43, 21, 0.4);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (46, 37, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (45, 37, 0.4);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (48, 35, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (47, 35, 0.4);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (50, 8, 0.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (49, 8, 0.4);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (51, 22, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (52, 15, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (53, 33, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (55, 3, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (54, 3, 0.3);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (56, 30, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (57, 16, 0.3);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (59, 29, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (58, 29, 0.8);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (60, 7, 2.0);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (61, 6, 0.4);
INSERT INTO public.assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES (62, 5, 0.0);

INSERT INTO public.assignment_sections (id)
VALUES (1);
INSERT INTO public.assignment_sections (id)
VALUES (3);

INSERT INTO public.assignments (id)
VALUES (1);
INSERT INTO public.assignments (id)
VALUES (12);
INSERT INTO public.assignments (id)
VALUES (13);
INSERT INTO public.assignments (id)
VALUES (14);
INSERT INTO public.assignments (id)
VALUES (15);
INSERT INTO public.assignments (id)
VALUES (16);
INSERT INTO public.assignments (id)
VALUES (17);
INSERT INTO public.assignments (id)
VALUES (18);
INSERT INTO public.assignments (id)
VALUES (19);

INSERT INTO public.chests (reward_id, behavior)
VALUES (5, 'ALL');
INSERT INTO public.chests (reward_id, behavior)
VALUES (6, 'ONE_OF_MANY');
INSERT INTO public.chests (reward_id, behavior)
VALUES (7, 'ALL');
INSERT INTO public.chests (reward_id, behavior)
VALUES (8, 'ALL');
INSERT INTO public.chests (reward_id, behavior)
VALUES (9, 'ONE_OF_MANY');
INSERT INTO public.chests (reward_id, behavior)
VALUES (10, 'ALL');

INSERT INTO public.items (reward_id, "limit", event_section_id)
VALUES (1, 3, 3);
INSERT INTO public.items (reward_id, "limit", event_section_id)
VALUES (2, 14, 2);
INSERT INTO public.items (reward_id, "limit", event_section_id)
VALUES (3, 4, 4);
INSERT INTO public.items (reward_id, "limit", event_section_id)
VALUES (4, 14, 3);

INSERT INTO public.chests_items (chest_id, item_id)
VALUES (5, 1);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (6, 1);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (5, 2);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (6, 2);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (7, 2);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (8, 3);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (9, 3);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (8, 4);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (9, 4);
INSERT INTO public.chests_items (chest_id, item_id)
VALUES (10, 4);

INSERT INTO public.course_groups (id, name, course_id, teaching_role_user_id, room)
VALUES (1, 'MI-PN-0800', 1, 1, '3.15');
INSERT INTO public.course_groups (id, name, course_id, teaching_role_user_id, room)
VALUES (2, 'JK-ŚR-0800', 1, 2, '4.20');
INSERT INTO public.course_groups (id, name, course_id, teaching_role_user_id, room)
VALUES (3, 'JK-CZ-1430', 1, 2, '2.11');
INSERT INTO public.course_groups (id, name, course_id, teaching_role_user_id, room)
VALUES (4, 'AN-WT-1000', 1, 3, '3.27');
INSERT INTO public.course_groups (id, name, course_id, teaching_role_user_id, room)
VALUES (5, 'AN-PT-1200', 1, 3, '4.38');

INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (1, 5, 1);
INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (1, 6, 1);
INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (1, 7, 1);
INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (16, 6, 1);
INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (18, 6, 1);
INSERT INTO public.criteria_rewards (criterion_id, reward_id, max_amount)
VALUES (22, 6, 1);

INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (1, 'Jajo',
        'Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.',
        0.0, 0, 2.0, 'images/evolution-stages/egg.webp', 1, 'evolution_stage_1');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (2, 'Pisklak',
        'Pisklak to młoda istota pełna energii, która stawia swoje pierwsze, niepewne kroki. Jego determinacja przewyższa jeszcze skromne umiejętności, ale nie brakuje mu zapału do nauki. To etap eksploracji i chłonięcia wiedzy od starszych. Każde wyzwanie traktuje jako lekcję, a entuzjazm sprawia, że śmiało patrzy w przyszłość Polymorphii. Z puchatymi piórkami i szeroko otwartymi oczami pochłania obrazy świata, budując własne rozumienie rzeczywistości. Jego nieustanna ciekawość i zdolność do szybkiej nauki sprawiają, że każdy dzień przynosi nowe odkrycia. W sercu Pisklaka rodzi się odwaga, która pewnego dnia pozwoli mu wznieść się wysoko.',
        25.0, 1, 2.0, 'images/evolution-stages/1.webp', 1, 'evolution_stage_2');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (3, 'Podlot',
        'Podlot to fascynujący etap przemiany, zawieszony między niewinnością młodości a rodzącą się dojrzałością. Opuszcza bezpieczne gniazdo, kierowany instynktem odkrywania rozległego świata Polymorphii, choć jego pierwsze loty naznaczone są jeszcze niepewnością i drobnymi potknięciami. Z ciekawością chłonie wiedzę i doświadczenia od starszych, uważnie obserwując ich mądrość i umiejętności, lecz jednocześnie zaczyna instynktownie poszukiwać własnej, unikalnej ścieżki. Każde nowe wyzwanie traktuje z mieszanką entuzjazmu i lekkiego strachu, a każda napotkana trudność staje się cenną lekcją, budując jego wewnętrzną siłę i odporność. W jego młodym sercu coraz mocniej pulsuje pragnienie samodzielności, a ciekawość świata pcha go do eksploracji nieznanych zakątków Polymorphii.',
        50.0, 2, 3.0, 'images/evolution-stages/2.webp', 1, 'evolution_stage_3');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (4, 'Żółtodziób',
        'Żółtodziób to pełna entuzjazmu postać, która zaczyna rozumieć świat wokół siebie. Choć wciąż brakuje mu pewności i doświadczenia, chętnie podejmuje nowe wyzwania. Z otwartym umysłem i niegasnącą energią stara się rozwijać swoje zdolności. Każda sytuacja jest dla niego szansą, by stać się mądrzejszym i bardziej świadomym mieszkańcem Polymorphii. Jego charakterystyczny żółty dziób symbolizuje świeżość spojrzenia i gotowość do nauki. Popełnia błędy, ale szybko wyciąga z nich wnioski, co czyni go coraz bardziej odpornym na przeciwności losu. Żółtodziób balansuje między dziecięcą radością odkrywania a rodzącym się pragnieniem zrozumienia głębszych prawd świata.',
        60.0, 3, 3.5, 'images/evolution-stages/3.webp', 1, 'evolution_stage_4');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (5, 'Samodzielny Zwierzak',
        'Samodzielny Zwierzak to dojrzała postać, która wie, jak poruszać się po świecie Polymorphii. Jego decyzje są przemyślane, a działania odważne, lecz odpowiedzialne. Zdobyte doświadczenie pozwala mu lepiej rozumieć otoczenie i siebie. Choć wiele już osiągnął, nieustannie dąży do rozwoju, z pokorą i mądrością podejmując kolejne wyzwania. Jego pióra lśnią pełnią barw, odzwierciedlając bogactwo przeżyć i zdobytą wiedzę. Potrafi dostrzec subtelne połączenia między zjawiskami, co czyni go cennym towarzyszem i doradcą. Samodzielny Zwierzak znajduje równowagę między własnym dobrem a potrzebami społeczności, tworząc harmonię w swoim otoczeniu.',
        70.0, 4, 4.0, 'images/evolution-stages/4.webp', 1, 'evolution_stage_5');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (6, 'Nieopierzony Odkrywca',
        'Nieopierzony Odkrywca z zapałem przemierza nieznane tereny Polymorphii. Mimo braku doświadczenia, jego ciekawość i odwaga nie znają granic. Czasem popełnia błędy, ale każdy z nich uczy go czegoś nowego. To podróżnik, który wierzy, że każde potknięcie przybliża go do celu. Pragnie zostać Samodzielnym Zwierzakiem, zdobywając mądrość przez przygody. Jego pióra, choć jeszcze niekompletne, nabierają kolorów odzwierciedlających przeżyte doświadczenia. W jego spojrzeniu widać determinację i głód wiedzy, który pcha go naprzód nawet wtedy, gdy droga staje się trudna. Nieopierzony Odkrywca buduje własną tożsamość, łącząc fragmenty zdobytej wiedzy w spójną całość.',
        80.0, 5, 4.5, 'images/evolution-stages/5.webp', 1, 'evolution_stage_6');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (7, 'Majestatyczna Bestia',
        'Majestatyczna Bestia to istota o ogromnej sile i głębokiej mądrości. Zyskała szacunek dzięki odwadze i rozwadze, z jaką stawia czoła losowi. Jej potęga nie leży jedynie w mocy, lecz w zdolności rozumienia innych. To postać, która inspiruje, prowadzi i uczy. Każde jej działanie jest świadectwem drogi, jaką przebyła w Polymorphii. W jej oczach odbija się historia wielu pokoleń, a w głosie brzmi echo dawnych legend. Majestatyczna Bestia stoi na straży równowagi świata, wykorzystując swoją mądrość do rozwiązywania najbardziej złożonych problemów. Jej obecność przynosi spokój, a rada - jasność w chaosie. To ucieleśnienie potęgi płynącej z harmonii między siłą a dobrocią.',
        90.0, 6, 5.0, 'images/evolution-stages/6.webp', 1, 'evolution_stage_7');
INSERT INTO public.evolution_stages (id, name, description, min_xp, order_index, grade, image_url,
                                     course_id, key)
VALUES (8, 'Władca Polymorphii',
        'Władca Polymorphii to najwyższa forma doskonałości i mocy, która osiągnęła szczyt swojej ewolucji. Jego obecność wzbudza podziw i respekt, a każdy jego krok niesie ze sobą siłę przemiany i niezmąconą pewność siebie. Władca zna wszystkie sekrety świata Polymorphii, potrafi kształtować rzeczywistość według własnej woli i przewodzi z mądrością, którą zdobył dzięki niezliczonym doświadczeniom. Jego spojrzenie przenika najgłębsze zakamarki istnienia, dostrzegając to, co niewidoczne dla innych. Pomimo ogromnej potęgi, Władca pozostaje pokorny i świadomy swojej odpowiedzialności wobec świata i jego mieszkańców. Jego pióra błyszczą jak koronny diadem, a aura, którą emanuje, inspiruje innych do dążenia do własnej przemiany i wzrostu. To mistrz równowagi, który łączy siłę z mądrością, a wolę z współczuciem, tworząc harmonię zarówno w sobie, jak i w całej Polymorphii.',
        100.0, 7, 5.0, 'images/evolution-stages/7.webp', 1, 'evolution_stage_8');

INSERT INTO public.flat_bonus_items (item_id, xp_bonus, behavior)
VALUES (2, 2.0, 'ONE_EVENT');
INSERT INTO public.flat_bonus_items (item_id, xp_bonus, behavior)
VALUES (4, 2.0, 'MULTIPLE_EVENTS');

INSERT INTO public.percentage_bonus_items (item_id, percentage_bonus)
VALUES (1, 10);
INSERT INTO public.percentage_bonus_items (item_id, percentage_bonus)
VALUES (3, 10);

INSERT INTO public.projects (id, allow_cross_course_group_project_groups)
VALUES (20, true);

INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (2, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (3, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (4, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (6, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (7, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (8, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (9, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (10, 20, 2);
INSERT INTO public.project_groups (id, project_id, teaching_role_user_id)
VALUES (11, 20, 1);

INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (10, 3);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (22, 3);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (9, 4);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (23, 4);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (16, 6);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (20, 6);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (11, 7);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (13, 7);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (12, 8);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (14, 8);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (19, 9);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (21, 9);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (17, 10);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (18, 10);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (15, 2);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (24, 2);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (4, 11);
INSERT INTO public.project_groups_animals (animal_id, project_group_id)
VALUES (6, 11);

INSERT INTO public.project_variant_categories (id, project_id, name, key)
VALUES (1, 20, 'Mapa i roślinność', 'es4_ge1_vc1');
INSERT INTO public.project_variant_categories (id, project_id, name, key)
VALUES (2, 20, 'Zwierzaki', 'es4_ge1_vc2');

INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (1, 1, 'Bieguny', 'A', 'Im bliżej bieguna, tym większa utrata energii.',
        'images/general/poles.webp', 'es4_ge1_vc1_v1');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (2, 1, 'Pożary', 'B', 'Pożar rozprzestrzenia się na rośliny i zabija zwierzęta.',
        'images/general/fire.webp', 'es4_ge1_vc1_v2');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (3, 1, 'Przypływy i odpływy', 'C',
        'Cyklicznie zmieniające się obszary wodne niedostępne dla zwierząt.',
        'images/general/tides.webp', 'es4_ge1_vc1_v3');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (4, 1, 'Dziki sowoniedźwiedź', 'D',
        'Drapieżnik polujący na zwierzęta w wyznaczonym obszarze.', 'images/general/owlbear.webp',
        'es4_ge1_vc1_v4');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (5, 1, 'Życiodajne truchła', 'E', 'Rośliny rosną tam, gdzie padły zwierzęta.',
        'images/general/corpses.webp', 'es4_ge1_vc1_v5');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (6, 1, 'Pełzająca dżungla', 'F', 'Rośliny pojawiają się w sąsiedztwie istniejących roślin.',
        'images/general/jungle.webp', 'es4_ge1_vc1_v6');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (7, 1, 'Dorodne plony', 'G', 'Duże rośliny dające więcej energii na wybranym obszarze.',
        'images/general/crops.webp', 'es4_ge1_vc1_v7');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (8, 2, 'Lekka korekta', '1', 'Mutacja zmienia gen o 1 w górę lub w dół.',
        'images/general/correction.webp', 'es4_ge1_vc2_v1');
INSERT INTO public.project_variants (id, project_variant_category_id, name, short_code, description,
                                     image_url, key)
VALUES (9, 2, 'Podmianka', '2', 'Mutacja zamienia dwa geny miejscami.', 'images/general/swap.webp',
        'es4_ge1_vc2_v2');

INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (3, 4);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (3, 9);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (4, 6);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (4, 8);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (6, 7);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (6, 8);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (7, 5);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (7, 9);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (8, 3);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (8, 9);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (9, 4);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (9, 8);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (10, 7);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (10, 9);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (2, 2);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (2, 8);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (11, 1);
INSERT INTO public.project_groups_project_variants (project_group_id, project_variant_id)
VALUES (11, 8);

INSERT INTO public.project_sections (id)
VALUES (4);

INSERT INTO public.students (user_id, index_number)
VALUES (4, 100000);
INSERT INTO public.students (user_id, index_number)
VALUES (5, 100001);
INSERT INTO public.students (user_id, index_number)
VALUES (6, 100002);
INSERT INTO public.students (user_id, index_number)
VALUES (7, 100003);
INSERT INTO public.students (user_id, index_number)
VALUES (8, 100004);
INSERT INTO public.students (user_id, index_number)
VALUES (9, 100005);
INSERT INTO public.students (user_id, index_number)
VALUES (10, 100006);
INSERT INTO public.students (user_id, index_number)
VALUES (11, 100007);
INSERT INTO public.students (user_id, index_number)
VALUES (12, 100008);
INSERT INTO public.students (user_id, index_number)
VALUES (13, 100009);
INSERT INTO public.students (user_id, index_number)
VALUES (14, 100010);
INSERT INTO public.students (user_id, index_number)
VALUES (15, 100011);
INSERT INTO public.students (user_id, index_number)
VALUES (16, 100012);
INSERT INTO public.students (user_id, index_number)
VALUES (17, 100013);
INSERT INTO public.students (user_id, index_number)
VALUES (18, 100014);
INSERT INTO public.students (user_id, index_number)
VALUES (19, 100015);
INSERT INTO public.students (user_id, index_number)
VALUES (20, 100016);
INSERT INTO public.students (user_id, index_number)
VALUES (21, 100017);
INSERT INTO public.students (user_id, index_number)
VALUES (22, 100018);
INSERT INTO public.students (user_id, index_number)
VALUES (23, 100019);
INSERT INTO public.students (user_id, index_number)
VALUES (24, 100020);
INSERT INTO public.students (user_id, index_number)
VALUES (25, 100021);
INSERT INTO public.students (user_id, index_number)
VALUES (26, 100022);
INSERT INTO public.students (user_id, index_number)
VALUES (27, 100023);
INSERT INTO public.students (user_id, index_number)
VALUES (28, 100024);
INSERT INTO public.students (user_id, index_number)
VALUES (29, 100025);
INSERT INTO public.students (user_id, index_number)
VALUES (30, 100026);
INSERT INTO public.students (user_id, index_number)
VALUES (31, 100027);
INSERT INTO public.students (user_id, index_number)
VALUES (32, 100028);
INSERT INTO public.students (user_id, index_number)
VALUES (33, 100029);
INSERT INTO public.students (user_id, index_number)
VALUES (34, 100030);
INSERT INTO public.students (user_id, index_number)
VALUES (35, 100031);
INSERT INTO public.students (user_id, index_number)
VALUES (36, 100032);
INSERT INTO public.students (user_id, index_number)
VALUES (37, 100033);
INSERT INTO public.students (user_id, index_number)
VALUES (38, 100034);
INSERT INTO public.students (user_id, index_number)
VALUES (39, 100035);
INSERT INTO public.students (user_id, index_number)
VALUES (40, 100036);
INSERT INTO public.students (user_id, index_number)
VALUES (41, 100037);
INSERT INTO public.students (user_id, index_number)
VALUES (42, 100038);
INSERT INTO public.students (user_id, index_number)
VALUES (43, 100039);

INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (1, 4, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (2, 5, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (3, 6, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (4, 7, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (5, 8, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (6, 9, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (7, 10, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (8, 11, 1);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (9, 12, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (10, 13, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (11, 14, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (12, 15, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (13, 16, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (14, 17, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (15, 18, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (16, 19, 2);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (17, 20, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (18, 21, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (19, 22, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (20, 23, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (21, 24, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (22, 25, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (23, 26, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (24, 27, 3);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (25, 28, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (26, 29, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (27, 30, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (28, 31, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (29, 32, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (30, 33, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (31, 34, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (32, 35, 4);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (33, 36, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (34, 37, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (35, 38, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (36, 39, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (37, 40, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (38, 41, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (39, 42, 5);
INSERT INTO public.students_course_groups (animal_id, student_id, course_group_id)
VALUES (40, 43, 5);

INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (1, 1, 'Link do repozytorium', true, 0, 'es1_ge1_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (2, 12, 'Link do pull requesta', true, 0, 'es3_ge1_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (3, 13, 'Link do pull requesta', true, 0, 'es3_ge2_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (4, 14, 'Link do pull requesta', true, 0, 'es3_ge3_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (5, 15, 'Link do pull requesta', true, 0, 'es3_ge4_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (6, 15, 'Link do zadania dodatkowego', false, 1, 'es3_ge4_sr2');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (7, 16, 'Link do pull requesta', true, 0, 'es3_ge5_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (8, 16, 'Link do zadania dodatkowego', false, 1, 'es3_ge5_sr2');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (9, 17, 'Link do pull requesta', true, 0, 'es3_ge6_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (10, 18, 'Link do pull requesta', true, 0, 'es3_ge7_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (11, 19, 'Link do pull requesta', true, 0, 'es3_ge8_sr1');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (12, 19, 'Link do zadania dodatkowego', false, 1, 'es3_ge8_sr2');
INSERT INTO public.submission_requirements (id, gradable_event_id, name, is_mandatory, order_index,
                                            key)
VALUES (13, 20, 'Link do repozytorium', true, 0, 'es4_ge1_sr1');

INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (2, 1, 1, 'https://github.com/mwójcik/PO_Git', true, '2023-10-28 00:38:29.272387',
        '2023-10-25 20:40:56.55612');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (3, 1, 2, 'https://github.com/pkamiński/PO_Git', true, '2023-10-23 10:00:15.270796',
        '2023-10-18 01:04:34.178525');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (4, 1, 3, 'https://github.com/pdąbrowski/PO_Git', true, '2023-10-07 23:24:32.89338',
        '2023-10-07 07:50:53.917418');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (5, 1, 4, 'https://github.com/alewandowska/PO_Git', true, '2023-10-02 04:21:37.85146',
        '2023-10-11 07:49:18.060915');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (6, 1, 5, 'https://github.com/jjankowska/PO_Git', true, '2023-10-17 18:44:32.857082',
        '2023-10-25 23:38:42.10372');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (7, 1, 6, 'https://github.com/akowalczyk/PO_Git', true, '2023-10-20 15:12:03.916445',
        '2023-10-14 20:11:44.198342');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (8, 1, 7, 'https://github.com/tjankowski/PO_Git', true, '2023-10-21 15:29:47.283115',
        '2023-10-24 06:11:21.296925');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (9, 1, 8, 'https://github.com/jszymański/PO_Git', true, '2023-10-30 07:31:45.708165',
        '2023-10-01 22:16:45.127049');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (10, 1, 9, 'https://github.com/mkowalczyk/PO_Git', true, '2023-10-12 15:52:21.097243',
        '2023-10-17 19:22:07.299198');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (11, 1, 10, 'https://github.com/mwójcik/PO_Git', true, '2023-10-16 07:25:28.666988',
        '2023-10-23 17:34:03.244209');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (12, 1, 11, 'https://github.com/tnowak/PO_Git', true, '2023-10-24 13:59:58.020484',
        '2023-10-26 00:40:40.587437');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (13, 1, 12, 'https://github.com/elewandowska/PO_Git', true, '2023-10-30 17:07:34.129767',
        '2023-10-28 20:06:21.608193');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (14, 1, 13, 'https://github.com/twoźniak/PO_Git', true, '2023-10-08 02:55:08.555153',
        '2023-10-04 05:45:55.505992');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (15, 1, 14, 'https://github.com/ezielińska/PO_Git', true, '2023-10-16 23:36:14.51376',
        '2023-10-25 13:14:46.161923');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (16, 1, 15, 'https://github.com/azielińska/PO_Git', true, '2023-10-30 13:16:06.362532',
        '2023-10-06 14:31:48.300612');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (17, 1, 16, 'https://github.com/kdąbrowski/PO_Git', true, '2023-10-05 11:46:54.173374',
        '2023-10-09 21:46:27.133929');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (18, 1, 17, 'https://github.com/tmazur/PO_Git', true, '2023-10-30 06:12:40.444446',
        '2023-10-14 04:55:08.84617');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (19, 1, 18, 'https://github.com/mmazur/PO_Git', true, '2023-10-05 07:17:56.074906',
        '2023-10-28 13:43:41.122382');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (20, 1, 19, 'https://github.com/mzielińska/PO_Git', true, '2023-10-01 21:44:59.086245',
        '2023-10-26 12:42:06.907528');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (21, 1, 20, 'https://github.com/ewoźniak/PO_Git', true, '2023-10-10 00:44:35.055353',
        '2023-10-10 18:21:53.561053');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (22, 1, 21, 'https://github.com/jkozłowska/PO_Git', true, '2023-10-18 08:20:07.074368',
        '2023-10-17 03:55:34.594266');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (23, 1, 22, 'https://github.com/edąbrowska/PO_Git', true, '2023-10-12 14:16:34.118345',
        '2023-10-21 21:13:51.785429');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (24, 1, 23, 'https://github.com/pkowalski/PO_Git', true, '2023-10-15 07:23:49.272869',
        '2023-10-20 04:08:13.638184');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (25, 1, 24, 'https://github.com/akozłowska/PO_Git', true, '2023-10-24 09:00:37.342951',
        '2023-10-02 04:56:25.186998');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (26, 1, 25, 'https://github.com/mkamiński/PO_Git', true, '2023-10-06 03:38:21.76166',
        '2023-10-02 18:33:57.292769');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (27, 1, 26, 'https://github.com/pnowak/PO_Git', true, '2023-10-30 14:48:29.957417',
        '2023-10-30 20:27:55.900242');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (28, 1, 27, 'https://github.com/klewandowski/PO_Git', true, '2023-10-14 05:48:37.164405',
        '2023-10-16 17:13:22.026726');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (29, 1, 28, 'https://github.com/pzieliński/PO_Git', true, '2023-10-13 16:58:41.990749',
        '2023-10-12 21:49:23.298885');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (30, 1, 29, 'https://github.com/tkowalski/PO_Git', true, '2023-10-30 13:58:09.526894',
        '2023-10-23 10:39:42.030118');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (31, 1, 30, 'https://github.com/knowak/PO_Git', true, '2023-10-15 19:36:27.846122',
        '2023-10-21 19:44:52.560752');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (32, 1, 31, 'https://github.com/awiśniewski/PO_Git', true, '2023-10-03 14:53:54.484798',
        '2023-10-06 23:23:16.959924');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (33, 1, 32, 'https://github.com/mnowak/PO_Git', true, '2023-10-17 21:30:02.083992',
        '2023-10-31 00:11:32.342774');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (34, 1, 33, 'https://github.com/plewandowski/PO_Git', true, '2023-10-30 04:00:37.582463',
        '2023-10-05 13:40:55.284146');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (35, 1, 34, 'https://github.com/kwójcik/PO_Git', true, '2023-10-26 22:34:01.968902',
        '2023-10-06 13:16:27.683479');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (36, 1, 35, 'https://github.com/kwiśniewski/PO_Git', true, '2023-10-14 06:55:38.194838',
        '2023-10-04 16:50:19.130494');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (37, 1, 36, 'https://github.com/mwiśniewska/PO_Git', true, '2023-10-16 09:02:49.316729',
        '2023-10-30 11:58:35.482203');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (38, 1, 37, 'https://github.com/tlewandowski/PO_Git', true, '2023-10-08 13:29:39.126783',
        '2023-10-26 20:53:59.171804');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (39, 1, 38, 'https://github.com/pkozłowski/PO_Git', true, '2023-10-14 20:25:02.224793',
        '2023-10-17 01:17:00.654797');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (40, 1, 39, 'https://github.com/pwiśniewski/PO_Git', true, '2023-10-07 02:55:42.51457',
        '2023-10-26 17:32:49.979731');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (41, 1, 40, 'https://github.com/anowak/PO_Git', true, '2023-10-08 15:36:00.619638',
        '2023-10-27 08:50:29.098896');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (42, 2, 15, 'https://github.com/azielińska/PO_Labs/pull/12', true,
        '2023-11-28 02:11:17.338411', '2023-11-17 17:56:32.119488');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (43, 2, 16, 'https://github.com/kdąbrowski/PO_Labs/pull/12', true,
        '2023-11-15 06:13:20.548995', '2023-11-02 20:58:37.528779');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (44, 2, 30, 'https://github.com/knowak/PO_Labs/pull/12', true, '2023-11-14 16:52:59.328917',
        '2023-11-12 14:18:43.707013');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (45, 2, 4, 'https://github.com/alewandowska/PO_Labs/pull/12', true,
        '2023-11-10 10:46:14.635353', '2023-11-25 03:22:23.101856');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (46, 2, 26, 'https://github.com/pnowak/PO_Labs/pull/12', true, '2023-11-19 08:13:00.764805',
        '2023-11-06 15:34:50.895307');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (47, 2, 2, 'https://github.com/pkamiński/PO_Labs/pull/12', true,
        '2023-11-18 09:54:24.567858', '2023-11-21 21:50:55.031551');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (48, 2, 18, 'https://github.com/mmazur/PO_Labs/pull/12', true, '2023-11-14 20:24:46.333414',
        '2023-11-25 12:07:05.006571');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (49, 2, 38, 'https://github.com/pkozłowski/PO_Labs/pull/12', true,
        '2023-11-18 00:32:25.805635', '2023-11-02 06:30:24.119723');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (50, 2, 37, 'https://github.com/tlewandowski/PO_Labs/pull/12', true,
        '2023-11-14 16:24:34.425011', '2023-11-08 13:42:31.281081');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (51, 2, 9, 'https://github.com/mkowalczyk/PO_Labs/pull/12', true,
        '2023-11-25 06:15:22.463726', '2023-11-12 07:49:36.237825');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (52, 2, 22, 'https://github.com/edąbrowska/PO_Labs/pull/12', true,
        '2023-11-06 03:52:07.158024', '2023-11-30 01:28:01.224431');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (53, 2, 34, 'https://github.com/kwójcik/PO_Labs/pull/12', true, '2023-11-14 06:30:30.00909',
        '2023-11-23 12:57:31.021616');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (54, 2, 40, 'https://github.com/anowak/PO_Labs/pull/12', true, '2023-11-09 06:55:09.129293',
        '2023-11-23 01:41:40.542141');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (55, 2, 5, 'https://github.com/jjankowska/PO_Labs/pull/12', true, '2023-11-19 03:43:11.8646',
        '2023-11-04 12:19:32.435913');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (56, 2, 35, 'https://github.com/kwiśniewski/PO_Labs/pull/12', true,
        '2023-11-07 00:22:06.090779', '2023-11-26 09:29:53.997169');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (57, 2, 6, 'https://github.com/akowalczyk/PO_Labs/pull/12', true,
        '2023-11-21 04:15:58.216347', '2023-11-25 01:04:12.702025');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (58, 2, 21, 'https://github.com/jkozłowska/PO_Labs/pull/12', true,
        '2023-11-12 11:55:58.868864', '2023-11-13 19:45:50.870137');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (59, 2, 13, 'https://github.com/twoźniak/PO_Labs/pull/12', true,
        '2023-11-18 07:36:19.478732', '2023-11-28 10:22:58.606317');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (60, 2, 32, 'https://github.com/mnowak/PO_Labs/pull/12', true, '2023-11-19 01:49:08.630954',
        '2023-11-22 17:55:07.72761');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (61, 2, 28, 'https://github.com/pzieliński/PO_Labs/pull/12', true,
        '2023-11-21 19:55:50.563475', '2023-11-10 08:57:52.801819');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (62, 2, 19, 'https://github.com/mzielińska/PO_Labs/pull/12', true,
        '2023-11-23 12:39:38.510365', '2023-11-10 23:11:07.396125');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (63, 2, 29, 'https://github.com/tkowalski/PO_Labs/pull/12', true,
        '2023-11-05 13:12:56.397769', '2023-11-06 20:11:24.698268');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (64, 2, 1, 'https://github.com/mwójcik/PO_Labs/pull/12', true, '2023-11-07 20:16:26.114094',
        '2023-11-22 18:11:01.460163');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (65, 2, 12, 'https://github.com/elewandowska/PO_Labs/pull/12', true,
        '2023-11-28 18:35:42.261712', '2023-11-07 10:36:20.894261');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (66, 2, 24, 'https://github.com/akozłowska/PO_Labs/pull/12', true,
        '2023-11-15 15:15:39.926767', '2023-11-28 13:16:19.786839');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (67, 2, 31, 'https://github.com/awiśniewski/PO_Labs/pull/12', true,
        '2023-11-18 09:41:29.518711', '2023-11-17 05:35:15.219923');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (68, 2, 10, 'https://github.com/mwójcik/PO_Labs/pull/12', true, '2023-11-05 02:02:57.010752',
        '2023-11-08 01:07:34.836445');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (69, 2, 7, 'https://github.com/tjankowski/PO_Labs/pull/12', true,
        '2023-11-01 17:56:34.628583', '2023-11-25 00:30:54.593846');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (70, 2, 39, 'https://github.com/pwiśniewski/PO_Labs/pull/12', true,
        '2023-11-11 04:27:02.557567', '2023-11-25 05:01:53.660989');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (71, 2, 27, 'https://github.com/klewandowski/PO_Labs/pull/12', true,
        '2023-11-24 00:23:52.528292', '2023-11-21 05:50:09.416966');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (72, 2, 14, 'https://github.com/ezielińska/PO_Labs/pull/12', true,
        '2023-11-06 11:39:32.901364', '2023-11-19 04:24:27.192625');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (73, 2, 36, 'https://github.com/mwiśniewska/PO_Labs/pull/12', true,
        '2023-11-14 08:30:07.503535', '2023-11-18 01:02:06.357929');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (74, 2, 8, 'https://github.com/jszymański/PO_Labs/pull/12', true,
        '2023-11-23 20:13:44.158453', '2023-11-14 17:24:29.370202');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (75, 2, 3, 'https://github.com/pdąbrowski/PO_Labs/pull/12', true,
        '2023-11-21 15:36:58.328202', '2023-11-22 01:43:58.434497');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (76, 2, 23, 'https://github.com/pkowalski/PO_Labs/pull/12', true,
        '2023-11-21 10:39:16.061259', '2023-11-15 23:43:18.487117');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (77, 2, 20, 'https://github.com/ewoźniak/PO_Labs/pull/12', true,
        '2023-11-20 03:51:25.387487', '2023-11-18 08:21:20.512298');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (78, 2, 17, 'https://github.com/tmazur/PO_Labs/pull/12', true, '2023-11-15 18:30:54.775276',
        '2023-11-28 03:16:43.461273');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (79, 2, 25, 'https://github.com/mkamiński/PO_Labs/pull/12', true,
        '2023-11-13 04:51:18.473913', '2023-11-27 13:57:55.820503');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (92, 3, 37, 'https://github.com/tlewandowski/PO_Labs/pull/13', false,
        '2023-12-20 06:19:25.262276', '2023-12-18 02:57:46.329655');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (96, 2, 33, '', true, '2025-12-16 12:09:38.568574', '2025-12-16 12:09:38.568574');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (97, 2, 11, '', true, '2025-12-16 12:10:01.017155', '2025-12-16 12:10:01.017155');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (85, 3, 6, 'https://github.com/akowalczyk/PO_Labs/pull/13', true,
        '2023-12-09 10:07:39.426809', '2025-12-16 12:10:29.178542');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (83, 3, 4, 'https://github.com/alewandowska/PO_Labs/pull/13', true,
        '2023-12-11 10:23:52.581953', '2025-12-16 12:10:47.996668');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (87, 3, 8, 'https://github.com/jszymański/PO_Labs/pull/13', true,
        '2023-12-16 18:22:37.513325', '2025-12-16 12:10:52.86138');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (84, 3, 5, 'https://github.com/jjankowska/PO_Labs/pull/13', true,
        '2023-12-06 23:06:10.793309', '2025-12-16 12:10:56.072546');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (80, 3, 1, 'https://github.com/mwójcik/PO_Labs/pull/13', true, '2023-12-20 21:28:31.038839',
        '2025-12-16 12:10:59.109968');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (82, 3, 3, 'https://github.com/pdąbrowski/PO_Labs/pull/13', true,
        '2023-12-04 14:53:48.788127', '2025-12-16 12:11:03.145106');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (81, 3, 2, 'https://github.com/pkamiński/PO_Labs/pull/13', true, '2023-12-20 05:37:58.92832',
        '2025-12-16 12:11:06.388025');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (86, 3, 7, 'https://github.com/tjankowski/PO_Labs/pull/13', true,
        '2023-12-18 20:30:50.079869', '2025-12-16 12:11:10.218106');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (94, 3, 30, 'https://github.com/knowak/PO_Labs/pull/13', true, '2023-12-08 12:02:25.186183',
        '2025-12-16 12:11:34.068913');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (91, 3, 34, 'https://github.com/kwójcik/PO_Labs/pull/13', true, '2023-12-08 01:21:22.000708',
        '2025-12-16 12:11:41.466953');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (95, 3, 32, 'https://github.com/mnowak/PO_Labs/pull/13', true, '2023-12-06 15:46:51.036897',
        '2025-12-16 12:11:49.833934');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (90, 3, 36, 'https://github.com/mwiśniewska/PO_Labs/pull/13', true,
        '2023-12-19 05:34:37.661087', '2025-12-16 12:11:54.276393');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (88, 3, 28, 'https://github.com/pzieliński/PO_Labs/pull/13', true,
        '2023-12-14 08:12:32.628631', '2025-12-16 12:12:00.522815');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (93, 3, 38, 'https://github.com/pkozłowski/PO_Labs/pull/13', true,
        '2023-12-17 19:28:30.572161', '2025-12-16 12:12:05.008598');
INSERT INTO public.submissions (id, submission_requirement_id, animal_id, url, is_locked,
                                created_date, modified_date)
VALUES (89, 3, 33, 'https://github.com/plewandowski/PO_Labs/pull/13', true,
        '2023-12-19 15:59:43.643229', '2025-12-16 12:12:09.617548');

INSERT INTO public.test_sections (id)
VALUES (2);

INSERT INTO public.tests (id)
VALUES (2);
INSERT INTO public.tests (id)
VALUES (3);
INSERT INTO public.tests (id)
VALUES (4);
INSERT INTO public.tests (id)
VALUES (5);
INSERT INTO public.tests (id)
VALUES (6);
INSERT INTO public.tests (id)
VALUES (7);
INSERT INTO public.tests (id)
VALUES (8);
INSERT INTO public.tests (id)
VALUES (9);
INSERT INTO public.tests (id)
VALUES (10);
INSERT INTO public.tests (id)
VALUES (11);

INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('COORDINATOR', 1, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('INSTRUCTOR', 2, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('INSTRUCTOR', 3, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 4, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 5, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 6, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 7, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 8, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 9, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 10, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 11, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 12, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 13, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 14, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 15, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 16, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 17, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 18, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 19, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 20, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 21, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 22, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 23, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 24, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 25, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 26, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 27, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 28, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 29, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 30, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 31, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 32, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 33, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 34, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 35, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 36, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 37, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 38, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 39, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 40, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 41, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 42, 1);
INSERT INTO public.user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 43, 1);

SELECT setval('animals_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM animals;

SELECT setval('assigned_rewards_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM assigned_rewards;

SELECT setval('course_groups_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM course_groups;

SELECT setval('courses_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM courses;

SELECT setval('criteria_grades_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM criteria_grades;

SELECT setval('criteria_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM criteria;

SELECT setval('event_sections_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM event_sections;

SELECT setval('evolution_stages_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM evolution_stages;

SELECT setval('gradable_events_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM gradable_events;

SELECT setval('grades_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM grades;

SELECT setval('project_groups_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM project_groups;

SELECT setval('project_variants_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM project_variants;

SELECT setval('project_variant_categories_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM project_variant_categories;

SELECT setval('rewards_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM rewards;

SELECT setval('submission_requirements_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM submission_requirements;

SELECT setval('submissions_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM submissions;

SELECT setval('users_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM users;

COMMIT;