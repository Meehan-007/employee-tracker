import inquirer from 'inquirer';
// const inquirer = require('inquirer');

 function init() {
    return inquirer.prompt([
        {
            // this displays a menu for the users to choose which action they want to take
            type: 'list',
            name: 'item',
            message: 'Select an item:',
            choices: ['view all departments', 'view all roles', 
            'view all employees', 
            'add a department', 'add a role', 
            'add an employee', 'update an employee']
          }
        ]).then((answers) => {

    if (answers === 'view all deperatments') { 
        console.log(answers)
        console.log('viewing departments')
        viewDepartments();
    } 

    if (answers === 'view all roles') { 
        console.log(answers)
        console.log('viewing roles')
        viewRoles();
    }  

    if (answers === 'view all employees') { 
        console.log(answers)
        console.log('viewing employees')
        viewEmployees();
    }  

    if (answers === 'add a department') { 
        console.log(answers)
        console.log('add departments')
        addDepartments();
    }  

    if (answers === 'add a role') { 
        console.log(answers)
        console.log('add roles')
        addRoles();
    }  

    if (answers === 'add an employee') { 
        console.log(answers)
        console.log('add employees')
        addEmployees();
    }  

    if (answers === 'update an employee') { 
        console.log(answers)
        console.log('update Employees')
        updateEmployees();
    }  

   
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    })
} 




function viewDepartments(){
    console.log("now viewing departments") 
    init();
} 

function viewRoles(){
    console.log("now viewing roles") 
    init();
} 

function viewEmployees(){
    console.log("now viewing employees") 
    init();
} 

function addEmployees(){
    console.log("add employees") 
    init();
} 

function addRoles(){
    console.log("add roles") 
    init();
} 

function addDepartments(){
    console.log("add department") 
    init();
} 

function updateEmployees(){
    console.log("update employees") 
    init();
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 



init(); 
