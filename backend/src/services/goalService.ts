import { mockGoals } from "./mockData";

export interface Goal {
  id: number;
  name: string;
}

const goals: Goal[] = mockGoals;

const getAllGoals = async (): Promise<Goal[]> => {
  return goals;
};

const getGoalById = async (id: string): Promise<Goal | undefined> => {
  return goals.find(goal => goal.id === parseInt(id));
};

export default { getAllGoals, getGoalById };
  