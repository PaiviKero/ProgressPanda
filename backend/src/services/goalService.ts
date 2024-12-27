import Goal from '../models/goalModel';

const getAllGoals = async (): Promise<Goal[]> => {
  return await Goal.findAll();
};

const getGoalById = async (id: string): Promise<Goal | null> => {
  return await Goal.findByPk(parseInt(id));
};

const addGoal = async (name: string): Promise<Goal> => {
  if (name) {
    const newGoal = await Goal.create({
      name,
    });
    return newGoal;
  }
  throw new Error('Missing data: name');
};

export default { getAllGoals, getGoalById, addGoal };
