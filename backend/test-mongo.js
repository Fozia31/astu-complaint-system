import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://astu-complaint-system:BhymQG30SBczKClZ@cluster0.fldhpjc.mongodb.net/astu_db?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ SUCCESS! Connected to MongoDB');
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Ping successful');
  } catch (err) {
    console.error('❌ Connection failed:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    if (err.message.includes('whitelist')) {
      console.error('🔴 This is an IP whitelist issue');
    } else if (err.message.includes('authentication')) {
      console.error('🔴 This is a username/password issue');
    }
  } finally {
    await client.close();
  }
}

run();