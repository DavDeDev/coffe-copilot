const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);

let isConnected = false;

export const connectToDB = async () => {
  console.log("Starting connection to DB");
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (isConnected) {
    return console.log('already connected');
  }
  await client.connect();
  isConnected = true;
  try {
    const results = await client.query('SELECT * FROM users');
    console.log(results);
  } catch (err) {
    console.error('error executing query:', err);
  } finally {
    client.end();
  }
};