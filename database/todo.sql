DROP SCHEMA IF EXISTS todo;
CREATE SCHEMA todo;
USE todo;

/* Kanskje jeg lager en innlogging osv ved en senere anledning.

CREATE TABLE user (
  userId int AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(100) NOT NULL
);
*/
CREATE TABLE Todo (
  todoId INT AUTO_INCREMENT NOT NULL UNIQUE PRIMARY KEY,
  todoName varchar(50) NOT NULL,
  todoDescription varchar(250),
  completed BOOLEAN DEFAULT(false),
  createdAt DATETIME
 /* userId INT NULL,
  FOREIGN KEY (userId) REFERENCES user(userId) */
);