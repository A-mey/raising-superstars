import { constants } from "../../common/constants/constants";
import { Catch } from "../../common/helper/catch.helper"
import { ProgramCacheDao } from "../dao/program.cache.dao";
import { ProgramDbDao } from "../dao/program.db.dao";
import { ProgramCacheDaoInterface } from "../interfaces/program.cache.dao.interface";
import { ProgramDbDaoInterface } from "../interfaces/program.db.dao.interface";
import { currentDay } from "../types/currentDay.type";
import { Day } from "../types/day.type";
import { ProgramResponse } from "../types/programResponse.type";
import { Program } from "../types/programs.type";

export class ProgramService {
    private programDbDao: ProgramDbDao;
    private programCacheDao: ProgramCacheDao;
    
    constructor(programDbDao: ProgramDbDaoInterface, programCacheDao: ProgramCacheDaoInterface) {
        this.programDbDao = programDbDao;
        this.programCacheDao = programCacheDao;
    }

    getProgramService = async (userId: string, dayInString?: string): Promise<ProgramResponse> => {
        try {
            // We are not expecting the frontend to send the days at all time (for example, if the app has a pattern to send the current day schedule, we will entrust the taks to find the current day on the API itself)
            // const day = dayInString? parseInt(dayInString) : await this.getDay(userId);
            const dayResponse: currentDay = await this.prepareDayResponse(userId, dayInString);

            const programs = await this.getPrograms(dayResponse.day, dayResponse.currentDay, userId);

            const remainingProgramsMessage = this.getRemainingProgramsMessage(programs);

            return { dayResponse, programs, remainingProgramsMessage };
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private getPrograms = async (day: number, currentDay: number, userId: string): Promise<Program[]> => {
        try {
            let program: Program [] = [];
            if (currentDay === day) {
                program = await this.programDbDao.GetProgramsFromDatabase(userId, day);
                await this.programCacheDao.storeProgramsInCache(userId, day, program);
            } else {
                // We're assuming that user shouldn't be able to modify data of past days
                program = await this.programCacheDao.getProgramsFromCache(userId, day);
            }
            return program;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private getRemainingProgramsMessage = (programs: Program []): string => {
        try {
            const incompletePrograms = (programs.filter(x => x.completed === false)).length;
            const message = this.prepareRemainingProgramsMessage(incompletePrograms);
            return message;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private prepareRemainingProgramsMessage = (incompletePrograms: number): string => {
        try {
            let message = constants.get("programMessage");
            if (!message) {
                return incompletePrograms.toString();
            }
            message = message.replace("", incompletePrograms.toString());
            return message;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    prepareDayResponse = async (userId: string, dayInString?: string): Promise<currentDay> => {
        try {
            let day: number;
            let nextDay = false;
            let prevDay = false;
            const currentDay = await this.getDay(userId);
            if (!dayInString) {
                day = currentDay;
            } else {
                day = Number(dayInString);
            }

            if (day > currentDay) {
                throw new Error("500, Cannot fetch data for this day")
            }

            if (currentDay !== 1) {
                prevDay = true;
                if (day < currentDay) {
                    nextDay = true
                }
            }

            return {day, currentDay, prevDay, nextDay};
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private getDay = async (userId: string) => {
        try {
            return await this.programDbDao.getCurrentDay(userId);
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    updateProgramAsCompleted = async (userId: string, programId: number, day: number) => {
        try {
            await this.programDbDao.addToUserTaskCompletion(userId, programId, day)
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    verifyProgramAndGetCurrentDay = async (userId: string, programId: number) => {
        try {
            const dayOfProgram = await this.verifyWhetherProgramIsOnTheSameDate(userId, programId);
            const doesProgramAlreadyExistAsCompleted = await this.doesActivityAlreadyExistAsCompleted(userId, programId, dayOfProgram);
            if (doesProgramAlreadyExistAsCompleted) {
                throw new Error("403, cannot modify");
            }
            return dayOfProgram;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private verifyWhetherProgramIsOnTheSameDate = async (userId: string, programId: number) => {
        try {
            const dayOfProgram = await this.programDbDao.getProgramDay(programId);
            const dayOfUser = await this.getDay(userId);
            if (dayOfProgram !== dayOfUser) {
                throw new Error("401, Not allowed to modify")
            }
            return dayOfProgram;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    private doesActivityAlreadyExistAsCompleted = async (userId: string, programId: number, dayOfProgram: number) => {
        try {
            const existingRecord = await this.programDbDao.getExistingUserTaskCompletionRecord(userId, programId, dayOfProgram);
            return existingRecord;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}