import { Request, Response, NextFunction } from 'express';
import goalService from '../services/goalService';

const getAllGoals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goals = await goalService.getAllGoals();
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

const getGoalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goal = await goalService.getGoalById(req.params.id);
    if (goal) {
      return res.status(404).json({ message: 'goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

export default { getAllGoals, getGoalById };
