import inquirer from 'inquirer';
import consoleTable from 'console.table';
import connection from './DB/connection.mjs'; 
// const connection = require('./DB/connection.js');



 function init() {
     inquirer.prompt([
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

connection.query(`SELECT e1.*, roles.title AS role, departments.name AS department, roles.salary AS salary, CONCAT(e2.first_name, ' ', e2.last_name) AS Manager FROM employee e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employee e2 ON e2.id = e1.Manager_id`, (err, result) => {
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
      

    // connection.query('SELECT * FROM departments', function (err, result) {
    //     if (err) {
    //       console.error('Error executing query:', err);
    //       return;
    //     }
      
    //     console.log(result);
       
   

    inquirer
  .prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What department do you want to add?',
    },
  ])
  .then(function (answers) {
    console.log('Department to add:', answers.department);

    // Insert the department into the database
    connection.query(
      'INSERT INTO departments (name) VALUES (?)',
      [answers.department],
      function (err, result) {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        console.log('Department added successfully!');
        // Perform any additional actions after inserting the department
        // ... 
        init();
      }
    );
  })
  .catch(function (error) {
    console.error('Error occurred during prompt:', error);
  });

       
    
   
} 

function updateEmployees(){ 

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

    console.log("update employees") 
    init();
}








init(); 
