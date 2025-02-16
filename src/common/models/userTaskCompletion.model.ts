import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';


class UserTaskCompletion extends Model {
  public id!: number;
  public user_id!: number;
  public program_id!: number;
  public day_number!: number;
  public activity_id!: number;
  public completed!: boolean;
  public completed_at!: Date | null;
}

UserTaskCompletion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programs',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    day_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activities',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserTaskCompletion',
    tableName: 'user_task_completion',
    timestamps: true,
  }
);

export default UserTaskCompletion;
