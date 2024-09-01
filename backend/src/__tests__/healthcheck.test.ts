import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("healthcheck route", () => {
    describe("given the healthcheck works", () => {
        it("should return a 200", async () => {
            await supertest(app).get(`/healthcheck`).expect(200);
        });
    });
});