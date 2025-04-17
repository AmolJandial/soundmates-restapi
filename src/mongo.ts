import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoPass = process.env.MONGO_PASSWORD!;
const mongoConnectUrl = `mongodb+srv://amoljandial41:${mongoPass}@cluster0.1ukt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const mongoClient = new MongoClient(mongoConnectUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await mongoClient.connect();
    await mongoClient.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } finally {
    await mongoClient.close();
  }
}

run().catch(console.dir);

export default mongoClient;
