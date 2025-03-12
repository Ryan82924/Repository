const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

async function main (){
    try {
        await db.command({ ping: 1 });
        console.log(`DB connected to ${config.hostname}`);
     } catch (ex) {
        console.log(`Error with ${url} because ${ex.message}`);
        process.exit(1);
     }

     const house = {
        name: 'Beachfront views',
        summary: 'From your bedroom to the beach, no shoes required',
        property_type: 'Condo',
        beds: 1,
      };
   
      await collection.insertOne(house);

      const query = { property_type: 'Condo', beds: { $lt: 2 } };
const options = {
 sort: { score: -1 },
 limit: 10,
};
const cursor = collection.find(query, options);
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
await collection.deleteMany(query);

const insertResult = await collection.insertOne(house);
await collection.deleteOne({ _id: insertResult.insertedId });

await client.close() 
}
main()