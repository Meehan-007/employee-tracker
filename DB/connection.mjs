import mysql from 'mysql2';


  const connection = mysql.createConnection({
    host: 'localhost', // Replace with your database host 
    port: 3306, 
    user: 'root', // Replace with your database username
    password: 'Root122!', // Replace with your database password
    database: 'Manager' // Replace with your database name
  });

  connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to the database:', error);
      return;
    }
    console.log('Connected to the database!');
  });


export default connection;
