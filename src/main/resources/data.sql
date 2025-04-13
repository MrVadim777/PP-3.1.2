-- Роли
INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN');

-- Пользователи
INSERT INTO users (id, name, last_name, email, password)
VALUES (1, 'Иван', 'Иванов', 'ivan@mail.com', '$2a$10$l7IWhT5jpys9Q1TeAvRk1uqBBJWD6AW94/jXOkmTJRJQGnUrqgWsy'),
       (2, 'Сергей', 'Сергеевич', 'sergey@mail.com', '$2a$10$QipO28wTij68B8BYCYi8Du4tdZ.s8KgGnfzuWuKF3d8CCBf8pnZ7y'),
       (3, 'Артём', 'Артёмович', 'artem@mail.com', '$2a$10$IvDg4QeQS9UYB17BBoh9oexCr9KF4/w1e9jtpaOIrpANUnyaRuoKi'),
       (4, 'Вадим', 'Вадимович', 'vadim@mail.com', '$2a$10$laOvBDDq5LgTgOLjhGmTCO4..BUbdC6KWky0gG/IVT6gesC4rtkmS'),
       (5, 'Артур', 'Артурович', 'artyr@mail.com', '$2a$10$krmF2ZRWcjn/mX2onx..yOgcRLnXJC0gOU4JICEJd4xA.meGpb1aa');

-- Связи
INSERT INTO users_roles (user_id, role_id) VALUES (1, 2); -- Иван → ADMIN
INSERT INTO users_roles (user_id, role_id) VALUES (1, 1); -- Иван → USER
INSERT INTO users_roles (user_id, role_id) VALUES (2, 1); -- Сергей → USER
INSERT INTO users_roles (user_id, role_id) VALUES (3, 2); -- Артём → USER
INSERT INTO users_roles (user_id, role_id) VALUES (4, 1); -- Вадим → USER
INSERT INTO users_roles (user_id, role_id) VALUES (5, 1); -- Артур → USER
