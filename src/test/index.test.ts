import assert from 'assert';
import { describe, it, before, beforeEach, mock } from 'node:test';
import { ProgramService } from '../program/services/program.service';
import { ProgramContainer } from '../program/containers/program.container';


describe('ProgramService', () => {

    let programService: ProgramService;
    before(() => {
        programService = new ProgramContainer().getMockService();
    });

    it ('get proper days', async () => {
        // programService.getProgramService();
    });
});