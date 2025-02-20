import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import { ProgramDbDaoInterface } from "../interfaces/program.db.dao.interface";
import { Program } from "../types/programs.type";

export class ProgramDbMockDao implements ProgramDbDaoInterface {
    // private mockPrograms: Program[];

    constructor() { }
    getExistingUserTaskCompletionRecord(userId: string, programId: number, day: number): Promise<UserTaskCompletion | null> {
        throw new Error("Method not implemented.");
    }
    addToUserTaskCompletion(userId: string, programId: number, day: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getProgramDay(activityId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async GetProgramsFromDatabase(userId: string, day: number): Promise<Program[]> {
        console.log(`Mock: Fetching programs for user ${userId} on day ${day}`);
        throw new Error();
    }

    async getCurrentDay(userId: string): Promise<number> {
        if (userId === '1') return Promise.resolve(5);
        if (userId === '2') return Promise.resolve(1);
        return Promise.resolve(15)
    }
}
