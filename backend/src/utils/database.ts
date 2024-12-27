import { newDb } from 'pg-mem';
import { Sequelize } from 'sequelize';
import { createMockDataForDev } from '../services/mockData';

const createDatabase = () => {
  if (
    (process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging') &&
    process.env.DATABASE_URL
  ) {
    return new Sequelize(process.env.DATABASE_URL as string);
  } else {
    // On test and dev we want to use the memory database:
    const originalLog = console.log;
    console.log = () => {};
    const db = newDb();
    const sequelize = new Sequelize({
      dialect: 'postgres',
      dialectModule: db.adapters.createPg(),
    });
    console.log = originalLog;
    return sequelize;
  }
};

const sequelize = createDatabase();

(async () => {
  //Synchronize all models
  await sequelize.sync();
  // create some default data for testing in dev:
  if (process.env.NODE_ENV === 'dev') {
    createMockDataForDev();
  }
})();
export default sequelize;
