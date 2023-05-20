import inquirer from 'inquirer';
import consoleTable from 'console.table';
import connection from './DB/connection.mjs'; 
// const connection = require('./DB/connection.js');



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
            'add an employee', 'update an employee', 'exit']
          }
        ]).then((answers) => {

    if (answers.item === 'view all departments') { 
        
        console.log('viewing departments')
        viewDepartments();
    } 

    if (answers.item === 'view all roles') { 
        
        console.log('viewing roles')
        viewRoles();
    }  

    if (answers.item === 'view all employees') { 
       
        console.log('viewing employees')
        viewEmployees();
    }  

    if (answers.item === 'add a department') { 
       
        console.log('add departments')
        addDepartments();
    }  

    if (answers.item === 'add a role') { 
        
        console.log('add roles')
        addRoles();
    }  

    if (answers.item === 'add an employee') { 
        
        console.log('add employees')
        addEmployees();
    }  

    if (answers.item === 'update an employee') { 
        
        console.log('update Employees')
        updateEmployees();
    }  

    if (answers.item === 'exit') { 
        
        console.log('bye')
        process.exit(); 
    }  

    // else {
    //     console.log("syntax error") 
    //     console.log(answers.item); 
    //     init();
    // }

   
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    })
} 




function viewDepartments(){ 
    // WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
    console.log("now viewing departments") 
    var sql = connection.query('SELECT * FROM Departments') 
    consoleTable(sql);
    init();
} 

function viewRoles(){ 
    // WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    console.log("now viewing roles") 
    init();
} 

function viewEmployees(){ 
    // WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    console.log("now viewing employees") 
    init();
} 

function addEmployees(){ 
 

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    console.log("add employees") 
    init();
} 

function addRoles(){ 

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    console.log("add roles") 
    init();
} 

function addDepartments(){ 
       // WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database 
    console.log("add department") 
    init();
} 

function updateEmployees(){ 

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

    console.log("update employees") 
    init();
}








init(); 
