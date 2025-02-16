import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';

class Program extends Model {
  public id!: number;
  public name!: string | null;
  public description!: string | null;
  public start_day!: number;
  public end_day!: number;
}

Program.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Program',
    tableName: 'programs',
    timestamps: false,
  }
);

export default Program;
