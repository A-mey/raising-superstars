import { Sequelize } from "sequelize";
import { Catch } from "../../common/helper/catch.helper"
import Activity from "../../common/models/activity.model";
import Schedule from "../../common/models/schedule.model";
import UserTaskCompletion from "../../common/models/userTaskCompletion.model";
import User from "../../common/models/users.model";
import { Program } from "../types/programs.type";

export class ProgramDbDao {
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
            const day = userData?.current_day || 1;
            return day;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}