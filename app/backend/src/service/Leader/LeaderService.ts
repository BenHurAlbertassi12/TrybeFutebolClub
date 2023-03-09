import { ModelStatic } from 'sequelize';

import Matche from '../../database/models/MatchesModel';
import Team from '../../database/models/TeamModel';
import {
  // ILeaderboard,
  IResponse,
} from './LeaderInterface';

import {
  calculateRank,
  createResponse,
  createResultsMatch,
  tabela,
} from './TeamObject';

const listTeam = ['homeTeamGoals', 'awayTeamGoals'];

export default class LeaderService {
  private matche: ModelStatic<Matche> = Matche;
  private team: ModelStatic<Team> = Team;
  // private resileader: ILeaderboard[] = [];
  private async getTeamsAndMatches() {
    const findTeams = await this.team.findAll();
    const findMatche = await this.matche.findAll({
      where: { inProgress: false },
    });
    return { findTeams, findMatche };
  }

  async ranked(): Promise<IResponse> {
    const { findTeams, findMatche } = await this.getTeamsAndMatches();
    const leaderMap = findTeams.map((elementEach) => {
      const matchesByTeam = findMatche.filter(
        (elementFilter) => elementFilter.homeTeamId === elementEach.id,
      );
      const results = createResultsMatch(matchesByTeam, listTeam);
      return calculateRank(elementEach, results, matchesByTeam, listTeam);
    });

    return createResponse(200, tabela(leaderMap));
  }
}
/*
this.resileader = [];
  for (const elementEach of findTeams) {
    const matchesByTeam = findMatche.filter(
      elementFilter => elementFilter.homeTeamId === elementEach.id
    );
    const results = createResultsMatch(matchesByTeam, listTeam);
    this.resileader.push(rank(elementEach, results, matchesByTeam, listTeam));
  }
*/
