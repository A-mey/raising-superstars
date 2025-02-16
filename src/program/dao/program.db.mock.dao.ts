import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import { ProgramDbDaoInterface } from "../interfaces/program.db.dao.interface";
import { Program } from "../types/programs.type";

export class ProgramDbMockDao implements ProgramDbDaoInterface {
    private mockPrograms: Program[];

    constructor() {
        this.mockPrograms = [
            { id: 1, title: "Mock Program 1", frequency: "1x/day", completed: false },
            { id: 2, title: "Mock Program 2", frequency: "2 sounds/day", completed: true },
        ];
    }
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
        return this.mockPrograms;
    }

    async getCurrentDay(userId: string): Promise<number> {
        console.log(`Mock: Fetching current day for user ${userId}`);
        return 5;
    }
}
