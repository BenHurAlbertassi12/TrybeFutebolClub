import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

interface IMatch {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

class MatchesModel extends Model implements IMatch {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;

  static associate() {
    TeamModel.hasMany(MatchesModel, {
      foreignKey: 'homeTeam',
      as: 'homeTeamHasMany',
    });
    TeamModel.hasMany(MatchesModel, {
      foreignKey: 'awayTeam',
      as: 'awayTeamHasMany',
    });

    MatchesModel.belongsTo(TeamModel, {
      foreignKey: 'homeTeam',
      as: 'teamHome',
    });
    MatchesModel.belongsTo(TeamModel, {
      foreignKey: 'awayTeam',
      as: 'teamAway',
    });
  }
}

MatchesModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

export default MatchesModel;
