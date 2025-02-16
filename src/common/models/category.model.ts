import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';

export class Category extends Model {
    public id!: number;
    public title!: string;
    public description!: string | null;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true,
  }
);

export default Category;