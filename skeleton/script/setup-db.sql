DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS prducts;

CREATE TABLE IF NOT EXISTS users (
  username varchar PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  price integer NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('soap', 5),
  ('phone', 100),
  ('tv', 125),
  ('vacuum', 111),
  ('water', 1),
  ('house', 2300),
  ('chair', 12),
  ('window', 23),
  ('coffee', 8);

INSERT INTO users (username) VALUES
  ('john'),
  ('mary'),
  ('cho');
