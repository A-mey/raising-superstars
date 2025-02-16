import { Sequelize } from "sequelize";
import { Catch } from "../../common/helper/catch.helper"
import Activity from "../../common/models/activity.model";
import Schedule from "../../common/models/schedule.model";
import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import User from "../../common/models/users.model";
import { Program } from "../types/programs.type";
import { ProgramDbDaoInterface } from "../interfaces/program.db.dao.interface";

export class ProgramDbDao implements ProgramDbDaoInterface {
    constructor () {

    }

    GetProgramsFromDatabase = async (userId: string, day: number): Promise<Program []> => {
        try {
            const programs = await Schedule.findAll({
                where: { day_number: day },
                attributes: [
                    [Sequelize.col('activity.id'), 'id'],
                    [Sequelize.col('activity.title'), 'title'],
                    [Sequelize.col('activity.frequency'), 'frequency'],
                    [Sequelize.literal('COALESCE(completion.completed, FALSE)'), 'completed'],
                ],
                include: [{
                        model: Activity,
                        as: 'activity',
                        attributes: [],
                    },
                    {
                        model: UserTaskCompletion,
                        as: 'completion',
                        attributes: [],
                        required: false,
                        where: { user_id: userId },
                    },
                ],
                order: [['activity_order', 'ASC']],
                raw: true,
            }) as any as Program [];
            return programs;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    getCurrentDay = async (userId: string): Promise<number> => {
        try {
            const userData = await User.findOne({
                where: {id: userId},
                attributes: [
                    [
                        Sequelize.literal('EXTRACT(DAY FROM (CURRENT_DATE - created_at)) + 1'),
                        'current_day',
                    ],
                ],
                raw: true,
            }) as any as { current_day: number };
            const day = (userData?.current_day + 1) || 1;
            return day;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    getProgramDay = async (activityId: number) => {
        try {
            const schedule = await Schedule.findOne({
                where: { activity_id: activityId },
                attributes: ["day_number"],
                raw: true,
            });

            if (!schedule) {
                throw new Error("Something went wrong");
            }

            const day = schedule.day_number;
            return day;   
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    getExistingUserTaskCompletionRecord = async (userId: string, activityId: number, day: number): Promise<UserTaskCompletion | null> => {
        try {
            const existingRecord = await UserTaskCompletion.findOne({
                where: {
                    user_id: userId,
                    day_number: day,
                    activity_id: activityId,
                    completed: true
                },
            });
            return existingRecord;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    addToUserTaskCompletion = async (userId: string, activityId: number, dayNumber: number) => {
        try {
            await UserTaskCompletion.create({
                user_id: userId,
                day_number: dayNumber,
                activity_id: activityId,
                completed: true,
                completed_at: new Date(),
            });
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}