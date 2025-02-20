import assert from 'assert';
import { describe, it, before, beforeEach, mock } from 'node:test';
import { ProgramService } from '../program/services/program.service';
import { Request, Response, NextFunction } from "express";
import { AuthenticationMiddleware } from '../authentication/middleware/authentication.middleware';
import { AuthenticationMockService } from '../authentication/services/authentication.mock.service';
import { AuthenticationDbDao } from '../authentication/dao/authentication.db.dao';
import { ResponseHelper } from '../common/helper/response.helper';
import { ProgramDbMockDao } from '../program/dao/program.db.mock.dao';
import { ProgramCacheMockDao } from '../program/dao/program.cache.mock.dao';

describe('Authentication', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let authenticationMiddleware: AuthenticationMiddleware;

    beforeEach(() => {
        authenticationMiddleware = new AuthenticationMiddleware(new AuthenticationMockService(new AuthenticationDbDao()));

        req = { headers: {} };
        res = {
            status: mock.fn(() => res) as unknown as (code: number) => Response<any, Record<string, any>>,
            json: mock.fn() as unknown as (body?: any) => Response<any, Record<string, any>>,
            locals: {},
        } as Partial<Response>;
        next = mock.fn();
    });

    it("should return 400 if no token is provided", async () => {
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        // const statusMock = res.status as unknown as { mock: { calls: any[][] } };
        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        const status = statusMock.mock.calls[0].arguments[0];
        const json = jsonMock.mock.calls[0].arguments[0];
        const nextCall = nextMock.mock.calls.length;
        assert.strictEqual(status, 400);
        assert.deepStrictEqual(json, ResponseHelper(false, "Token missing")); 
        assert.strictEqual(nextCall, 0);
    });

    it("should return 401 if token is invalid", async () => {
        req.headers = { authorization: "Bearer invalidToken" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        const status = statusMock.mock.calls[0].arguments[0];
        const json = jsonMock.mock.calls[0].arguments[0];
        const nextCall = nextMock.mock.calls.length;

        assert.strictEqual(status, 401);
        assert.deepStrictEqual(json, ResponseHelper(false, "authentication error")); 
        assert.strictEqual(nextCall, 0);
    });

    it("should return 404 if no user exists", async () => {
        req.headers = { authorization: "Bearer ABCDEF" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        const status = statusMock.mock.calls[0].arguments[0];
        const json = jsonMock.mock.calls[0].arguments[0];
        const nextCall = nextMock.mock.calls.length;

        assert.strictEqual(status, 404);
        assert.deepStrictEqual(json, {
            success: false,
            message: "authentication error",
          }); 
        assert.strictEqual(nextCall, 0);

    });

    it("should call next() if token is valid", async () => {
        req.headers = { authorization: "Bearer PQRST" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        // const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        const statusLength = statusMock.mock.calls.length;
        const nextCall = nextMock.mock.calls.length;

        assert.strictEqual(res.locals!.userId, "456");
        assert.strictEqual(nextCall, 1);
        assert.strictEqual(statusLength, 0);
    });
});

describe('ProgramService', () => {

    let programService: ProgramService;
    programService = new ProgramService(new ProgramDbMockDao, new ProgramCacheMockDao);

    before(() => async () => {
        // programService = new ProgramService(new ProgramDbMockDao, new ProgramCacheMockDao);
    })
    
    it('prepareDayResponse should return correct values when a different day is passed', async () => {
        const result = await programService.prepareDayResponse(1, '3');
        assert.deepStrictEqual(result, {
            day: 3,
            currentDay: 5,
            prevDay: true,
            nextDay: true
        });
    });

    it('give nextDay false for final day', async () => {
        const result = await programService.prepareDayResponse(1, '5');
        assert.deepStrictEqual(result, {
            day: 5,
            currentDay: 5,
            prevDay: true,
            nextDay: false
        });
    });

    it('give prevDay false for first day', async () => {
        const result = await programService.prepareDayResponse(2);
        assert.deepStrictEqual(result, {
            day: 1,
            currentDay: 1,
            prevDay: false,
            nextDay: false
        });
    })
})
