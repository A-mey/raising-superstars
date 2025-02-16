import express, { NextFunction } from "express";
import { responseErrorMessage } from "../../common/helper/response.error.helper";
import { ProgramService } from "../services/program.service";

export class ProgramMiddleware {
    private programService: ProgramService;

    constructor(programService: ProgramService) {
        this.programService = programService
    }

    verifyProgramId = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const programId = req.body.id;
            if (!programId) {
                res.json(400).json({success: false, message: "id not found"});
                return;
            }
            const userId = res.locals.userId;
            const dayOfProgram = this.programService.verifyProgramAndGetCurrentDay(userId, programId);
            res.locals.day = dayOfProgram;
            next();
        } catch (error) {
            const errorMessage = responseErrorMessage(error as string);
            res.status(errorMessage.status).json(errorMessage.errorMessage);
        }
    }
}