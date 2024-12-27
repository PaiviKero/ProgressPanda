import Goal from '../models/goalModel';

export interface MockGoal {
  id: number;
  name: string;
}

export const mockGoals: MockGoal[] = [
  { id: 1, name: 'Learn Angular' },
  { id: 2, name: 'Build an app' },
  { id: 3, name: 'Practice testing' },
];

export const newMockGoal: MockGoal = {
  id: 4,
  name: 'New Test Goal',
};

export const createMockDataForDev = () => {
  Goal.bulkCreate(mockGoals.map((goal) => ({ name: goal.name })));
};
