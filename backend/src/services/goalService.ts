import { mockGoals } from './mockData';

export interface Goal {
  id: number;
  name: string;
}

const goals: Goal[] = mockGoals;

const getAllGoals = async (): Promise<Goal[]> => {
  return goals;
};

const getGoalById = async (id: string): Promise<Goal | undefined> => {
  return goals.find((goal) => goal.id === parseInt(id));
};

const addGoal = async (name: string): Promise<Goal> => {
  let newGoal: Goal;
  if (name) {
    const maxId = Math.max(...goals.map((goal) => goal.id));
    newGoal = { id: maxId + 1, name };
    goals.push(newGoal);
    return newGoal;
  }
  throw new Error('Missing data: name');
};

export default { getAllGoals, getGoalById, addGoal };
