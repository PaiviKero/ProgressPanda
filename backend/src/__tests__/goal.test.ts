import supertest from "supertest";
import createServer from "../utils/server";
import goalService from "../services/goalService";
import { mockGoals } from "../services/mockData";

const app = createServer();

describe("goal", () => {
    
  describe("get goal route", () => {

  describe("get indivicual goal", () => {
    describe("given the goal does not exist", () => {
        it("should return a 404", async () => {
          const goalId = "this surely doesn't exist";
        
          await supertest(app).get(`/api/goals/${goalId}`).expect(404);
        });
      });
      describe("given the goal does exist", () => {
          it("should return a 200 and the goal object", async () => {

            const goalId = 1;
            const goal = mockGoals.find((goal) => goal.id === goalId);

            const creatGoalServiceMock = jest
            .spyOn(goalService, "getGoalById")
            // @ts-expect-error ignore type mismatch
            .mockReturnValueOnce(goal);

          
            const { statusCode, body } = await supertest(app).get(`/api/goals/${goalId}`);

            expect(statusCode).toBe(200);
            expect(body).toEqual(goal);   
            expect(creatGoalServiceMock).toHaveBeenCalled();
          });
        });
    });
    
    describe("given the goal service throws", () => {
      it("should return a 500 error", async () => {
        const createUserServiceMock = jest
          .spyOn(goalService, "getGoalById")
          .mockRejectedValueOnce("Oh no! :(");

        const goalId = 1;
        const { statusCode } = await supertest(app).get(`/api/goals/${goalId}`);

        expect(statusCode).toBe(500);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });  
    
  describe("get all goals", () => {
    describe("given no goals exist", () => {
      it("should return a 200 and empty array", async () => {

        const creatGoalServiceMock = jest
        .spyOn(goalService, "getAllGoals")
        // @ts-expect-error ignore type mismatch
        .mockReturnValueOnce([]);

      
        const { statusCode, body } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);   
        expect(creatGoalServiceMock).toHaveBeenCalled();
      });
    });

    describe("given some goals exist", () => {
      it("should return a 200 and goals array", async () => {
        const creatGoalServiceMock = jest
        .spyOn(goalService, "getAllGoals")
        // @ts-expect-error ignore type mismatch
        .mockReturnValueOnce(mockGoals);

        const { statusCode, body } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockGoals);   
        expect(creatGoalServiceMock).toHaveBeenCalled();
      });
    });

    describe("given the goal service throws", () => {
      it("should return a 500 error", async () => {
        const createUserServiceMock = jest
          .spyOn(goalService, "getAllGoals")
          .mockRejectedValueOnce("Oh no! :(");

        const { statusCode } = await supertest(app).get(`/api/goals`);

        expect(statusCode).toBe(500);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });
});