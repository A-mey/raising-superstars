import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';
import { frequency } from '../../program/types/frequency.type';

class Activity extends Model {
  public id!: number;
  public program_id!: number;
  public title!: string;
  public description!: string | null;
  public frequency!: frequency;
  public time!: "MAX" | "30 sec" | "60 sec";
}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    frequency: {
        type: DataTypes.ENUM("Maximize", "2x/day", "1x/day", "2 sounds/day", "3x/week", "2x/week")
    },
    time: {
      type: DataTypes.ENUM("MAX", "30 sec", "60 sec"),
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: false,
  }
);

export default Activity;
