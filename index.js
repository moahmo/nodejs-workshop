const httpServer = require('./src/Infrastructure/HttpServer.js');
const { closeDatabaseConnection, connectToDatabase } = require('./src/Infrastructure/DatabaseConnection.js');

(async () => {
  const cleanup = async () => {
    closeDatabaseConnection();
    process.exit();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  try {
    await connectToDatabase();

    httpServer.start();
  } catch (e) {
    console.log('Error', e);
  }

  console.log(`Running on ${process.env.NODE_ENV} environment`);
})();
