const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nishatttj:Nishat2025@dreamscluster.bunvxqj.mongodb.net/?retryWrites=true&w=majority&appName=DreamsCluster";

const client = new MongoClient(uri, {
    serverApi: { 
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
let db;

const connectDB = async () => {
  try {
    await client.connect();  
    db = client.db('dreamsDB'); 
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const getDB = () => {
  if (!db) {
    console.error("Database not connected");
    return null;  
  }
  return db;  
};

module.exports = { connectDB, getDB }; 