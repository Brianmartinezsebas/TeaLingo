const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tealingo',
  port: '3306'
});

mysqlConnection.connect( err => {
  if(err){
    console.log('Error en db: ', err);
    return;
  }else{
    console.log('Conectado correctamente a la bd');
  }
});

module.exports = mysqlConnection;