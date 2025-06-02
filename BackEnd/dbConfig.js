
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'StrategyX_DaxeshPractical'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Not Connected: ' + err);
      return;
    }
    console.log('Connected ');
  });

  module.exports= db;
 