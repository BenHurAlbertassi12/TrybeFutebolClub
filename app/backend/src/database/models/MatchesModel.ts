import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Matchs extends Model {}

Matchs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeam: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    modelName: 'matchs',
    underscored: true,
  },
);

Team.hasMany(Matchs, {
  foreignKey: 'homeTeam',
  as: 'homeMatchs',
});

Team.hasMany(Matchs, {
  foreignKey: 'awayTeam',
  as: 'awayMatchs',
});

Matchs.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'homeClub',
});

Matchs.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'awayClub',
});

export default Matchs;
