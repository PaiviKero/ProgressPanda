import sequelize from '../utils/database';
import { DataTypes, Model } from 'sequelize';

class Goal extends Model {}

Goal.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Goal',
  }
);

export default Goal;
