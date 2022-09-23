import mysql from 'mysql';

const connection = null;

try{
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database:'sanly_gatnashyk'
      });
    
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
    
} catch(ex){
    console.log(ex);
}

  export {connection};