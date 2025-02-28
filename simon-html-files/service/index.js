const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
const cors = require('cors');


/*const authCookieName = 'token';*/

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests only from this frontend
  methods: ['GET', 'POST'],
}));
// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


var test = "hello world!"

apiRouter.get('/test', (_req, res) => {
  console.log("in test")
  res.send(test);
});

apiRouter.post('/create', async (req, res) => {
  if (req.body.username && req.body.password){
    if (!users[req.body.username]){
      users[req.body.username]= req.body.password
      return res.status(200).json({msg:"success"})}
      else{
        return res.status(409).json({ msg: 'User already exists' });
  } 

  
  }


  
})

apiRouter.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password){
    return res.status(400).json({msg:"please use both user and password"})

  }
  else if (!users[req.body.username]){
    return res.status(404).json({msg:"user not found"})

  }

  else if (users[req.body.username] !== req.body.password){
    return res.status(401).json({msg:"incorrect password"})
  }
  
    
  else if (users[req.body.username] === req.body.password){
    return res.status(200).json({msg:"success"})}
  
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
