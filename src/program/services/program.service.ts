import { constants } from "../../common/constants/constants";
import { Catch } from "../../common/helper/catch.helper"
import { ProgramCacheDao } from "../dao/program.cache.dao";
import { ProgramDbDao } from "../dao/program.db.dao";
import { currentDay } from "../types/currentDay.type";
import { Day } from "../types/day.type";
import { ProgramResponse } from "../types/programResponse.type";
import { Program } from "../types/programs.type";

export class ProgramService {
    private programDbDao: ProgramDbDao;
    programCacheDao: ProgramCacheDao;
    
    constructor(programDbDao: ProgramDbDao, programCacheDao: ProgramCacheDao) {
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

    private getPrograms = async (day: number, currentDay: number, userId: string): Program [] => {
        try {
            let program: Program [] = [];
            if (currentDay === day) {
                program = await this.programDbDao.GetProgramsFromDatabase(userId, day);
            } else {
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

    private prepareDayResponse = async (userId: string, dayInString?: string): Promise<currentDay> => {
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

            if (day !== currentDay) {
                if (day !== 1) {
                    prevDay = true
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
}