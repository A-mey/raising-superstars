import assert from 'assert';
import { describe, it, beforeEach, mock } from 'node:test';
import { ProgramService } from '../program/services/program.service';
import { ProgramContainer } from '../program/containers/program.container';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Request, Response, NextFunction } from "express";
import { AuthenticationContainer } from '../authentication/container/authentication.container';
import { AuthenticationMiddleware } from '../authentication/middleware/authentication.middleware';
import { AuthenticationMockService } from '../authentication/services/authentication.mock.service';
import { AuthenticationDbDao } from '../authentication/dao/authentication.db.dao';
import { ResponseHelper } from '../common/helper/response.helper';
import { responseErrorMessage } from '../common/helper/response.error.helper';

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

        // console.log("statusMock", statusMock.mock.calls[0].arguments[0]);
        // console.log("jsonMock", jsonMock.mock.calls[0].arguments[0]);
        // console.log("jsonMock", nextMock.mock.calls);

        assert.strictEqual(statusMock.mock.calls[0].arguments[0], 400);
        assert.deepStrictEqual(jsonMock.mock.calls[0][0], ResponseHelper(false, "Token missing")); 
        assert.strictEqual(nextMock.mock.calls.length, 0);
    });

    it("should return 400 if token is invalid", async () => {
        req.headers = { authorization: "Bearer invalidToken" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        assert.strictEqual(statusMock.mock.calls[0].arguments[0], 400);
        assert.deepStrictEqual(jsonMock.mock.calls[0][0], ResponseHelper(false, "Invalid token")); 
        assert.strictEqual(nextMock.mock.calls.length, 0);
    });

    it("should return 500 if authentication fails", async () => {
        req.headers = { authorization: "Bearer ABCDEF" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        const errorMessage = responseErrorMessage("404, authentication error");

        assert.strictEqual(statusMock.mock.calls[0].arguments[0], errorMessage.status);
        assert.deepStrictEqual(jsonMock.mock.calls[0][0], errorMessage.errorMessage); 
        assert.strictEqual(nextMock.mock.calls.length, 0);

    });

    it("should call next() if token is valid", async () => {
        req.headers = { authorization: "Bearer PQRST" };
        await authenticationMiddleware.authorizeToken(req as Request, res as Response, next);

        const statusMock = res.status as any;

        // const jsonMock = res.json as unknown as { mock: { calls: any[][] } };
        const jsonMock = res.json as any;
        // const nextMock = next as unknown as { mock: { calls: any[][] } };
        const nextMock = next as any;

        assert.strictEqual(res.locals!.userId, "456");
        assert.strictEqual(nextMock.mock.calls.length, 1);
        assert.strictEqual(statusMock.mock.calls.length, 0);
    });
});
