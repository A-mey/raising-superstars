import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize/sequelize.config';
import { UserType } from '../../program/types/user.type';

class User extends Model<UserType> implements UserType {
  public id!: number;
  public name!: string;
  public phone!: string;
  public created_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
