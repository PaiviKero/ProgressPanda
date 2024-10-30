import supertest from 'supertest';
import createServer from '../utils/server';
import goalService from '../services/goalService';
import { mockGoals } from '../services/mockData';

const app = createServer();

describe('goal', () => {
  describe('get goal route', () => {
    describe('get indivicual goal', () => {
      describe('given the goal does not exist', () => {
        it('should return a 404', async () => {
          const goalId = "this surely doesn't exist";
          const createGoalServiceMock = jest
            .spyOn(goalService, 'getGoalById')
            // @ts-expect-error ignore type mismatch
            .mockReturnValueOnce(mockGoals.find((goal) => goal.id === goalId));

          await supertest(app).get(`/api/goals/${goalId}`).expect(404);
          expect(createGoalServiceMock).toHaveBeenCalled();
        });
      });
      describe('given the goal does exist', () => {
        it('should return a 200 and the goal object', async () => {
          const goalId = 1;
          const goal = mockGoals.find((goal) => goal.id === goalId);

          const createGoalServiceMock = jest
            .spyOn(goalService, 'getGoalById')
            // @ts-expect-error ignore type mismatch
            .mockReturnValueOnce(goal);

          const { statusCode, body } = await supertest(app).get(
            `/api/goals/${goalId}`
          );

          expect(statusCode).toBe(200);
          expect(body).toEqual(goal);
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
});
