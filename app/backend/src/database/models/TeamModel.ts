import { Model, DataTypes } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  public id!: number;
  public teamName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    timestamps: true,
    modelName: 'Team',
  },
);

export default TeamModel;
