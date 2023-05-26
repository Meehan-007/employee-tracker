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

function addEmployees() {
    
    connection.query('SELECT employee.id, CONCAT(first_name, " ", last_name) AS Name, roles.title, role_id FROM employee LEFT JOIN roles ON employee.id = roles.id', function (err, result) {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
  
      console.log(result); 
      var role = result.map((item) => item.title);
  
    var roles = result.map((item) => {
        return {
          id: item.role_id,
          title: item.title
        };
      });
      console.log(roles); 
      var employees = result.map((item) => {
          return{
              id: item.id, 
              name: item.Name
          }
      });
      console.log(employees); 
       

      inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstname',
          message: 'what is their first name?',
        }, 
        {
          type: 'input',
          name: 'lastname',
          message: 'what is their last name?',
        }, 
        {
          type: 'list',
          name: 'role',
          message: 'what is their role?',
          choices: role
        }, 
        {
            type: 'list',
            name: 'manager',
            message: 'who is there manager?',
            choices: employees
          }
     
      ]).then(function (answers) {
          
          let roleid 
          let managerid
        console.log("answers-role:", answers.role); 
        console.log()
          for (var i = 0; i < roles.length; i++) { 
              
             if (answers.role === roles[i].title){
                   roleid = roles[i].id 
                   console.log("role_id", roleid)
             } 
          } 

          for (var i = 0; i < employees.length; i++) { 
              
            if (answers.manager === employees[i].name){
                  managerid = employees[i].id 
                  console.log("manager:", managerid)
            } 
         } 

          connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answers.firstname, answers.lastname, roleid, managerid],
            function (err, result) {
              if (err) {
                console.error('Error executing query:', err);
                return;
              }
  
              console.log('Role added successfully!');
              init();
            });
          })
        .catch(function (error) {
          console.error('Error occurred during prompt:', error);
        });
      });
  }
  

function addRoles(){  

    connection.query('SELECT * FROM departments', function (err, result) {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
      
        console.log(result); 
        var department = result 
        console.log(department);

       

        inquirer
        .prompt([
          {
            type: 'input',
            name: 'roleName',
            message: 'What role do you want to add?',
          }, 
          {
            type: 'input',
            name: 'salary',
            message: 'How much bread do they make?',
          }, 
          {
            
            type: 'list',
            name: 'departments',
            message: 'which depertment does it belong to?',
            choices: department
          }
       
        ]).then(function (answers) {
            console.log('Role Name:', answers.roleName);
            console.log('Salary:', answers.salary);
            let deptid
          
            for (var i = 0; i < department.length; i++) { 
                
               if (answers.departments === department[i].name){
                     deptid = department[i].id
               } 
            }
  
            console.log("selecteddepertment:", deptid); 
         

            connection.query(
              'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
              [answers.roleName, answers.salary, deptid],
              function (err, result) {
                if (err) {
                  console.error('Error executing query:', err);
                  return;
                }
    
                console.log('Role added successfully!');
                init();
              });
            })
          .catch(function (error) {
            console.error('Error occurred during prompt:', error);
          });
        });
    }

function addDepartments(){ 

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


init()
