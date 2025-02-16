import express from "express";
import { ProgramService } from "../services/program.service";
import { ProgramResponse } from "../types/programResponse.type";
import { ResponseHelper } from "../../common/helper/response.helper";
import { responseErrorMessage } from "../../common/helper/response.error.helper";

export class ProgramController {
    private programService: ProgramService;

    constructor (programService: ProgramService) {
        this.programService = programService;
    }

    getPrograms = async (req: express.Request, res: express.Response) => {
        try {
            const userId = res.locals.userId;
            const day = req.params.day;
            const programsData: ProgramResponse = await this.programService.getProgramService(userId, day);
            const response = ResponseHelper(true, "Program data", programsData);
            res.status(200).json(response);
        } catch (error) {
            const errorMessage = responseErrorMessage(error as string);
            res.status(errorMessage.status).json(errorMessage.errorMessage);
        }
    }

    updateProgramCompletion = async (req: express.Request, res: express.Response) => {
        try {
            const userId = res.locals.userId;
            const id = req.body.id;
            const day = res.locals.day
            await this.programService.updateProgramAsCompleted(userId, id, day);
        } catch (error) {
            const errorMessage = responseErrorMessage(error as string);
            res.status(errorMessage.status).json(errorMessage.errorMessage);
        }
    }
}