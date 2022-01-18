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

INSERT INTO trades (user_id, currency_from_amount, currency_from_price, currency_from, currency_to_amount, currency_to_price, currency_to, date)
VALUES ('testuser', 1, 63000, 'btc', 10, 6000, 'eth', 'Mon Jan 1 2022' ), 
      ('testuser', 10, 2, 'xrp', 10, 1, 'xlm', 'Mon Jan 8 2022'), 
      ('testuser', 1, 1000000, 'shib', 1, 60, 'eos','Mon Jan 17 2022');

        