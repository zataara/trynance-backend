CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE trades (
  id PRIMARY KEY,
  user_id FOREIGN kEY,
  currency_from_amount INTEGER NOT NULL,
  currency_from TEXT NOT NULL,
  currency_to_amount INTEGER NOT NULL,
  currency_to TEXT NOT NULL,
  datetime DATETIME
);

CREATE TABLE assets (
  symbol PRIMARY KEY,
  user_id FOREIGN KEY,
  amount INTEGER
);

CREATE TABLE faves (
  user_id FOREIGN KEY
  symbol PRIMARY KEY
);


