CREATE EXTENSION "uuid-ossp";

CREATE TABLE movies(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    gender VARCHAR(50) NOT NULL
);

CREATE TABLE users(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', '$2b$10$A38gxtb52m3P8aXqy/jROuAyjLhOrm3v8GFII6Z3O85W5GMYBXeJ6');