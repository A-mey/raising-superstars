import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import { Program } from "../types/programs.type";

export interface ProgramDbDaoInterface {
    GetProgramsFromDatabase(userId: number, day: number): Promise<Program[]>;
    getCurrentDay(userId: number): Promise<number>;
    getProgramDay (activityId: number): Promise<number>
    addToUserTaskCompletion(userId: number, programId: number, day: number): Promise<void>;
    getExistingUserTaskCompletionRecord(userId: number, programId: number, day: number): Promise<UserTaskCompletion | null>
}
