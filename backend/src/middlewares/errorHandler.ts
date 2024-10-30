import { Request, Response, NextFunction } from 'express';

/* eslint  @typescript-eslint/no-unused-vars: [1, { vars: 'all', 'argsIgnorePattern': 'next' } ] */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message.startsWith('Missing data')) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: err.message || 'Internal Server Error',
    });
  }
};

export default errorHandler;
