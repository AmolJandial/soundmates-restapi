import 'dotenv/config';
import app from './server';
import './mongo';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

app.listen(3000, function () {
  console.log('server started');
});
