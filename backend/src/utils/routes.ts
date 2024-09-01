import { Application, Request, Response } from "express";

import goalRoutes from '../routes/goalRoutes';

const routes = (app: Application) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.use('/api/goals', goalRoutes);
}

export default routes;