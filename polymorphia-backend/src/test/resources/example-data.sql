BEGIN;
TRUNCATE TABLE users cascade;
TRUNCATE TABLE chests_items cascade;
TRUNCATE TABLE courses cascade;
TRUNCATE TABLE coordinators cascade;
TRUNCATE TABLE students cascade;
TRUNCATE TABLE instructors cascade;
TRUNCATE TABLE user_course_roles cascade;
TRUNCATE TABLE course_groups cascade;
TRUNCATE TABLE chests cascade;
TRUNCATE TABLE animals cascade;
TRUNCATE TABLE students_course_groups cascade;
TRUNCATE TABLE evolution_stages cascade;
TRUNCATE TABLE event_sections cascade;
TRUNCATE TABLE test_sections cascade;
TRUNCATE table assignment_sections cascade;
TRUNCATE table project_sections cascade;
TRUNCATE table projects cascade;
TRUNCATE table project_variants cascade;
TRUNCATE table project_variant_categories cascade;
TRUNCATE table project_groups cascade;
TRUNCATE TABLE rewards cascade;
TRUNCATE TABLE items cascade;
TRUNCATE TABLE flat_bonus_items cascade;
TRUNCATE TABLE percentage_bonus_items cascade;
TRUNCATE TABLE assigned_chests cascade;
TRUNCATE TABLE assigned_items cascade;
TRUNCATE TABLE assigned_rewards cascade;
TRUNCATE TABLE grades cascade;
TRUNCATE TABLE criteria_grades cascade;
TRUNCATE TABLE gradable_events cascade;
TRUNCATE TABLE criteria cascade;
TRUNCATE TABLE criteria_rewards cascade;
TRUNCATE TABLE user_course_roles cascade;
TRUNCATE TABLE project_groups cascade;
TRUNCATE TABLE project_groups_animals cascade;
TRUNCATE TABLE submission_requirements cascade;
TRUNCATE TABLE submissions cascade;
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (1, 'Jan', 'Kowalski', 'jk@gmail.com', '$2a$10$cEcxQ77CzxCh.tNVQH.1r.PXgag9XZj2/glpX2DrnSVdNR3eeZ0yC', NULL);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (4, 'Gall', 'Anonim', 'thismail@doesnot.exist', '$2a$10$1XxOuzwCaQjasNLI.uvCKu6FkNtKYBtnOGzLq73RjBKNpezUil3tK', NULL);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (5, 'Michał', 'Idzik', 'michal.idzik@test.com', '$2a$10$ARcCwjJnygHJw/3hDe2BZO/FHvPXBI.CSs.sjjRW16zkc6oH3TzrC', NULL);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (2, 'admin', 'admin', 'admin@admin.com', '$2a$10$8RfsPIB.mYhx2Qc4HhJKseGDlRJlfgyFktkKWWxCrU6xh5bIvf0Ji', NULL);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (3, 'Kamil', 'Ślimak', 'kamil@snail.com', '$2a$10$V01hVaU8SX30lb083e1UYeH79PkKJg1HC71/WUM1YsUmFHVOKh85e', NULL);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (7, 'Sample', 'User', 'sampleuser@test.com', '$2y$10$PnLQWAxCL4VYV6PCkYADeO6EF448OySkzLriI4/SDRShZZBXrvZTm', NULL);
INSERT INTO
  instructors (user_id)
VALUES
  (4), (5);
INSERT INTO
  users (id, first_name, last_name, email, password, preferred_course_id)
VALUES
  (8, 'Jan', 'Kowalski', 'jan.kowalski1@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (9, 'Anna', 'Nowak', 'anna.nowak2@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (10, 'Piotr', 'Wiśniewski', 'piotr.wisniewski3@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (11, 'Maria', 'Wójcik', 'maria.wojcik4@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (12, 'Krzysztof', 'Kamiński', 'krzysztof.kaminski5@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (13, 'Katarzyna', 'Lewandowska', 'katarzyna.lewandowska6@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (14, 'Tomasz', 'Zieliński', 'tomasz.zielinski7@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (15, 'Małgorzata', 'Szymańska', 'malgorzata.szymanska8@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (16, 'Andrzej', 'Woźniak', 'andrzej.wozniak9@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (17, 'Agnieszka', 'Dąbrowska', 'agnieszka.dabrowska10@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (18, 'Marcin', 'Kozłowski', 'marcin.kozlowski11@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (19, 'Joanna', 'Jankowska', 'joanna.jankowska12@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (20, 'Paweł', 'Mazur', 'pawel.mazur13@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (21, 'Ewa', 'Krawczyk', 'ewa.krawczyk14@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (22, 'Michał', 'Piotrowski', 'michal.piotrowski15@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (23, 'Magdalena', 'Grabowska', 'magdalena.grabowska16@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (24, 'Jakub', 'Pawłowski', 'jakub.pawlowski17@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (25, 'Barbara', 'Michalska', 'barbara.michalska18@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (26, 'Łukasz', 'Król', 'lukasz.krol19@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (27, 'Monika', 'Wieczorek', 'monika.wieczorek20@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (28, 'Grzegorz', 'Jabłoński', 'grzegorz.jablonski21@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (29, 'Aleksandra', 'Nowakowska', 'aleksandra.nowakowska22@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (30, 'Robert', 'Majewski', 'robert.majewski23@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (31, 'Dorota', 'Olszewska', 'dorota.olszewska24@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (32, 'Rafał', 'Stępień', 'rafal.stepien25@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (33, 'Justyna', 'Jaworska', 'justyna.jaworska26@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (34, 'Dariusz', 'Adamczyk', 'dariusz.adamczyk27@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (35, 'Iwona', 'Dudek', 'iwona.dudek28@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (36, 'Mariusz', 'Górski', 'mariusz.gorski29@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (37, 'Renata', 'Witkowska', 'renata.witkowska30@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (38, 'Zbigniew', 'Walczak', 'zbigniew.walczak31@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (39, 'Beata', 'Rutkowska', 'beata.rutkowska32@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (40, 'Wojciech', 'Sikora', 'wojciech.sikora33@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (41, 'Elżbieta', 'Baran', 'elzbieta.baran34@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (42, 'Marek', 'Duda', 'marek.duda35@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (43, 'Halina', 'Kołodziej', 'halina.kolodziej36@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (44, 'Adam', 'Czarnecki', 'adam.czarnecki37@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (45, 'Zofia', 'Tomaszewska', 'zofia.tomaszewska38@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (46, 'Stanisław', 'Sobczak', 'stanislaw.sobczak39@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (47, 'Grażyna', 'Czerwińska', 'grazyna.czerwinska40@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (48, 'Jerzy', 'Sawicki', 'jerzy.sawicki41@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (49, 'Danuta', 'Borkowska', 'danuta.borkowska42@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (50, 'Tadeusz', 'Sokołowski', 'tadeusz.sokolowski43@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (51, 'Teresa', 'Urbańska', 'teresa.urbanska44@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (52, 'Henryk', 'Laskowski', 'henryk.laskowski45@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (53, 'Jadwiga', 'Zakrzewska', 'jadwiga.zakrzewska46@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (54, 'Ryszard', 'Włodarczyk', 'ryszard.wlodarczyk47@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (55, 'Krystyna', 'Maciejewska', 'krystyna.maciejewska48@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (56, 'Kazimierz', 'Chmielewski', 'kazimierz.chmielewski49@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (57, 'Mirosława', 'Kowalczyk', 'miroslawa.kowalczyk50@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (58, 'Wiesław', 'Szczepański', 'wieslaw.szczepanski51@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (59, 'Bożena', 'Sadowska', 'bozena.sadowska52@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (60, 'Leszek', 'Wilk', 'leszek.wilk53@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (61, 'Urszula', 'Szewczyk', 'urszula.szewczyk54@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (62, 'Zdzisław', 'Głowacki', 'zdzislaw.glowacki55@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (63, 'Janina', 'Lis', 'janina.lis56@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (64, 'Bogdan', 'Wysocki', 'bogdan.wysocki57@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (65, 'Irena', 'Baranowska', 'irena.baranowska58@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (66, 'Eugeniusz', 'Adamski', 'eugeniusz.adamski59@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (67, 'Wanda', 'Marciniak', 'wanda.marciniak60@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (68, 'Bogusław', 'Kubiak', 'boguslaw.kubiak61@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (69, 'Jolanta', 'Pietrzak', 'jolanta.pietrzak62@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (70, 'Sławomir', 'Zając', 'slawomir.zajac63@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (71, 'Lidia', 'Kaczmarek', 'lidia.kaczmarek64@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (72, 'Jarosław', 'Zalewski', 'jaroslaw.zalewski65@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (73, 'Marzena', 'Pawlak', 'marzena.pawlak66@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (74, 'Artur', 'Michalak', 'artur.michalak67@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (75, 'Sylwia', 'Król', 'sylwia.krol68@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (76, 'Sebastian', 'Wróbel', 'sebastian.wrobel69@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (77, 'Aneta', 'Błaszczyk', 'aneta.blaszczyk70@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (78, 'Radosław', 'Kucharski', 'radoslaw.kucharski71@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (79, 'Kamila', 'Mazurek', 'kamila.mazurek72@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (80, 'Przemysław', 'Wyszyński', 'przemyslaw.wyszynski73@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (81, 'Edyta', 'Ostrowski', 'edyta.ostrowski74@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (82, 'Damian', 'Adamczyk', 'damian.adamczyk75@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (83, 'Iwona', 'Czerwińska', 'iwona.czerwinska76@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (84, 'Filip', 'Jasiński', 'filip.jasinski77@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (85, 'Natalia', 'Kalinowski', 'natalia.kalinowski78@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (86, 'Mateusz', 'Urbański', 'mateusz.urbanski79@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (87, 'Paulina', 'Borowski', 'paulina.borowski80@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (88, 'Dawid', 'Kasprzak', 'dawid.kasprzak81@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (89, 'Patrycja', 'Laskowska', 'patrycja.laskowska82@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (90, 'Bartosz', 'Mazurek', 'bartosz.mazurek83@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (91, 'Weronika', 'Szymczak', 'weronika.szymczak84@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (92, 'Karol', 'Krawczyk', 'karol.krawczyk85@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (93, 'Julia', 'Rutkowski', 'julia.rutkowski86@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (94, 'Kacper', 'Baranowski', 'kacper.baranowski87@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (95, 'Martyna', 'Stefański', 'martyna.stefanski88@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (96, 'Adrian', 'Sikora', 'adrian.sikora89@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (97, 'Oliwia', 'Witkowski', 'oliwia.witkowski90@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (98, 'Dominik', 'Głowacki', 'dominik.glowacki91@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (99, 'Nikola', 'Marciniak', 'nikola.marciniak92@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (100, 'Oskar', 'Zakrzewski', 'oskar.zakrzewski93@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (101, 'Amelia', 'Czarnecki', 'amelia.czarnecki94@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (102, 'Szymon', 'Sobczak', 'szymon.sobczak95@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (103, 'Maja', 'Lis', 'maja.lis96@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (104, 'Igor', 'Dudek', 'igor.dudek97@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (105, 'Zuzanna', 'Walczak', 'zuzanna.walczak98@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (106, 'Nikodem', 'Baran', 'nikodem.baran99@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL),
  (107, 'Lena', 'Maciejewski', 'lena.maciejewski100@example.com', '$2a$12$e/0L6Ob8F5bQK/P4d8lmCuqp6OqPTC4OdOxUPPB6TRhlZcd1fehLy', NULL);
INSERT INTO
  students (user_id, index_number)
VALUES
  (3, 123654);
INSERT INTO
  students (user_id, index_number)
VALUES
  (7, 1233333);
INSERT INTO
  students (user_id, index_number)
VALUES
  (8, 100001),
  (9, 100002),
  (10, 100003),
  (11, 100004),
  (12, 100005),
  (13, 100006),
  (14, 100007),
  (15, 100008),
  (16, 100009),
  (17, 100010),
  (18, 100011),
  (19, 100012),
  (20, 100013),
  (21, 100014),
  (22, 100015),
  (23, 100016),
  (24, 100017),
  (25, 100018),
  (26, 100019),
  (27, 100020),
  (28, 100021),
  (29, 100022),
  (30, 100023),
  (31, 100024),
  (32, 100025),
  (33, 100026),
  (34, 100027),
  (35, 100028),
  (36, 100029),
  (37, 100030),
  (38, 100031),
  (39, 100032),
  (40, 100033),
  (41, 100034),
  (42, 100035),
  (43, 100036),
  (44, 100037),
  (45, 100038),
  (46, 100039),
  (47, 100040),
  (48, 100041),
  (49, 100042),
  (50, 100043),
  (51, 100044),
  (52, 100045),
  (53, 100046),
  (54, 100047),
  (55, 100048),
  (56, 100049),
  (57, 100050),
  (58, 100051),
  (59, 100052),
  (60, 100053),
  (61, 100054),
  (62, 100055),
  (63, 100056),
  (64, 100057),
  (65, 100058),
  (66, 100059),
  (67, 100060),
  (68, 100061),
  (69, 100062),
  (70, 100063),
  (71, 100064),
  (72, 100065),
  (73, 100066),
  (74, 100067),
  (75, 100068),
  (76, 100069),
  (77, 100070),
  (78, 100071),
  (79, 100072),
  (80, 100073),
  (81, 100074),
  (82, 100075),
  (83, 100076),
  (84, 100077),
  (85, 100078),
  (86, 100079),
  (87, 100080),
  (88, 100081),
  (89, 100082),
  (90, 100083),
  (91, 100084),
  (92, 100085),
  (93, 100086),
  (94, 100087),
  (95, 100088),
  (96, 100089),
  (97, 100090),
  (98, 100091),
  (99, 100092),
  (100, 100093),
  (101, 100094),
  (102, 100095),
  (103, 100096),
  (104, 100097),
  (105, 100098),
  (106, 100099),
  (107, 100100);
INSERT INTO
  coordinators (user_id)
VALUES
  (1);
INSERT INTO
  coordinators (user_id)
VALUES
  (2);
INSERT INTO
  coordinators (user_id)
VALUES
  (5);
INSERT INTO
  courses (id, name, markdown_source_url, coordinator_id, coordinator_image_url, image_url, instructor_image_url)
VALUES
  (2, 'Programowanie Obiektowe 2023/24', 'https://github.com/Soamid/obiektowe-lab', 5, 'images/evolution-stages/4.webp', 'images/evolution-stages/3.webp', 'images/evolution-stages/1.webp');
INSERT INTO
  courses (id, name, markdown_source_url, coordinator_id, coordinator_image_url, image_url, instructor_image_url)
VALUES
  (1, 'Programowanie obiektowe 2024/25', 'google.com', 5, 'images/evolution-stages/7.webp', 'images/evolution-stages/1.webp', 'images/evolution-stages/7.webp');
INSERT INTO
  course_groups (id, name, course_id, instructor_id)
VALUES
  (1, 'sp-pn-1315', 1, 4);
INSERT INTO
  course_groups (id, name, course_id, instructor_id)
VALUES
  (2, 'mi-13-00', 2, 4);
INSERT INTO
  course_groups (id, name, course_id, instructor_id)
VALUES
  (3, 'SP-pn-1500', 1, 4),
  (4, 'mi-wt-1145', 1, 4);
INSERT INTO
  user_course_roles (role, user_id, course_id)
VALUES
  ('STUDENT', 3, 1);
INSERT INTO
  user_course_roles (role, user_id, course_id)
VALUES
  ('STUDENT', 7, 1);
INSERT INTO
  user_course_roles (role, user_id, course_id)
VALUES
  ('COORDINATOR', 5, 1);
INSERT INTO
  user_course_roles (role, user_id, course_id)
VALUES ('STUDENT', 7, 2),
       ('STUDENT', 21, 1);
INSERT INTO
  user_course_roles (role, user_id, course_id)
VALUES
  ('INSTRUCTOR', 4, 1),
  ('INSTRUCTOR', 4, 2);
INSERT INTO
  animals (id, name)
VALUES
  (5, 'Surykatka'),
  (6, 'Jeż'),
  (7, 'Chomik'),
  (8, 'Kret'),
  (9, 'Wydra'),
  (10, 'Bóbr'),
  (11, 'Wiewiórka'),
  (12, 'Nietoperz'),
  (13, 'Szop'),
  (14, 'Lis'),
  (15, 'Borsuk'),
  (16, 'Łoś'),
  (17, 'Sarna'),
  (18, 'Dzik'),
  (19, 'Jenot'),
  (20, 'Zając'),
  (21, 'Królik'),
  (22, 'Norka'),
  (23, 'Tchórz'),
  (24, 'Gronostaj'),
  (25, 'Łasica'),
  (26, 'Kuna'),
  (27, 'Ryś'),
  (28, 'Wilk'),
  (29, 'Niedźwiadek'),
  (30, 'Panda'),
  (31, 'Żubr'),
  (32, 'Alpaka'),
  (33, 'Lama'),
  (34, 'Koala'),
  (35, 'Kangur'),
  (36, 'Opos'),
  (37, 'Foka'),
  (38, 'Mors'),
  (39, 'Manul'),
  (40, 'Fennek'),
  (41, 'Karakal'),
  (42, 'Serwał'),
  (43, 'Pancernik'),
  (44, 'Leniwiec'),
  (45, 'Mrówkojad'),
  (46, 'Tapir'),
  (47, 'Kapibara'),
  (48, 'Świnka'),
  (49, 'Szynszyla'),
  (50, 'Aguti'),
  (51, 'Lemur'),
  (52, 'Loris'),
  (53, 'Wombat'),
  (54, 'Numbat'),
  (55, 'Kuskus'),
  (56, 'Waran'),
  (57, 'Legwan'),
  (58, 'Gekon'),
  (59, 'Kameleon'),
  (60, 'Żółwik'),
  (61, 'Agama'),
  (62, 'Salamandra'),
  (63, 'Traszka'),
  (64, 'Ropucha'),
  (65, 'Kumak'),
  (66, 'Żabka'),
  (67, 'Rzekotka'),
  (68, 'Aksolotl'),
  (69, 'Kaczka'),
  (70, 'Gęś'),
  (71, 'Łabędź'),
  (72, 'Pelikan'),
  (73, 'Flaming'),
  (74, 'Czapla'),
  (75, 'Bocian'),
  (76, 'Żuraw'),
  (77, 'Drop'),
  (78, 'Sowa'),
  (79, 'Puchacz'),
  (80, 'Sokół'),
  (81, 'Jastrząb'),
  (82, 'Orzeł'),
  (83, 'Myszołów'),
  (84, 'Kruk'),
  (85, 'Sroka'),
  (86, 'Wrona'),
  (87, 'Kawka'),
  (88, 'Sójka'),
  (89, 'Dzięcioł'),
  (90, 'Sikora'),
  (91, 'Wróbel'),
  (92, 'Jaskółka'),
  (93, 'Szpak'),
  (94, 'Kos'),
  (95, 'Rudzik'),
  (96, 'Słowik'),
  (97, 'Kowalik'),
  (98, 'Zimorodek'),
  (99, 'Dudek'),
  (100, 'Pingwin'),
  (101, 'Struś'),
  (102, 'Emu'),
  (103, 'Kazuar'),
  (104, 'Kiwi'),
  (1, 'Dzwiedziosow'),
  (2, 'Sowoniedźwiedź'),
  (4, 'Żółw');
INSERT INTO
  students_course_groups (student_id, course_group_id, animal_id)
VALUES
  (8, 3, 5),
  (9, 1, 6),
  (10, 4, 7),
  (11, 2, 8),
  (12, 3, 9),
  (13, 1, 10),
  (14, 4, 11),
  (15, 2, 12),
  (16, 3, 13),
  (17, 1, 14),
  (18, 4, 15),
  (19, 2, 16),
  (20, 3, 17),
  (21, 1, 18),
  (22, 4, 19),
  (23, 2, 20),
  (24, 3, 21),
  (25, 1, 22),
  (26, 4, 23),
  (27, 2, 24),
  (28, 3, 25),
  (29, 1, 26),
  (30, 4, 27),
  (31, 2, 28),
  (32, 3, 29),
  (33, 1, 30),
  (34, 4, 31),
  (35, 2, 32),
  (36, 3, 33),
  (37, 1, 34),
  (38, 4, 35),
  (39, 2, 36),
  (40, 3, 37),
  (41, 1, 38),
  (42, 4, 39),
  (43, 2, 40),
  (44, 3, 41),
  (45, 1, 42),
  (46, 4, 43),
  (47, 2, 44),
  (48, 3, 45),
  (49, 1, 46),
  (50, 4, 47),
  (51, 2, 48),
  (52, 3, 49),
  (53, 1, 50),
  (54, 4, 51),
  (55, 2, 52),
  (56, 3, 53),
  (57, 1, 54),
  (58, 4, 55),
  (59, 2, 56),
  (60, 3, 57),
  (61, 1, 58),
  (62, 4, 59),
  (63, 2, 60),
  (64, 3, 61),
  (65, 1, 62),
  (66, 4, 63),
  (67, 2, 64),
  (68, 3, 65),
  (69, 1, 66),
  (70, 4, 67),
  (71, 2, 68),
  (72, 3, 69),
  (73, 1, 70),
  (74, 4, 71),
  (75, 2, 72),
  (76, 3, 73),
  (77, 1, 74),
  (78, 4, 75),
  (79, 2, 76),
  (80, 3, 77),
  (81, 1, 78),
  (82, 4, 79),
  (83, 2, 80),
  (84, 3, 81),
  (85, 1, 82),
  (86, 4, 83),
  (87, 2, 84),
  (88, 3, 85),
  (89, 1, 86),
  (90, 4, 87),
  (91, 2, 88),
  (92, 3, 89),
  (93, 1, 90),
  (94, 4, 91),
  (95, 2, 92),
  (96, 3, 93),
  (97, 1, 94),
  (98, 4, 95),
  (99, 2, 96),
  (100, 3, 97),
  (101, 1, 98),
  (102, 4, 99),
  (103, 2, 100),
  (104, 3, 101),
  (105, 1, 102),
  (106, 4, 103),
  (107, 2, 104),
  (3, 1, 1),
  (7, 2, 4),
  (7, 1, 2);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES (4, 'Git', FALSE, FALSE, 1, 0, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (6, 'Laboratorium', TRUE, FALSE, 2, 2, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (7, 'Projekt 1', TRUE, FALSE, 2, 4, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (8, 'Kartkówka', TRUE, FALSE, 2, 1, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES (9, 'Git', FALSE, FALSE, 2, 0, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (10, 'Specjalny lab', TRUE, FALSE, 2, 3, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (2, 'Laboratorium', TRUE, FALSE, 1, 2, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (3, 'Projekt 1', TRUE, FALSE, 1, 4, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (1, 'Kartkówka', TRUE, FALSE, 1, 1, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (5, 'Specjalny lab', TRUE, FALSE, 1, 3, FALSE);
INSERT INTO
  event_sections (id, name, is_shown_in_road_map, has_gradable_events_with_topics, course_id, order_index, is_hidden)
VALUES
  (11, 'Projekt 2', TRUE, FALSE, 1, 5, FALSE),
  (12, 'Projekt 2', TRUE, FALSE, 2, 5, FALSE);
INSERT INTO
  test_sections (id)
VALUES
  (1),
  (8);
INSERT INTO
  project_sections (id)
VALUES
  (3),
  (7),
  (10),
  (5),
  (11),
  (12);
INSERT INTO
  assignment_sections (id)
VALUES
  (2),
  (4),
  (6),
  (9);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (6, 'Nieopierzony Odkrywca', 'Nieopierzony Odkrywca z zapałem przemierza nieznane tereny Polymorphii. Mimo braku doświadczenia, jego ciekawość i odwaga nie znają granic. Czasem popełnia błędy, ale każdy z nich uczy go czegoś nowego. To podróżnik, który wierzy, że każde potknięcie przybliża go do celu. Pragnie zostać Samodzielnym Zwierzakiem, zdobywając mądrość przez przygody. Jego pióra, choć jeszcze niekompletne, nabierają kolorów odzwierciedlających przeżyte doświadczenia. W jego spojrzeniu widać determinację i głód wiedzy, który pcha go naprzód nawet wtedy, gdy droga staje się trudna. Nieopierzony Odkrywca buduje własną tożsamość, łącząc fragmenty zdobytej wiedzy w spójną całość.', 80.0, 5, 4.5, 'images/evolution-stages/5.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (2, 'Pisklak', 'Pisklak to młoda istota pełna energii, która stawia swoje pierwsze, niepewne kroki. Jego determinacja przewyższa jeszcze skromne umiejętności, ale nie brakuje mu zapału do nauki. To etap eksploracji i chłonięcia wiedzy od starszych. Każde wyzwanie traktuje jako lekcję, a entuzjazm sprawia, że śmiało patrzy w przyszłość Polymorphii. Z puchatymi piórkami i szeroko otwartymi oczami pochłania obrazy świata, budując własne rozumienie rzeczywistości. Jego nieustanna ciekawość i zdolność do szybkiej nauki sprawiają, że każdy dzień przynosi nowe odkrycia. W sercu Pisklaka rodzi się odwaga, która pewnego dnia pozwoli mu wznieść się wysoko.', 25.0, 1, 2.0, 'images/evolution-stages/1.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (1, 'Jajo', 'Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.', 0.0, 0, 2.0, 'images/evolution-stages/egg.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (8, 'Władca Polymorphii', 'Władca Polymorphii to najwyższa forma doskonałości i mocy, która osiągnęła szczyt swojej ewolucji. Jego obecność wzbudza podziw i respekt, a każdy jego krok niesie ze sobą siłę przemiany i niezmąconą pewność siebie. Władca zna wszystkie sekrety świata Polymorphii, potrafi kształtować rzeczywistość według własnej woli i przewodzi z mądrością, którą zdobył dzięki niezliczonym doświadczeniom. Jego spojrzenie przenika najgłębsze zakamarki istnienia, dostrzegając to, co niewidoczne dla innych. Pomimo ogromnej potęgi, Władca pozostaje pokorny i świadomy swojej odpowiedzialności wobec świata i jego mieszkańców. Jego pióra błyszczą jak koronny diadem, a aura, którą emanuje, inspiruje innych do dążenia do własnej przemiany i wzrostu. To mistrz równowagi, który łączy siłę z mądrością, a wolę z współczuciem, tworząc harmonię zarówno w sobie, jak i w całej Polymorphii.', 100.0, 7, 5.0, 'images/evolution-stages/7.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (7, 'Majestatyczna Bestia', 'Majestatyczna Bestia to istota o ogromnej sile i głębokiej mądrości. Zyskała szacunek dzięki odwadze i rozwadze, z jaką stawia czoła losowi. Jej potęga nie leży jedynie w mocy, lecz w zdolności rozumienia innych. To postać, która inspiruje, prowadzi i uczy. Każde jej działanie jest świadectwem drogi, jaką przebyła w Polymorphii. W jej oczach odbija się historia wielu pokoleń, a w głosie brzmi echo dawnych legend. Majestatyczna Bestia stoi na straży równowagi świata, wykorzystując swoją mądrość do rozwiązywania najbardziej złożonych problemów. Jej obecność przynosi spokój, a rada - jasność w chaosie. To ucieleśnienie potęgi płynącej z harmonii między siłą a dobrocią.', 90.0, 6, 5.0, 'images/evolution-stages/6.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (3, 'Podlot', 'Podlot to fascynujący etap przemiany, zawieszony między niewinnością młodości a rodzącą się dojrzałością. Opuszcza bezpieczne gniazdo, kierowany instynktem odkrywania rozległego świata Polymorphii, choć jego pierwsze loty naznaczone są jeszcze niepewnością i drobnymi potknięciami. Z ciekawością chłonie wiedzę i doświadczenia od starszych, uważnie obserwując ich mądrość i umiejętności, lecz jednocześnie zaczyna instynktownie poszukiwać własnej, unikalnej ścieżki. Każde nowe wyzwanie traktuje z mieszanką entuzjazmu i lekkiego strachu, a każda napotkana trudność staje się cenną lekcją, budując jego wewnętrzną siłę i odporność. W jego młodym sercu coraz mocniej pulsuje pragnienie samodzielności, a ciekawość świata pcha go do eksploracji nieznanych zakątków Polymorphii.', 50.0, 2, 3.0, 'images/evolution-stages/2.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (5, 'Samodzielny Zwierzak', 'Samodzielny Zwierzak to dojrzała postać, która wie, jak poruszać się po świecie Polymorphii. Jego decyzje są przemyślane, a działania odważne, lecz odpowiedzialne. Zdobyte doświadczenie pozwala mu lepiej rozumieć otoczenie i siebie. Choć wiele już osiągnął, nieustannie dąży do rozwoju, z pokorą i mądrością podejmując kolejne wyzwania. Jego pióra lśnią pełnią barw, odzwierciedlając bogactwo przeżyć i zdobytą wiedzę. Potrafi dostrzec subtelne połączenia między zjawiskami, co czyni go cennym towarzyszem i doradcą. Samodzielny Zwierzak znajduje równowagę między własnym dobrem a potrzebami społeczności, tworząc harmonię w swoim otoczeniu.', 70.0, 4, 4.0, 'images/evolution-stages/4.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (4, 'Żółtodziób', 'Żółtodziób to pełna entuzjazmu postać, która zaczyna rozumieć świat wokół siebie. Choć wciąż brakuje mu pewności i doświadczenia, chętnie podejmuje nowe wyzwania. Z otwartym umysłem i niegasnącą energią stara się rozwijać swoje zdolności. Każda sytuacja jest dla niego szansą, by stać się mądrzejszym i bardziej świadomym mieszkańcem Polymorphii. Jego charakterystyczny żółty dziób symbolizuje świeżość spojrzenia i gotowość do nauki. Popełnia błędy, ale szybko wyciąga z nich wnioski, co czyni go coraz bardziej odpornym na przeciwności losu. Żółtodziób balansuje między dziecięcą radością odkrywania a rodzącym się pragnieniem zrozumienia głębszych prawd świata.', 60.0, 3, 3.5, 'images/evolution-stages/3.webp', 1);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (9, 'Nieopierzony Odkrywca', 'Nieopierzony Odkrywca z zapałem przemierza nieznane tereny Polymorphii. Mimo braku doświadczenia, jego ciekawość i odwaga nie znają granic. Czasem popełnia błędy, ale każdy z nich uczy go czegoś nowego. To podróżnik, który wierzy, że każde potknięcie przybliża go do celu. Pragnie zostać Samodzielnym Zwierzakiem, zdobywając mądrość przez przygody. Jego pióra, choć jeszcze niekompletne, nabierają kolorów odzwierciedlających przeżyte doświadczenia. W jego spojrzeniu widać determinację i głód wiedzy, który pcha go naprzód nawet wtedy, gdy droga staje się trudna. Nieopierzony Odkrywca buduje własną tożsamość, łącząc fragmenty zdobytej wiedzy w spójną całość.', 80.0, 5, 4.5, 'images/evolution-stages/5.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (10, 'Pisklak', 'Pisklak to młoda istota pełna energii, która stawia swoje pierwsze, niepewne kroki. Jego determinacja przewyższa jeszcze skromne umiejętności, ale nie brakuje mu zapału do nauki. To etap eksploracji i chłonięcia wiedzy od starszych. Każde wyzwanie traktuje jako lekcję, a entuzjazm sprawia, że śmiało patrzy w przyszłość Polymorphii. Z puchatymi piórkami i szeroko otwartymi oczami pochłania obrazy świata, budując własne rozumienie rzeczywistości. Jego nieustanna ciekawość i zdolność do szybkiej nauki sprawiają, że każdy dzień przynosi nowe odkrycia. W sercu Pisklaka rodzi się odwaga, która pewnego dnia pozwoli mu wznieść się wysoko.', 25.0, 1, 2.0, 'images/evolution-stages/1.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (11, 'Jajo', 'Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.', 0.0, 0, 2.0, 'images/evolution-stages/egg.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (12, 'Władca Polymorphii', 'Władca Polymorphii to najwyższa forma doskonałości i mocy, która osiągnęła szczyt swojej ewolucji. Jego obecność wzbudza podziw i respekt, a każdy jego krok niesie ze sobą siłę przemiany i niezmąconą pewność siebie. Władca zna wszystkie sekrety świata Polymorphii, potrafi kształtować rzeczywistość według własnej woli i przewodzi z mądrością, którą zdobył dzięki niezliczonym doświadczeniom. Jego spojrzenie przenika najgłębsze zakamarki istnienia, dostrzegając to, co niewidoczne dla innych. Pomimo ogromnej potęgi, Władca pozostaje pokorny i świadomy swojej odpowiedzialności wobec świata i jego mieszkańców. Jego pióra błyszczą jak koronny diadem, a aura, którą emanuje, inspiruje innych do dążenia do własnej przemiany i wzrostu. To mistrz równowagi, który łączy siłę z mądrością, a wolę z współczuciem, tworząc harmonię zarówno w sobie, jak i w całej Polymorphii.', 100.0, 7, 5.0, 'images/evolution-stages/7.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (13, 'Majestatyczna Bestia', 'Majestatyczna Bestia to istota o ogromnej sile i głębokiej mądrości. Zyskała szacunek dzięki odwadze i rozwadze, z jaką stawia czoła losowi. Jej potęga nie leży jedynie w mocy, lecz w zdolności rozumienia innych. To postać, która inspiruje, prowadzi i uczy. Każde jej działanie jest świadectwem drogi, jaką przebyła w Polymorphii. W jej oczach odbija się historia wielu pokoleń, a w głosie brzmi echo dawnych legend. Majestatyczna Bestia stoi na straży równowagi świata, wykorzystując swoją mądrość do rozwiązywania najbardziej złożonych problemów. Jej obecność przynosi spokój, a rada - jasność w chaosie. To ucieleśnienie potęgi płynącej z harmonii między siłą a dobrocią.', 90.0, 6, 5.0, 'images/evolution-stages/6.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (14, 'Podlot', 'Podlot to fascynujący etap przemiany, zawieszony między niewinnością młodości a rodzącą się dojrzałością. Opuszcza bezpieczne gniazdo, kierowany instynktem odkrywania rozległego świata Polymorphii, choć jego pierwsze loty naznaczone są jeszcze niepewnością i drobnymi potknięciami. Z ciekawością chłonie wiedzę i doświadczenia od starszych, uważnie obserwując ich mądrość i umiejętności, lecz jednocześnie zaczyna instynktownie poszukiwać własnej, unikalnej ścieżki. Każde nowe wyzwanie traktuje z mieszanką entuzjazmu i lekkiego strachu, a każda napotkana trudność staje się cenną lekcją, budując jego wewnętrzną siłę i odporność. W jego młodym sercu coraz mocniej pulsuje pragnienie samodzielności, a ciekawość świata pcha go do eksploracji nieznanych zakątków Polymorphii.', 50.0, 2, 3.0, 'images/evolution-stages/2.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (15, 'Samodzielny Zwierzak', 'Samodzielny Zwierzak to dojrzała postać, która wie, jak poruszać się po świecie Polymorphii. Jego decyzje są przemyślane, a działania odważne, lecz odpowiedzialne. Zdobyte doświadczenie pozwala mu lepiej rozumieć otoczenie i siebie. Choć wiele już osiągnął, nieustannie dąży do rozwoju, z pokorą i mądrością podejmując kolejne wyzwania. Jego pióra lśnią pełnią barw, odzwierciedlając bogactwo przeżyć i zdobytą wiedzę. Potrafi dostrzec subtelne połączenia między zjawiskami, co czyni go cennym towarzyszem i doradcą. Samodzielny Zwierzak znajduje równowagę między własnym dobrem a potrzebami społeczności, tworząc harmonię w swoim otoczeniu.', 70.0, 4, 4.0, 'images/evolution-stages/4.webp', 2);
INSERT INTO
  evolution_stages (id, name, description, min_xp, order_index, grade, image_url, course_id)
VALUES
  (16, 'Żółtodziób', 'Żółtodziób to pełna entuzjazmu postać, która zaczyna rozumieć świat wokół siebie. Choć wciąż brakuje mu pewności i doświadczenia, chętnie podejmuje nowe wyzwania. Z otwartym umysłem i niegasnącą energią stara się rozwijać swoje zdolności. Każda sytuacja jest dla niego szansą, by stać się mądrzejszym i bardziej świadomym mieszkańcem Polymorphii. Jego charakterystyczny żółty dziób symbolizuje świeżość spojrzenia i gotowość do nauki. Popełnia błędy, ale szybko wyciąga z nich wnioski, co czyni go coraz bardziej odpornym na przeciwności losu. Żółtodziób balansuje między dziecięcą radością odkrywania a rodzącym się pragnieniem zrozumienia głębszych prawd świata.', 60.0, 3, 3.5, 'images/evolution-stages/3.webp', 2);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (1, 1, 'Kartkówka 1', NULL, 0, 0, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (2, 1, 'Kartkówka 2', NULL, 1, 1, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (3, 1, 'Kartkówka 3', NULL, 2, 2, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (4, 1, 'Kartkówka 4', NULL, 3, 3, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (5, 1, 'Kartkówka 5', NULL, 4, 4, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (6, 1, 'Kartkówka 6', NULL, 5, 5, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (7, 1, 'Kartkówka 7', NULL, 6, 6, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (8, 1, 'Kartkówka 8', NULL, 7, 7, NULL, NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (16, 2, 'Laboratorium 8', NULL, 15, 15, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab8/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (13, 2, 'Laboratorium 5', NULL, 12, 12, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab5/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (11, 2, 'Laboratorium 3', NULL, 10, 10, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab3/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (10, 2, 'Laboratorium 2', NULL, 9, 9, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab2/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (15, 2, 'Laboratorium 7', NULL, 14, 14, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab7/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (14, 2, 'Laboratorium 6', NULL, 13, 13, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab6/Readme.md', NULL, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (12, 2, 'Laboratorium 4', NULL, 11, 11, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab4/Readme.md', '', FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, topic, order_index, road_map_order_index, markdown_source_url, markdown, is_hidden, is_locked)
VALUES
  (9, 2, 'Laboratorium 1', NULL, 8, 8, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab1/Readme.md', '# Lab 1: Instrukcje sterujące w Javie

Celem laboratorium jest zapoznanie się z podstawowymi pojęciami oraz instrukcjami sterującymi w Javie.

Najważniejsze zadania:

1. Konfiguracja środowiska.
2. Stworzenie klasy `World` sterującej programem.
3. Stworze', FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, order_index, road_map_order_index, is_hidden, is_locked)
VALUES
  (17, 6, 'Kartkówka 1', 0, 0, FALSE, FALSE),
  (18, 6, 'Kartkówka 2', 1, 1, FALSE, FALSE),
  (19, 6, 'Kartkówka 3', 2, 2, FALSE, FALSE),
  (20, 6, 'Kartkówka 4', 3, 3, FALSE, FALSE),
  (21, 6, 'Kartkówka 5', 4, 4, FALSE, FALSE),
  (22, 6, 'Kartkówka 6', 5, 5, FALSE, FALSE),
  (23, 6, 'Kartkówka 7', 6, 6, FALSE, FALSE),
  (24, 6, 'Kartkówka 8', 7, 7, FALSE, FALSE);
INSERT INTO
  gradable_events (id, event_section_id, name, order_index, road_map_order_index, markdown_source_url, is_hidden, is_locked)
VALUES
  (25, 8, 'Laboratorium 1', 8, 8, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab1/Readme.md', FALSE, FALSE),
  (26, 8, 'Laboratorium 2', 9, 9, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab2/Readme.md', FALSE, FALSE),
  (27, 8, 'Laboratorium 3', 10, 10, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab3/Readme.md', FALSE, FALSE),
  (28, 8, 'Laboratorium 4', 11, 11, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab4/Readme.md', FALSE, FALSE),
  (29, 8, 'Laboratorium 5', 12, 12, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab5/Readme.md', FALSE, FALSE),
  (30, 8, 'Laboratorium 6', 13, 13, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab6/Readme.md', FALSE, FALSE),
  (31, 8, 'Laboratorium 7', 14, 14, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab7/Readme.md', FALSE, FALSE),
  (32, 8, 'Laboratorium 8', 15, 15, 'https://raw.githubusercontent.com/Soamid/obiektowe-lab/refs/heads/master/lab8/Readme.md', FALSE, FALSE),
  (33, 4, 'Git', 0, 0, NULL, FALSE, FALSE),
  (34, 11, 'Projekt 2a', 0, 0, null, true, true),
  (35, 10, 'Dziady', 0, 4, null, false, true),
  (36, 2, 'Laboratorium 9', 17, 17, null, false, true),
  (37, 2, 'Laboratorium 9', 18, 18, null, false, true),
  (38, 3, 'Projekt', 0, 19, 'https://github.com/Soamid/obiektowe-lab/tree/proj-2024/proj', false, false),
  (39, 3, 'Projekt 1', 16, 16, null, FALSE, FALSE),
  (40, 7, 'Projekt 1', 16, 16, null, FALSE, FALSE),
  (41, 11, 'Projekt 2', 17, 17, null, FALSE, FALSE),
  (42, 12, 'Projekt 2', 17, 17, null, FALSE, FALSE);

insert into projects(id, allow_cross_course_group_project_groups)
values (38, false);

insert into project_variant_categories(id, project_id, name)
values (1, 38, 'Mapa i roślinność'),
       (2, 38, 'Zwierzaki');

insert into project_groups(id, instructor_id, project_id)
values (1, 4, 39),
       (2, 4, 39),
       (3, 4, 40),
       (4, 4, 40),
       (5, 4, 41),
       (6, 4, 41),
       (7, 4, 42),
       (8, 4, 42),
       (9, 4, 38);

insert into project_variants(id, project_variant_category_id, name, short_code, description, image_url)
values (1, 1, 'Bieguny', 'A', 'bieguny zdefiniowane są na dolnej i ' ||
                              'górnej krawędzi mapy. Im bliżej bieguna znajduje się zwierzę, ' ||
                              'tym większą energię traci podczas pojedynczego ruchu (na biegunach jest zimno)',
        'images/evolution-stages/5.webp'),
       (2, 1, 'Pożary', 'B',
        'co jakąś (zadaną w konfiguracji) liczbę tur na mapie pojawia się pożar. Pożar zaczyna się na jednym polu z rośliną i w każdej turze rozprzestrzenia się na wszystkie przylegające do niej rośliny (ale nie po skosie). Pożar na każdym polu trwa stałą zadaną (konfigurowalną) liczbę tur i po jego zakończeniu roślina na tym polu znika. Jeśli zwierzak wejdzie na pole z ogniem, umiera.',
        'images/evolution-stages/5.webp'),
       (3, 2, 'Lekka korekta', '1',
        'mutacja zmienia gen o 1 w górę lub w dół (np. gen 3 może zostać zamieniony na 2 lub 4, a gen 0 na 1 lub 7)',
        'images/evolution-stages/6.webp'),
       (4, 2, 'Podmianka', '2', 'mutacja może też skutkować tym, że dwa geny zamienią się miejscami',
        'images/evolution-stages/4.webp');

insert into project_groups_animals(animal_id, project_group_id)
values (2, 9),
       (10, 9),
       (14, 9);

INSERT INTO project_groups_animals (project_group_id, animal_id)
VALUES (1, 1),
       (1, 6),
       (2, 10),
       (2, 14),
       (2, 17),
       (3, 4),
       (3, 8),
       (4, 11),
       (4, 15),
       (4, 16),
       (5, 18),
       (5, 21),
       (6, 22),
       (6, 24),
       (6, 25),
       (7, 20),
       (7, 23),
       (8, 26),
       (8, 27),
       (8, 28);

insert into project_groups_project_variants(project_group_id, project_variant_id)
values (9, 1),
       (9, 3);


INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (101, 'Srebrna Skrzynia', 'Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.', 'images/chests/s1.webp', 0, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (1, 'Pietruszka', 'Pietruszka to dusza radosna i wszechstronna. Jej świeżość wprowadza lekkość, a obecność - mimo niewielkich rozmiarów - potrafi odmienić całe otoczenie. W Polymorphii uczy, że nawet najmniejsze działania mogą mieć wielką moc. Z otwartym sercem chłonie nowe doświadczenia, a jej naturalna ciekawość i elastyczność pozwalają jej odnaleźć się w każdej sytuacji. Pietruszka delikatnie odnawia siły witalne, regenerując energię potrzebną do dalszej drogi. Jej działanie to przypomnienie, że odnowa przychodzi często z najmniej spodziewanych miejsc.', 'images/items/parsley.webp', 0, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (2, 'Marchewka', 'Marchewka to symbol ukrytej siły i cierpliwości. Choć na powierzchni wygląda skromnie, w głębi kryje soczystą energię i bogactwo doświadczeń. W Polymorphii reprezentuje wytrwałość i rozwój – potrzebuje czasu, by osiągnąć pełnię swojego potencjału. Każdy dzień spędzony na zgłębianiu świata czyni ją silniejszą i bardziej świadomą swoich możliwości. Marchewka przywraca zmęczonym duszom utracone doświadczenie, pozwalając im szybciej powrócić na ścieżkę nauki. To dar dla tych, którzy nie boją się uczyć na własnych błędach i iść naprzód', 'images/items/carrot.webp', 1, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (102, 'Złota Skrzynia', 'Złota Skrzynia symbolizuje szczyt wartości i nieokiełznany przepych. Jej olśniewający blask wprost zdradza, jakie skarby kryją się w środku. Posiada moc, której jej srebrna siostra może tylko pozazdrościć, a jej wnętrze wypełnia czyste, bezkompromisowe bogactwo i splendor. Otwarcie Złotej Skrzyni to brama do świata absolutnego luksusu, ostateczna nagroda zarezerwowana dla tych, którzy mają śmiałość sięgnąć po największe bogactwa w swoich poszukiwaniach.', 'images/chests/s2.webp', 1, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (3, 'Apteczka', 'Apteczka to symbol gotowości i szybkiej regeneracji. Choć często wygląda niepozornie, kryje w sobie narzędzia niezbędne do leczenia ran i przywracania sił witalnych. W Polymorphii reprezentuje zdolność do powrotu do formy i kontynuowania walki – pozwala przetrwać kryzysowe momenty. Użycie jej w potrzebie pozwala błyskawicznie odzyskać zdrowie i gotowość do działania. To dar dla tych, którzy cenią przezorność i potrafią zadbać o siebie lub swoich towarzyszy, nie pozwalając, by odnieśli trwałe rany.', 'images/items/aid.webp', 2, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (103, 'Srebrna Skrzynia', 'Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.', 'images/chests/s1.webp', 0, 1);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (4, 'Pietruszka', 'Pietruszka to dusza radosna i wszechstronna. Jej świeżość wprowadza lekkość, a obecność - mimo niewielkich rozmiarów - potrafi odmienić całe otoczenie. W Polymorphii uczy, że nawet najmniejsze działania mogą mieć wielką moc. Z otwartym sercem chłonie nowe doświadczenia, a jej naturalna ciekawość i elastyczność pozwalają jej odnaleźć się w każdej sytuacji. Pietruszka delikatnie odnawia siły witalne, regenerując energię potrzebną do dalszej drogi. Jej działanie to przypomnienie, że odnowa przychodzi często z najmniej spodziewanych miejsc.', 'images/items/parsley.webp', 0, 2);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (5, 'Marchewka', 'Marchewka to symbol ukrytej siły i cierpliwości. Choć na powierzchni wygląda skromnie, w głębi kryje soczystą energię i bogactwo doświadczeń. W Polymorphii reprezentuje wytrwałość i rozwój – potrzebuje czasu, by osiągnąć pełnię swojego potencjału. Każdy dzień spędzony na zgłębianiu świata czyni ją silniejszą i bardziej świadomą swoich możliwości. Marchewka przywraca zmęczonym duszom utracone doświadczenie, pozwalając im szybciej powrócić na ścieżkę nauki. To dar dla tych, którzy nie boją się uczyć na własnych błędach i iść naprzód', 'images/items/carrot.webp', 1, 2);
INSERT INTO
  rewards (id, name, description, image_url, order_index, course_id)
VALUES
  (104, 'Złota Skrzynia', 'Złota Skrzynia symbolizuje szczyt wartości i nieokiełznany przepych. Jej olśniewający blask wprost zdradza, jakie skarby kryją się w środku. Posiada moc, której jej srebrna siostra może tylko pozazdrościć, a jej wnętrze wypełnia czyste, bezkompromisowe bogactwo i splendor. Otwarcie Złotej Skrzyni to brama do świata absolutnego luksusu, ostateczna nagroda zarezerwowana dla tych, którzy mają śmiałość sięgnąć po największe bogactwa w swoich poszukiwaniach.', 'images/chests/s2.webp', 1, 2);
INSERT INTO
  items (reward_id, "limit", event_section_id)
VALUES
  (3, 2, 3);
INSERT INTO
  items (reward_id, "limit", event_section_id)
VALUES
  (2, 1, 2);
INSERT INTO
  items (reward_id, "limit", event_section_id)
VALUES
  (1, 1, 1);
INSERT INTO
  items (reward_id, "limit", event_section_id)
VALUES
  (4, 5, 8);
INSERT INTO
  items (reward_id, "limit", event_section_id)
VALUES
  (5, 5, 7);
INSERT INTO
  flat_bonus_items (item_id, xp_bonus, behavior)
VALUES
  (2, 5.0, 'ONE_EVENT');
INSERT INTO
  flat_bonus_items (item_id, xp_bonus, behavior)
VALUES
  (3, 4.0, 'MULTIPLE_EVENTS');
INSERT INTO
  flat_bonus_items (item_id, xp_bonus, behavior)
VALUES
  (4, 5.0, 'ONE_EVENT');
INSERT INTO
  percentage_bonus_items (item_id, percentage_bonus)
VALUES
  (1, 5);
INSERT INTO
  percentage_bonus_items (item_id, percentage_bonus)
VALUES
  (5, 10);
INSERT INTO
  chests (reward_id, behavior)
VALUES
  (101, 'ALL');
INSERT INTO
  chests (reward_id, behavior)
VALUES
  (102, 'ONE_OF_MANY');
INSERT INTO
  chests (reward_id, behavior)
VALUES
  (103, 'ONE_OF_MANY');
INSERT INTO
  chests (reward_id, behavior)
VALUES
  (104, 'ALL');
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (101, 1);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (101, 2);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (101, 2);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (102, 1);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (102, 2);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (102, 3);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (103, 3);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (104, 4);
INSERT INTO
  chests_items (chest_id, item_id)
VALUES
  (104, 5);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (1, 1, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (2, 2, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (3, 3, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (4, 4, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (5, 5, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (6, 6, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (7, 7, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (8, 8, 'Kartkówka', 2.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (9, 9, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (10, 10, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (11, 11, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (12, 12, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (13, 13, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (14, 14, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (15, 15, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (16, 16, 'Laboratorium', 4.0);
INSERT INTO
  criteria (id, gradable_event_id, name, max_xp)
VALUES
  (17, 17, 'Kartkówka', 2.0),
  (18, 18, 'Kartkówka', 2.0),
  (19, 19, 'Kartkówka', 2.0),
  (20, 20, 'Kartkówka', 2.0),
  (21, 21, 'Kartkówka', 2.0),
  (22, 22, 'Kartkówka', 2.0),
  (23, 23, 'Kartkówka', 2.0),
  (24, 24, 'Kartkówka', 2.0),
  (25, 25, 'Laboratorium', 4.0),
  (26, 26, 'Laboratorium', 4.0),
  (27, 27, 'Laboratorium', 4.0),
  (28, 28, 'Laboratorium', 4.0),
  (29, 29, 'Laboratorium', 4.0),
  (30, 30, 'Laboratorium', 4.0),
  (31, 31, 'Laboratorium', 4.0),
  (32, 32, 'Laboratorium', 4.0),
  (33, 33, 'Git', 10.0);
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (1, 1, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (2, 2, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (3, 3, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (4, 8, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (5, 9, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (6, 10, 1, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (7, 1, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (8, 2, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (9, 3, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (10, 8, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done');
INSERT INTO
  grades (id, gradable_event_id, animal_id, created_date, modified_date, comment)
VALUES
  (11, 1, 58, NOW(), NOW(), NULL),
  (12, 17, 100, NOW(), NOW(), NULL),
  (13, 6, 17, NOW(), NOW(), NULL),
  (14, 4, 69, NOW(), NOW(), NULL),
  (15, 5, 69, NOW(), NOW(), NULL),
  (16, 3, 58, NOW(), NOW(), NULL),
  (17, 1, 17, NOW(), NOW(), NULL),
  (18, 9, 21, NOW(), NOW(), NULL),
  (19, 10, 21, NOW(), NOW(), NULL),
  (20, 11, 21, NOW(), NOW(), NULL),
  (21, 12, 21, NOW(), NOW(), NULL),
  (22, 13, 21, NOW(), NOW(), NULL),
  (23, 14, 21, NOW(), NOW(), NULL),
  (24, 15, 21, NOW(), NOW(), NULL),
  (25, 9, 23, NOW(), NOW(), NULL),
  (26, 10, 23, NOW(), NOW(), NULL),
  (27, 11, 23, NOW(), NOW(), NULL),
  (28, 12, 23, NOW(), NOW(), NULL),
  (29, 13, 23, NOW(), NOW(), NULL),
  (30, 14, 23, NOW(), NOW(), NULL),
  (31, 15, 23, NOW(), NOW(), NULL),
  (32, 1, 23, NOW(), NOW(), NULL),
  (33, 2, 23, NOW(), NOW(), NULL),
  (34, 3, 23, NOW(), NOW(), NULL),
  (35, 4, 23, NOW(), NOW(), NULL),
  (36, 5, 23, NOW(), NOW(), NULL),
  (37, 6, 23, NOW(), NOW(), NULL),
  (38, 7, 23, NOW(), NOW(), NULL),
  (39, 8, 23, NOW(), NOW(), NULL),
  (40, 33, 23, NOW(), NOW(), NULL),
  (41, 10, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (42, 4, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (43, 5, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (44, 6, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (45, 7, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (46, 9, 2, '2025-09-20 17:23:03', '2025-09-20 17:23:03', 'Well done'),
  (47, 9, 2, NOW(), NOW(), 'You are the best :)');
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (1, 1, 1, 1.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (2, 2, 2, 2.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (3, 3, 2, 2.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (4, 4, 8, 2.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (5, 5, 9, 1.5);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (6, 6, 10, 1.4);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (7, 7, 1, 0.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (8, 8, 2, 1.5);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (9, 9, 2, 2.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (10, 10, 8, 2.0);
INSERT INTO
  criteria_grades (id, grade_id, criterion_id, xp)
VALUES
  (11, 11, 1, 1.4),
  (12, 12, 9, 1.0),
  (13, 13, 6, 1.0),
  (14, 14, 4, 2.0),
  (15, 15, 5, 1.2),
  (16, 16, 3, 1.0),
  (17, 17, 1, 2.0),
  (18, 18, 9, 4.0),
  (19, 19, 10, 4.0),
  (20, 20, 11, 4.0),
  (21, 21, 12, 4.0),
  (22, 22, 13, 4.0),
  (23, 23, 14, 4.0),
  (24, 24, 15, 4.0),
  (25, 25, 9, 4.0),
  (26, 26, 10, 4.0),
  (27, 27, 11, 4.0),
  (28, 28, 12, 4.0),
  (29, 29, 13, 4.0),
  (30, 30, 14, 4.0),
  (31, 31, 15, 4.0),
  (32, 32, 1, 2.0),
  (33, 33, 2, 2.0),
  (34, 34, 3, 2.0),
  (35, 35, 4, 2.0),
  (36, 36, 5, 2.0),
  (37, 37, 6, 2.0),
  (38, 38, 7, 2.0),
  (39, 39, 8, 2.0),
  (40, 40, 33, 10.0),
  (41, 41, 10, 2.0),
  (42, 42, 4, 1.0),
  (43, 43, 5, 1.0),
  (44, 44, 6, 1.0),
  (45, 45, 7, 1.2),
  (46, 46, 9, 1.3),
  (47, 47, 12, 1.4);

INSERT INTO
  assigned_rewards (id, criterion_grade_id, reward_id, received_date, used_date, is_used)
VALUES
  (1, 1, 101, '2025-09-20 17:23:03', NULL, FALSE),
  (2, 1, 102, '2025-09-20 17:23:03', '2025-09-20 17:23:03', FALSE),
  (5, 11, 101, NOW(), NOW(), TRUE),
  (6, 11, 1, NOW(), NOW(), TRUE),
  (7, 12, 101, NOW(), NOW(), TRUE),
  (8, 12, 1, NOW(), NOW(), TRUE),
  (9, 7, 101, NOW(), NULL, FALSE),
  (10, 8, 102, NOW(), NULL, FALSE),
  (11, 8, 1, NOW(), NULL, FALSE),
  (12, 8, 2, NOW(), NULL, FALSE),
  (13, 8, 3, NOW(), NULL, FALSE),
  (14, 7, 1, NOW(), NULL, FALSE),
  (15, 7, 2, NOW(), NULL, FALSE),
  (16, 47, 101, NOW(), NULL, FALSE),
  (17, 47, 102, NOW(), NOW(), TRUE),
  (18, 47, 1, NOW(), NOW(), TRUE);
INSERT INTO
  assigned_chests (assigned_reward_id)
VALUES
  (1),
  (2),
  (5),
  (7),
  (9),
  (10),
  (16),
  (17);

INSERT INTO
    assigned_items (assigned_reward_id, assigned_chest_id, bonus_xp)
VALUES
    (6, 5, 0.0),
    (8, 7, 2.5),
    (18, 17, 0.0);

INSERT INTO
  submission_requirements (id, gradable_event_id, name, is_mandatory, order_index)
VALUES
  (1, 9, 'Wykonanie zadania', TRUE, 1),
  (2, 10, 'Wykonanie zadania', TRUE, 1),
  (3, 11, 'Wykonanie zadania', TRUE, 1),
  (4, 12, 'Wykonanie zadania', TRUE, 1),
  (5, 12, 'Zadanie dodatkowe', FALSE, 2),
  (6, 13, 'Wykonanie zadania', TRUE, 1),
  (7, 13, 'Zadanie dodatkowe', FALSE, 2),
  (8, 14, 'Wykonanie zadania', TRUE, 1),
  (9, 15, 'Wykonanie zadania', TRUE, 1),
  (10, 16, 'Wykonanie zadania', TRUE, 1),
  (11, 16, 'Zadanie dodatkowe', FALSE, 2),
  (12, 33, 'Wykonanie zadania', TRUE, 1),
  (13, 39, 'Link do repozytorium', TRUE, 1),
  (14, 40, 'Link do repozytorium', TRUE, 1),
  (15, 41, 'Link do repozytorium', TRUE, 1),
  (16, 42, 'Link do repozytorium', TRUE, 1);

INSERT INTO
  submissions (id, submission_requirement_id, animal_id, url, is_locked, created_date, modified_date)
VALUES
  (1, 1, 1, 'https://github.com/example/repo1', FALSE, NOW(), NOW()),
  (2, 1, 6, 'https://github.com/example/repo1', TRUE, NOW(), NOW()),
  (3, 13, 1, 'https://github.com/example/group1-repo', FALSE, NOW(), NOW()),
  (4, 13, 6, 'https://github.com/example/group1-repo', FALSE, NOW(), NOW()),
  (5, 2, 10, 'https://github.com/example/repo3', FALSE, NOW(), NOW()),
  (6, 4, 4, 'https://github.com/example/repo4', FALSE, NOW(), NOW()),
  (7, 5, 4, 'https://github.com/example/repo5', FALSE, NOW(), NOW());
SELECT
  setval('submission_requirements_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  submission_requirements;
SELECT
  setval('project_groups_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  project_groups;
SELECT
  setval('submissions_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  submissions;
SELECT
  setval('animals_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  animals;
SELECT
  setval('assigned_rewards_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  assigned_rewards;
SELECT
  setval('course_groups_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  course_groups;
SELECT
  setval('courses_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  courses;
SELECT
  setval('criteria_grades_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  criteria_grades;
SELECT
  setval('criteria_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  criteria;
SELECT
  setval('event_sections_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  event_sections;
SELECT
  setval('evolution_stages_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  evolution_stages;
SELECT
  setval('gradable_events_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  gradable_events;
SELECT
  setval('grades_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  grades;
SELECT
  setval('rewards_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  rewards;
SELECT
  setval('users_id_seq', COALESCE(MAX(id), 0) + 1, FALSE)
FROM
  users;
COMMIT;
