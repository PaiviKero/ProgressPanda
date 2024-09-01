import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler';
import { corsOptions } from '../config/cors.config';
import routes from '../utils/routes';

 const createServer = () => {
    const app: Application = express();

    // Middleware
    app.use(express.json());
    app.use(morgan('dev'));

    // Enable CORS with default settings (allow all origins)
    app.use(cors(corsOptions));

    // Routes
    routes(app);

    // Error Handling Middleware
    app.use(errorHandler);

    return app;
}

export default createServer;