-- Active: 1673873948015@@127.0.0.1@3306

CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);


PRAGMA table_info('users');

SELECT * FROM users;

INSERT INTO users (id, email, password)
values("user01", "user01@email.com", "S3nha1"),
("user02", "user02@email.com", "S3nha2"),
("user03", "user03@email.com", "S3nha3");
