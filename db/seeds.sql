INSERT INTO departments (name)
VALUES ("Accounting"),
    ("Sales"),
    ("Engineering"),
    ("Marketing"),
    ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accounting Manager", 75000, 1),
("Sales Manager", 73000, 2),
("Software Engineer", 90000, 3),
("Marketing Manager", 60000, 4),
("HR Manager", 70000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Ham", 1, 1),
("Jennifer", "Lopez", 2, 2),
("Amy", "Poeler", 3, 3),
("Will", "Ferrell", 4, 4),
("Adam", "Sandler", 4, 5);
