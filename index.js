import httpServer from './src/Infrastructure/HttpServer.js';
import {
  closeDatabaseConnection,
  connectToDatabase,
} from './src/Infrastructure/DatabaseConnection.js';

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
    console.log('VOCAP', e);
  }

  console.log(`Running on ${process.env.NODE_ENV} environment`);
})();
