import 'dotenv/config';
import app from './server';
import mongoose from 'mongoose';

const mongoPass = process.env.MONGO_PASSWORD!;
const mongoConnectUrl = `mongodb+srv://amoljandial41:${mongoPass}@cluster0.1ukt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

mongoose
  .connect(mongoConnectUrl)
  .then(() => {
    console.log('connected to mongo');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, function () {
  console.log('server started');
});
