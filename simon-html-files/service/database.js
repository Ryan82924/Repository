const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('To-Do');
const userCollection = db.collection('user');




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
   async function getScore(token) {
    let user = await userCollection.findOne({ token:token})
    return user.score
  }

  

   function getUserByToken(token) {
     return userCollection.findOne({ token: token });
   }

   async function updateUser(user) {
     await userCollection.updateOne({ username: user.username }, { $set: user });
   }


   function getHighScores() {
     const query = { score: { $gt: 0, $lt: 900 } };
     const options = {
       sort: { score: -1 },
       limit: 3,
     };
     const cursor = userCollection.find(query, options);
     return cursor.toArray();
   }

   async function differentUpdateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $unset: {token: ""} });
  }
  async function singleValueUpdateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: {score: user.score} });
  }
   
      







module.exports = {
   getUser,
   getUserByToken,
   addUser,
   updateUser,
   differentUpdateUser,
   singleValueUpdateUser,
   getScore,
   getHighScores,
 };
 