const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy, broadcastEvents  } = require('./peerProxy.js');





// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let score = 0;
//let tasks = []


// auth stuff

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;  
    next();  
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

const authCookieName = 'token';
function setAuthCookie(res){
  let authToken = uuid.v4()
  res.cookie(authCookieName, authToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 3600000,
    
  })
  return authToken
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}



//end auth func



// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

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
  console.log("create request received")
  if (req.body.username && req.body.password){
    if (await DB.getUser(req.body.username) === null){
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = await createUser(req.body.username, hashedPassword)
    return res.status(200).json({msg:"success"})}
    else{
      return res.status(409).json({ msg: 'User already exists' });
  } 
  }

async function createUser(username, password) {

  let user = {
    username: username,
    password: password,
  };
  await DB.addUser(user);

  return user;
}
  
})

/*apiRouter.post('/login', async (req, res) => {
  console.log("Login request received:", req.body);
  if (!req.body.username || !req.body.password){
    return res.status(400).json({msg:"please use both user and password", users})

  }
  else if (!users[req.body.username]){
    return res.status(404).json({msg:"user not found", users})

  }

  else if (users[req.body.username].password !== req.body.password){
    return res.status(401).json({msg:"incorrect password", users})
  }
  
    
  else if (users[req.body.username].password === req.body.password ){
    let cookie = setAuthCookie(res);

     users[req.body.username] ={
      ...users[req.body.username],
      token:cookie
     }
     console.log(cookie)



    return res.status(200).json({msg:"success", cookie})}
})*/

apiRouter.post('/login', async (req, res) => {
  let user = await findUser('username', req.body.username);
  if (!user){
    res.status(404).send({ msg: 'User Not Found' });
  }
  let cookie = setAuthCookie(res);
  user = Object.assign(user, { token: cookie })
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      await DB.updateUser(user);
      return res.status(200).json({msg:"success", cookie})
    }
    res.status(401).send({ msg: 'Unauthorized' });
  }
  res.status(404).send({ msg: 'User Not Found' });
});





/*apiRouter.delete('/logout', async (req, res) => {
  console.log(req.cookies);
  
    let user = req.cookies[authCookieName]

    for (let username in users){
      if (users[username].token === user){
        let realUser = user
        delete users[username].token
        res.clearCookie(authCookieName,{
          httpOnly: true,
          secure: true,
          sameSite: 'None'
        })
        console.log(req.cookies[authCookieName])
        return res.status(200).json({msg:"success", realUser})
        }
      }
      return res.status(400).json({msg:"failed", user})
    }
)*/
apiRouter.delete('/logout', async (req, res) => {
  let user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.differentUpdateUser(user);
  }
  res.clearCookie(authCookieName);
  return res.status(200).json({msg:"success", user})
});



/*apiRouter.post('/tasks', async (req, res) => {
  const { v4: uuidv4 } = require('uuid');
  let newTask = {
    id: uuidv4(),
    text: req.body.task,
    completed: false

  }
  
  if (!req.body.task){
    return res.status(400).json({msg:"please input task"})

  }
  else{
    tasks.push(newTask)
    return res.status(200).json({msg:"successfully added task", tasks})

  }
})*/

apiRouter.post('/completed', async (req, res) => { 
  let user = await findUser('token', req.cookies[authCookieName] );
  const task = user.tasks.find(task => task.id === req.body.id);
  if (task){
    task.completed = req.body.completed
    await DB.updateUser(user);
    return res.status(200).json({msg:"success", task})
  }
else {
    return res.status(404).json({msg:"Task not found"})
  }

})

apiRouter.post('/tasks', async (req, res) => {
  let user = await findUser('token', req.cookies[authCookieName] );
  const { v4: uuidv4 } = require('uuid');
  let newTask = {
    id: uuidv4(),
    text: req.body.task,
    completed: req.body.completed

  }

  if (!req.body.task){
    return res.status(400).json({msg:"please input task"})
  }
  if(!user){
    return res.status(404).json({msg:"Could not find user."})
  }
  else{
    if (user.tasks){
      user.tasks.push(newTask)
      
    }
    if (!user.tasks){
      
      user.tasks = [];
      
      user.tasks.push(newTask)
      
    }
    await DB.updateUser(user)
    
    return res.status(200).json({msg:"successfully added task", tasks: user.tasks})

  }
})
apiRouter.get('/tasks', verifyAuth, async (req,res) => {
  let user = await findUser('token', req.cookies[authCookieName] );
  if (user){
    return res.status(200).json({msg:"successfully rendered", tasks: user.tasks})}
  else{
    return res.status(404).json({msg:"user not found"})
  }
  

})

/*apiRouter.delete('/remove/tasks/:taskId', async (req, res) => {
  if (!req.params.taskId){
    return res.status(400).json({msg:"something went wrong"})

  }
  else{
    tasks = tasks.filter(task => task.id !== req.params.taskId)
    
    
    console.log(req.params.taskId)
    console.log(tasks.map(task=>task.id))
    
    
    


    return res.status(200).json({msg: "task removed", tasks})

  }
})*/

apiRouter.delete('/remove/tasks/:taskId', async (req, res) => {
  let user = await findUser('token', req.cookies[authCookieName] );
  if (!req.params.taskId){
    return res.status(400).json({msg:"something went wrong"})
  }
  if (!user.tasks){
    return res.status(404).json({msg:"no tasks found"})
  }
  else{
    user.tasks = user.tasks.filter(task => task.id !== req.params.taskId)
    await DB.updateUser(user)
    
    
    //console.log(req.params.taskId)
    //console.log(tasks.map(task=>task.id))
    
    return res.status(200).json({msg: "task removed", tasks: user.tasks})

  }
})




/*apiRouter.post('/score/:taskId', async (req, res) => {
 
  
  if (req.body.score !== undefined) {
    score = req.body.score;
    console.log(score)
    return res.status(200).json({ msg: "Updated score", score });
  } else {
    return res.status(400).json({ msg: "Invalid score update", receivedTaskId: req.body.id });
  }
});*/

apiRouter.post('/score/:taskId', async (req, res) => {
  let user = await findUser('token', req.cookies[authCookieName] );
  if (req.body.score !== undefined) {
    let userScore = await DB.getScore(req.cookies[authCookieName]);
    if (!Number(userScore) || userScore === null){
      userScore= 0
    }
    
    console.log("Received score update:", req.body.score);
    user.score = userScore + req.body.score
    broadcastEvents({
      from: user.username,
      type: 'LeaderboardEnd',
      value: { name: user.username, score: user.score }
    })
    await DB.singleValueUpdateUser(user)
    console.log(user.score)
    return res.status(200).json({ msg: "Updated score", score: user.score });
  } else {
    return res.status(400).json({ msg: "Invalid score update", receivedTaskId: req.body.id });
  }
});
apiRouter.get('/score/', async (req, res) => {
  let user = await findUser('token', req.cookies[authCookieName] );
  if (user) {
    return res.status(200).json({ msg: "Updated score", score: user.score });
  } else {
    return res.status(400).json({ msg: "Invalid score update", receivedTaskId: req.body.id });
  }
});
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

apiRouter.get('/auth', async (req, res) => {
  console.log("cookies received:", req.cookies);
  const user = await findUser('token', req.cookies[authCookieName]);
  console.log("user found")
  if (user){
    return res.status(200).send();
  }
  else{
    return res.status(401).send();
  }
})

apiRouter.get('/usernameis', async (req, res) => {

  console.log("request for username received")
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user){
    return res.status(200).send({username: user.username})
  }
  else{
    return res.status(401).send();
  }
  
})

apiRouter.get('/highscores', async (req, res) => {
  let scores = await DB.getHighScores()
  res.json(scores);
})



const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

//test

