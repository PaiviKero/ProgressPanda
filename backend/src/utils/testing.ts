import Goal from '../models/goalModel';
import { mockGoals } from '../services/mockData';

export const createMockDataForDev = () => {
  Goal.bulkCreate(mockGoals.map((goal) => ({ name: goal.name })));
};
