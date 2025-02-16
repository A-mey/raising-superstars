import express from "express";
import { Catch } from "../../common/helper/catch.helper"
import { ProgramService } from "../services/program.service";
import { ProgramResponse } from "../types/programResponse.type";
import { ResponseHelper } from "../../common/helper/response.helper";

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
            const errorMessage = Catch(error);
            const response = ResponseHelper(false, errorMessage);
            res.status(500).json(response)
        }
    }
}