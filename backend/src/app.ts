import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import goalRoutes from './routes/goalRoutes';
import errorHandler from './middlewares/errorHandler';
import { corsOptions } from './config/cors.config';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Enable CORS with default settings (allow all origins)
app.use(cors(corsOptions));

// Routes
app.use('/api/goals', goalRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
