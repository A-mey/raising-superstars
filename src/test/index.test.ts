import assert from 'assert';
import { describe, it, before, beforeEach, mock } from 'node:test';
import { ProgramService } from '../program/services/program.service';
import { ProgramContainer } from '../program/containers/program.container';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Request, Response, NextFunction } from "express";
import { AuthenticationContainer } from '../authentication/container/authentication.container';

describe('ProgramService', () => {

    let programService: ProgramService;
    before(() => {
        programService = new ProgramContainer().getMockService();
    });

    it ('get proper days', async () => {
        // programService.getProgramService();
    });
});

describe('Authentication', () => {

    let AuthenticationMiddleware: AuthenticationContainer;
    before(() => {
        authentication = new AuthenticationContainer().getMiddleware();
    });

    it ('get proper days', async () => {
        // programService.getProgramService();
    });
});