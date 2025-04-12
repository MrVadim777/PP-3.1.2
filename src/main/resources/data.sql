-- Роли
INSERT INTO roles (id, name) VALUES (1, 'USER');
INSERT INTO roles (id, name) VALUES (2, 'ADMIN');

-- Пользователи
INSERT INTO users (id, name, last_name, email, password)
VALUES (1, 'Иван', 'Иванов', 'ivan@mail.com', '111111'),
       (2, 'Сергей', 'Сергеевич', 'sergey@mail.com', '222222'),
       (3, 'Артём', 'Артёмович', 'artem@mail.com', '333333'),
       (4, 'Вадим', 'Вадимович', 'vadim@mail.com', '444444'),
       (5, 'Артур', 'Артурович', 'artyr@mail.com', '555555'),
       (6, 'Артурhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 'Артуровичhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 'artyr@mail.comhhhhhhhhhhhhhhhhhhhhhhh', '555555');

-- Связи
INSERT INTO users_roles (user_id, role_id) VALUES (1, 2); -- Иван → ADMIN
INSERT INTO users_roles (user_id, role_id) VALUES (1, 1); -- Иван → USER
INSERT INTO users_roles (user_id, role_id) VALUES (2, 1); -- Сергей → USER
INSERT INTO users_roles (user_id, role_id) VALUES (3, 1); -- Артём → USER
INSERT INTO users_roles (user_id, role_id) VALUES (4, 1); -- Вадим → USER
INSERT INTO users_roles (user_id, role_id) VALUES (5, 1); -- Артур → USER
INSERT INTO users_roles (user_id, role_id) VALUES (6, 1); -- Артур → USER
