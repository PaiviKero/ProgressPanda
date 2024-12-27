import supertest from 'supertest';
import createServer from '../utils/server';
import goalService from '../services/goalService';
import { mockGoals } from '../../../testdata/mockData';
import Goal from '../models/goalModel';

const app = createServer();

describe('goal', () => {
  describe('get goal route', () => {
    describe('get indivicual goal', () => {
      describe('given the goal does not exist', () => {
        it('should return a 404', async () => {
          const goalId = -69;
          const goalPromise: Promise<Goal | null> = Promise.resolve(null);

          const createGoalServiceMock = jest
            .spyOn(goalService, 'getGoalById')
            .mockReturnValueOnce(goalPromise);

          await supertest(app).get(`/api/goals/${goalId}`).expect(404);
          expect(createGoalServiceMock).toHaveBeenCalled();
        });
      });
      describe('given the goal does exist', () => {
        it('should return a 200 and the goal object', async () => {
          const goalId = 1;
          const goal = Goal.build({
            id: 1,
            name: 'Learn Sequelize',
          });

          const goalPromise: Promise<Goal | null> = Promise.resolve(goal);

          const createGoalServiceMock = jest
            .spyOn(goalService, 'getGoalById')
            .mockReturnValueOnce(goalPromise);

          const { statusCode, body } = await supertest(app).get(
            `/api/goals/${goalId}`
          );

          expect(statusCode).toBe(200);
          expect(body).toEqual(goal.dataValues);
          expect(createGoalServiceMock).toHaveBeenCalled();
        });
      });
    });

    describe('given the goal service throws', () => {
      it('should return a 500 error', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'getGoalById')
          .mockRejectedValueOnce('Oh no! :(');

        const goalId = 1;
        const { statusCode } = await supertest(app).get(`/api/goals/${goalId}`);

        expect(statusCode).toBe(500);

        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('get all goals', () => {
    describe('given no goals exist', () => {
      it('should return a 200 and empty array', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'getAllGoals')
          // @ts-expect-error ignore type mismatch
          .mockReturnValueOnce([]);

        const { statusCode, body } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });

    describe('given some goals exist', () => {
      it('should return a 200 and goals array', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'getAllGoals')
          // @ts-expect-error ignore type mismatch
          .mockReturnValueOnce(mockGoals);

        const { statusCode, body } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockGoals);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });

    describe('given the goal service throws', () => {
      it('should return a 500 error', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'getAllGoals')
          .mockRejectedValueOnce('Oh no! :(');

        const { statusCode } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(500);

        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('add goal', () => {
    describe('given goal has no name', () => {
      it('should return a 400', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'addGoal')
          .mockImplementationOnce(() => {
            throw new Error('Missing data: name');
          });

        const { statusCode } = await supertest(app).post(`/api/goals/`).send({
          name: undefined,
        });

        expect(statusCode).toBe(400);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });
    describe('request has no body', () => {
      it('should return a 400', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'addGoal')
          .mockImplementationOnce(() => {
            throw new Error('Missing data: name');
          });

        const { statusCode } = await supertest(app).post(`/api/goals/`);

        expect(statusCode).toBe(400);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });

    describe('given goal has a name', () => {
      it('should return a 200 and the added goal', async () => {
        const goalName = 'test';
        const body = { name: goalName };

        const createGoalServiceMock = jest
          .spyOn(goalService, 'addGoal')
          // @ts-expect-error ignore type mismatch
          .mockReturnValueOnce({ id: 4, name: body.name });

        const { statusCode, body: resultBody } = await supertest(app)
          .post(`/api/goals/`)
          .send(body);

        expect(statusCode).toBe(200);
        expect(resultBody.name).toEqual(goalName);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });
    describe('given the goal service throws', () => {
      it('should return a 500 error', async () => {
        const createGoalServiceMock = jest
          .spyOn(goalService, 'addGoal')
          .mockImplementationOnce(() => {
            throw new Error('Oh no');
          });

        const goalName = 'test';
        const { statusCode } = await supertest(app)
          .post(`/api/goals/`)
          .send({ name: goalName });

        expect(statusCode).toBe(500);
        expect(createGoalServiceMock).toHaveBeenCalled();
      });
    });
  });
  describe('service', () => {
    describe('fetch all goals when no goals added', () => {
      it('should return empty array', async () => {
        const goals: Goal[] = await goalService.getAllGoals();
        expect(goals.length).toBe(0);
      });
    });
    describe('add goal with data missing', () => {
      it('should throw an error', async () => {
        await expect(goalService.addGoal('')).rejects.toThrow(
          'Missing data: name'
        );
      });
    });
    describe('add valid goal', () => {
      it('return the added goal', async () => {
        // pg-mem has an issue with using "deprecated" date formats so suppressing warnings for this:
        const warnSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});
        let addedGoal: Goal = await goalService.addGoal(mockGoals[0].name);
        expect(addedGoal.dataValues.id).toBe(mockGoals[0].id);
        expect(addedGoal.dataValues.name).toBe(mockGoals[0].name);
        addedGoal = await goalService.addGoal(mockGoals[1].name);
        expect(addedGoal.dataValues.id).toBe(mockGoals[1].id);
        expect(addedGoal.dataValues.name).toBe(mockGoals[1].name);
        addedGoal = await goalService.addGoal(mockGoals[2].name);
        expect(addedGoal.dataValues.id).toBe(mockGoals[2].id);
        expect(addedGoal.dataValues.name).toBe(mockGoals[2].name);
        // restoring warnings:
        warnSpy.mockRestore();
      });
    });
    describe('fetch non-existent goal', () => {
      it('should return null', async () => {
        const goalId = 100;
        const goal: Goal | null = await goalService.getGoalById(
          goalId.toString()
        );
        expect(goal).toBeNull();
      });
    });
    describe('fetch existing goal', () => {
      it('should return requested goal', async () => {
        const goalId = 1;
        const goal: Goal | null = await goalService.getGoalById(
          goalId.toString()
        );
        expect(goal?.dataValues.id).toBe(goalId);
        expect(goal?.dataValues.name).toBe(mockGoals[0].name);
      });
    });
    describe('fetch all goals', () => {
      it('should return the three added goals', async () => {
        const goals: Goal[] = await goalService.getAllGoals();
        expect(goals.length).toBe(3);
        expect(goals[0].dataValues.id).toBe(mockGoals[0].id);
        expect(goals[0].dataValues.name).toBe(mockGoals[0].name);
        expect(goals[1].dataValues.id).toBe(mockGoals[1].id);
        expect(goals[1].dataValues.name).toBe(mockGoals[1].name);
        expect(goals[2].dataValues.id).toBe(mockGoals[2].id);
        expect(goals[2].dataValues.name).toBe(mockGoals[2].name);
      });
    });
  });
});
