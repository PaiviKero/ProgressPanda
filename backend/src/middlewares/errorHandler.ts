import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
