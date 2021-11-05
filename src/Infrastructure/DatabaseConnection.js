import mongo from 'mongodb';

let database;
let connection;

const connectToDatabase = async () => {
  try {
    database = process.env.MONGO_DB_NAME;
    const mongoUrl = process.env.MONGO_URL;

    const client = new mongo.MongoClient(mongoUrl, {
      appname: 'casino-control-service',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      ignoreUndefined: true,
    });

    connection = await client.connect();
  } catch (error) {
    console.log('MongoConnectionError');
  }
};

const query = (collection, db = database) => connection.db(db).collection(collection);

const closeDatabaseConnection = async () => {
  if (connection) await connection.close();
};

export {
  query,
  connectToDatabase,
  closeDatabaseConnection,
};
