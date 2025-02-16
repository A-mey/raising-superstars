import { Day } from "./day.type"
import { Program } from "./programs.type"

export type ProgramResponse = {
    dayResponse: Day,
    programs: Program[],
    remainingProgramsMessage: string
}