USE Manager

INSERT INTO departments (name)
VALUES
('Sales'),
('UX'),
('Marketing'),
('accounting'),
('developers');

INSERT INTO roles (title, salary, department_id)
VALUES
('sales-rep', 35000, 1),
('UX designer', 100000, 2),
('marketer', 65000, 3), 
('accountant', 80000, 4),
('front-end engineer', 145000, 5),
('back-end engineer', 160000, 5),
('full stack generalist', 120000, 5),
('web developer', 95000, 5),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Whitney', 'Houston', 1, NULL),
('Lady', 'Gaga', 2, NULL),
('Mariah', 'Carey', 3, NULL),
('Ariana', 'Grande', 4, NULL),
('Dua', 'Lipa', 5, NULL),
('Toni', 'Braxton', 6, NULL),
('Lana', 'DelRay', 7, 6),