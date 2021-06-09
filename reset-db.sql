--@block Create a table users
CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, github_username VARCHAR(100) NOT NULL, repos_last_sync_date DATE NOT NULL);

--@block Create a table repositories
CREATE TABLE repositories (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, url VARCHAR(100) NOT NULL, user_id INT NOT NULL);

--@block Create a table repositories
INSERT INTO users (github_username, repos_last_sync_date) VALUES ('torvalds', '2021-06-09' ), ('unclebob','2021-06-09');
