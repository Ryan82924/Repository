const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('To-Do');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');
const taskCollection = db.collection('task');



(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

   async function addUser(user) {
      await userCollection.insertOne(user); // adds user object
   }

   function getUser(username) {
     return userCollection.findOne({ username: username });
   }

   function getUserByToken(token) {
     return userCollection.findOne({ token: token });
   }

   async function updateUser(user) {
     await userCollection.updateOne({ username: user.username }, { $set: user });
   }
   
      







module.exports = {
   getUser,
   getUserByToken,
   addUser,
   updateUser,
 };
 