import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  readonly id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      field: 'team_name',
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Team',
    tableName: 'teams',
    timestamps: false,
  },
);

export default Team;
