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
    console.log(logo({ name: 'Welcome' }).render());
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
    console.log('Now viewing all Departments.\n');
    const sql = 'SELECT * FROM departments';

    db.query(sql, (error, results) => {
        if (error) throw error;
        console.table(results);

        beginPrompts();
    });
};

const viewRoles = () => {
    console.log('Now viewing all Roles.\n');
    const sql = 'SELECT * FROM roles';

    db.query(sql, (error, results) => {
        if (error) throw error;
        console.table(results);

        beginPrompts();
    });
};

const viewEmployees = () => {
    console.log('Now viewing all Employees.')
};

const addDept = () => {
    console.log('Now adding a new Department.\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'Please enter the new department.'
        }
    ]).then((results) => {
        const sql = 'INSERT INTO departments(name) VALUES (?)';
        
        db.query(sql, results.newDept, (error, results) => {
            if (error) throw error;
            console.table(results);
        });
        
        viewDepts();
    });
};

const addRole = () => {
    console.log('Now adding a new Role.')
};

const addEmployee = () => {
    console.log('Now adding a new Employee.')
};

const updateEmployee = () => {
    console.log('Now updating the Employee Role.')
};



