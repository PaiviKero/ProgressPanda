import Goal from '../models/goalModel';
import { mockGoals } from '../../../testdata/mockData';

export const createMockDataForDev = () => {
  Goal.bulkCreate(mockGoals.map((goal) => ({ name: goal.name })));
};
