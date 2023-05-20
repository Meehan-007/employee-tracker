DROP DATABASE IF EXISTS Manager;

CREATE DATABASE Manager;
USE Manager;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
); 

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT  NULL, 
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES departments(id)
); 

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT,  
    FOREIGN KEY (role_id) REFERENCES roles(id),
    Manager_id INT 
); 