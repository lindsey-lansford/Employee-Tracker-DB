//npm packages
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const cTable = require('console.table');
const mysql = require('mysql2');

// Enable access to .env variables
require('dotenv').config();

//connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

db.connect(error => {
    if (error) throw error;
    //asciiart logo
    // console.log(logo({ name: 'Welcome' }).render());
    //initializes the mainMenu prompts
    beginPrompts();
})

//initial questions for the user input
const beginPrompts = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do today?',
            choices: [
                { name: 'View all Departments', value: 'viewDepts' },
                { name: 'View all Roles', value: 'viewRoles' },
                { name: 'View all Employees', value: 'viewEmployees' },
                { name: 'Add a New Depatment', value: 'addDept' },
                { name: 'Add a New Role', value: 'addRole' },
                { name: 'Add a New Employee', value: 'addEmployee' },
                { name: 'Update an Employee Role', value: 'updateEmployee' },
                { name: 'Quit', vaule: 'quit' },
            ],
            loop: false
        }
    ]).then((results) => {
        switch (results.mainMenu) {
            case 'viewDepts':
                viewDepts();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmployees();
                break;
            case 'addDept':
                addDept();
                break;
            case 'addRole':
                addRole();
                break;
            case 'addEmployee':
                addEmployee();
                break;
            case 'updateEmployee':
                updateEmployee();
                break;
            case 'quit':
                console.log('Thank you for using the Employee Tracker!');
                db.end();
                break;
        }
    });
};


const viewDepts = () => {
    console.log('\n***** Viewing All Departments *****\n');
    const sql = 'SELECT * FROM departments;';

    db.query(sql, (error, results) => {
        if (error) throw error;
        console.table(results);

        beginPrompts();
    });
};


const viewRoles = () => {
    console.log('\n***** Viewing All Roles *****\n');
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM departments RIGHT JOIN roles ON departments.id = roles.department_id ORDER BY roles.id;`;

    db.query(sql, (error, results) => {
        if (error) throw error;
        console.table(results);

        beginPrompts();
    });
};


const viewEmployees = () => {
    console.log('\n***** Viewing All Employees *****\n');
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id INNER JOIN roles ON (roles.id = employees.role_id) INNER JOIN departments ON (departments.id = roles.department_id);`;

    db.query(sql, (error, results) => {
        if (error) throw error;
        console.table(results);

        beginPrompts();
    });
};


const addDept = () => {
    console.log('\n***** Adding New Department *****\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'Please enter the new department you wish to add.'
        }
    ]).then((results) => {
        const sql = 'INSERT INTO departments(name) VALUES (?);';
        
        db.query(sql, results.newDept, (error, results) => {
            if (error) throw error;
            console.table(results);
        });
        
        viewDepts();
    });
};


const addRole = () => {
    console.log('\n***** Adding New Role *****\n');

    db.query('SELECT * FROM departments', (error, results) => {
        if(error) throw error;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please enter the new role you wish to add.',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary amount for this role.',
            },
            {
                type: 'list',
                message: 'Please select the department the role falls under.',
                name: 'deptName',
                choices:
                results.map(({ id, name }) => ({
                    name: name,
                    value: id
                }))
            }
        ])
            .then((res) => {
                db.query('INSERT INTO roles SET ?',
                    {
                        title: res.title,
                        salary: res.salary,
                        department_id: res.deptName
                    }
                );
                console.table(res);
                viewRoles();
            })
            .catch((error) => {
                console.log(error);
            });
    });
};


const addEmployee = () => {
    console.log('\n***** Adding New Employee *****\n');
};





const updateEmployee = () => {
    console.log('\n***** Updating Employee Role *****\n');
};



