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
 
    console.log("Now viewing departments");

connection.query('SELECT * FROM departments', (err, result) => {
  if (err) {
    console.error('Error retrieving departments:', err);
    return;
  }

  console.table(result);
  init(); 
});
} 

function viewRoles(){ 
   
    console.log("Now viewing roles");

connection.query('SELECT roles.*, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id;', (err, result) => {
  if (err) {
    console.error('Error retrieving roles:', err);
    return;
  }

  console.table(result);
  init(); 
}); 

} 

function viewEmployees(){ 
    
    console.log("Now viewing employees");

connection.query('SELECT employee.*, roles.title AS role, departments.name AS department, roles.salary AS salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;', (err, result) => {
  if (err) {
    console.error('Error retrieving departments:', err);
    return;
  }

  console.table(result);
  init(); 
}); 

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
