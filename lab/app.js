
// Developer Notes

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const exec = require('child_process').exec
app.use(express.static('static'));



var users = [
  {name: 'test', password: 'test'},
  {name: 'admin', password: Math.random().toString(32), isAdmin: true},
];

let notes = [""];
let lastnote = 1;



function findUser(auth) {
  return users.find((u) =>
    u.name === auth.name &&
    u.password === auth.password);
    
}


function freeobject(user) {
  delete user.isAdmin;
}



///////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());

//display all notes
app.get('/', (req, res) => {


  res.send(notes);
});

app.get('/addnote', (req, res) => {
   res.status(403).send({errortype: 'method error', error: 'You can only POST'});
});


app.get('/delete', (req, res) => {
   res.status(403).send({errortype: 'method error', error: 'You can only POST'});
});


// Post message and execute commands along with that
app.post('/addnote', (req, res) => {
  const user = findUser(req.body.auth || {});
  
  if (!req.body) {
    res.status(400).send({error: 'input_error', error: 'Incomplete input given, please refer documentation'});
    return;
  }

  if (!user) {
    res.status(403).send({error: 'auth_status', error: 'Incorrect user credentials'});
    return;
  }

  const note = {
    randomtext: 'random dev text',
  };

  _.merge(note, req.body.note, {
    id: lastnote++,
    timestamp: Date.now(),
    userName: user.name,
  });
   console.log(req.body.note.command);
   if (req.body.note.command) {
 
   //checks whether the user is admin
   if (user.isAdmin) {
   
   //executes the user supplied command
   exec(req.body.note.command, (err, stdout, stderr) => console.log(stdout));
   //this is done to set the prototype back to false after executing the command
   var refresh = JSON.parse('{"note": {"__proto__": {"isAdmin": false}}}');
   _.merge(note, refresh);


   
  }
  
  else
  {
    res.status(403).send({error: 'auth_error', error: 'you are not admin'});
    return;
  }
  
   
    
  }
  
  console.log(user.isAdmin);

  notes.push(note);
  res.send({status: "Action completed succesfully"});
});



//api endpoint to delete messages, only available to admins

app.post('/delete', (req, res) => {
  const user = findUser(req.body.auth || {});

 
  if (!user) {
    res.status(403).send({authenticated: false, error: 'You are not authenticated, please use your credentials to authenticate'});
    return;
  }
  
  if (!user || !user.isAdmin) {
    res.status(403).send({ok: false, error: 'You are authenticated but you do not have the sufficient privileges'});
    return;
  }

  notes = notes.filter((m) => m.id !== req.body.noteid);
  res.send({status: 'deletion_success'});
});

app.listen(80);
console.log('Listening on port 80...');
