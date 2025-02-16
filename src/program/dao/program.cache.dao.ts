import { Catch } from "../../common/helper/catch.helper"
import { Program } from "../types/programs.type";

export class ProgramCacheDao {
    constructor () {}

    getProgramsFromCache = async (userId: string, day: number) : Promise<Program []> => {
        try {

        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    storeProgramsInCache = async (userId: string, day: string, programs: Program []) => {
        try {

        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}