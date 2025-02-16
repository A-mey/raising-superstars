import { constants } from "../../common/constants/constants";
import { Catch } from "../../common/helper/catch.helper"
import { ProgramDbDao } from "../dao/program.db.dao";
import { Day } from "../types/day.type";
import { ProgramResponse } from "../types/programResponse.type";
import { Program } from "../types/programs.type";

export class ProgramService {
    private programDbDao: ProgramDbDao;
    
    constructor(programDbDao: ProgramDbDao) {
        this.programDbDao = programDbDao;
    }

    getProgramService = async (userId: string, dayInString?: string): Promise<ProgramResponse> => {
        try {
            // We are not expecting the frontend to send the days at all time (for example, if the app has a pattern to send the current day schedule, we will entrust the taks to find the current day on the API itself)
            // const day = dayInString? parseInt(dayInString) : await this.getDay(userId);
            const dayResponse: Day = await this.prepareDayResponse(userId, dayInString);

            const programs = await this.programDbDao.GetProgramsFromDatabase(userId, dayResponse.day);

            const remainingProgramsMessage = this.getRemainingProgramsMessage(programs);

            return { dayResponse, programs, remainingProgramsMessage };
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

    private prepareDayResponse = async (userId: string, dayInString?: string): Promise<Day> => {
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
            return {day, prevDay, nextDay};
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