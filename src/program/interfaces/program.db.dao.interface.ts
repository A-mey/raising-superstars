import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import { Program } from "../types/programs.type";

export interface ProgramDbDaoInterface {
    GetProgramsFromDatabase(userId: string, day: number): Promise<Program[]>;
    getCurrentDay(userId: string): Promise<number>;
    getProgramDay (activityId: number): Promise<number>
    addToUserTaskCompletion(userId: string, programId: number, day: number): Promise<void>;
    getExistingUserTaskCompletionRecord(userId: string, programId: number, day: number): Promise<UserTaskCompletion | null>
}
