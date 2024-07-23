const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Admin1'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

const reg = (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT * FROM login WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
     
      res.redirect('/stu.html');
    } else {
      res.send('Incorrect username or password');
    }
  });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/stu.html');
  });

  const reg1 =  (req, res) => {
    const {register_id,name,dob,bloodgroup,state,address,pincode,mobileNumber} = req.body;
  
    const QUERY = 'INSERT INTO tblstu (register_id,name,dob,bloodgroup,state,address,pincode,mobileNumber) VALUES (?,?,?,?,?,?,?,?)';
    
    connection.query(QUERY,[register_id,name,dob,bloodgroup,state,address,pincode,mobileNumber],(err, results) => {
      if (err) {
        console.error('Error inserting student: ',err);
        res.status(500).send('Error inserting student');
      
      }else{
      console.log('Inserted student with id ',results);
      res.status(200).json('Student inserted successfully');
      }
    });
  }

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/fp.html');
  });

  const reg2 =(req, res) => {
    const { username, password } = req.body;
    const query = "UPDATE login SET password = ? WHERE username = ?";
    
    connection.query(query, [password, username], (err, results) => {
      if (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Error updating password');
        return;
      }
      
      if (results.affectedRows > 0) {
         res.sendFile(__dirname + '/stu.html');
        console.log('Password changed successfully.');
      } else {
        res.status(404).send('Username not found');
      }
    });
  }
  

app.use(express.static(__dirname));
const port = 4002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
module.exports ={
    reg,
    reg1,
    reg2,
}