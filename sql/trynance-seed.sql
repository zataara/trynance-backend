-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO faves (symbol, user_id)
VALUES ('btc', 'testuser'),
        ('eth', 'testuser'),
        ('sol', 'testuser'),
        ('usdc', 'testuser'),
        ('xlm', 'testuser');

INSERT INTO assets (symbol, user_id, amount)
VALUES ('dot', 'testuser', 4),
      ('shib', 'testuser', 100000),
      ('busd', 'testuser', 5000),
      ('atom', 'testuser', 22);



        