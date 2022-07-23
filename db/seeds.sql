INSERT INTO departments (name)
VALUES 
    ("Finance"),
    ("Sales"),
    ("Engineering"),
    ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Payroll Manager", 75000, 1),
    ("Payroll Clerk", 50000, 1),
    ("Finance Assistant", 53000, 1),
    ("Sales Manager", 73000, 2),
    ("Senior Sales Associate", 66000, 2),
    ("Sales Associate", 60000, 2),
    ("Senior Engineering Manager", 110000, 3),
    ("Software Engineer", 90000, 3),
    ("Junior Engineer", 85000, 3),
    ("HR Assistant", 58000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Jon", "Hamm", 1, NULL),
    ("Jennifer", "Lopez", 2, 1),
    ("Amy", "Poeler", 3, 1),
    ("Will", "Ferrell", 4, NULL),
    ("Adam", "Sandler", 5, 4),
    ("Brad", "Pitt", 6, 4),
    ("Tom", "Cruise", 6, 4),
    ("Kris", "Jenner", 7, NULL),
    ("Miles", "Teller", 8, 8),
    ("Margot", "Robbie", 9, 8),
    ("Kanye", "West", 10, NULL);
