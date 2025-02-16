import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';

class Schedule extends Model {
  public id!: number;
  public program_id!: number;
  public day_number!: number;
  public activity_id!: number;
  public activity_order!: number;
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    activity_order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedule',
    timestamps: true,
  }
);

export default Schedule;
