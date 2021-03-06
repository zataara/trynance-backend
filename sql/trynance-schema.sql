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
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE,
  currency_from_amount FLOAT NOT NULL
    CHECK(currency_from_amount >= 0),
  currency_from_price FLOAT NOT NULL,
  currency_from_image TEXT NOT NULL,
  currency_from TEXT NOT NULL,
  currency_to_amount FLOAT NOT NULL
    CHECK(currency_to_amount >= 0),
  currency_to_price FLOAT,
  currency_to_image TEXT NOT NULL,
  currency_to TEXT NOT NULL,
  date TEXT NOT NULL
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  user_id TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE,
  amount FLOAT,
  image TEXT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE faves (
  id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  user_id TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE
);