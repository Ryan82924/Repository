const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('To-Do');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');


async function main (){
    try {
        await db.command({ ping: 1 });
        console.log(`DB connected to ${config.hostname}`);
     } catch (ex) {
        console.log(`Error with ${url} because ${ex.message}`);
        process.exit(1);
     }

   async function addUser(user) {
      await userCollection.insertOne(user); // adds user object
   }

   function getUser(username) {
     return userCollection.findOne({ username: username });
   }

   function getUserByToken(token) {
     return userCollection.findOne({ token: token });
   }

   
      

      
const cursor = collection.find(query, options);
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
await collection.deleteMany(query);

const insertResult = await collection.insertOne(house);
await collection.deleteOne({ _id: insertResult.insertedId });

await client.close() 
}
main()