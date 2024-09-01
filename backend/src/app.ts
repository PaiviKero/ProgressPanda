import dotenv from 'dotenv';
import { Application } from 'express';
import createServer from './utils/server';

dotenv.config();

const app: Application = createServer();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
