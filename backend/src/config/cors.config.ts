import  { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:4200', 'http://localhost:8080', 'https://progresspanda.onrender.com/'];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200 // Some browsers (IE) choke on 204
};