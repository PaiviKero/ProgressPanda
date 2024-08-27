interface Goal {
    id: number;
    name: string;
  }
  
  const goals: Goal[] = [
    { id: 1, name: 'My first goal' },
    { id: 2, name: 'My second goal' },
  ];
  
  const getAllGoals = async (): Promise<Goal[]> => {
    return goals;
  };
  
  const getGoalById = async (id: string): Promise<Goal | undefined> => {
    return goals.find(goal => goal.id === parseInt(id));
  };
  
  export default { getAllGoals, getGoalById };
  