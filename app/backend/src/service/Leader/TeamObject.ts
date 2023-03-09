import { ILeaderboard } from './LeaderInterface';
import Matche from '../../database/models/MatchesModel';
import Team from '../../database/models/TeamModel';

const countLength = (string: string, array: string[]) => {
  const filteredArr = array.filter((elementFilter) => elementFilter === string);
  return filteredArr.length;
};

//-------------------------------

const createResultsMatch = (matches: Matche[], time: string[]) => {
  const [teamGols1, teamGols2] = time as [
    'awayTeamGoals' | 'homeTeamGoals',
    'awayTeamGoals' | 'homeTeamGoals',
  ];
  return matches.map(({ [teamGols1]: gols1, [teamGols2]: gols2 }) => {
    if (gols1 > gols2) return 'win';
    if (gols1 < gols2) return 'lost';
    return 'draw';
  });
};

// -------------------------------

const calculateRank = (teamInt: Team, results: string[], matche: Matche[], time: string[]) => {
  const [teamGols1, teamGols] = time as
      ['awayTeamGoals' | 'homeTeamGoals', 'awayTeamGoals' | 'homeTeamGoals'];

  const goalsFavor = matche.reduce((valor1, valor3) => valor1 + valor3[teamGols1], 0);
  const goalsOwn = matche.reduce((valor1, valor3) => valor1 + valor3[teamGols], 0);

  const totalPoints = countLength('win', results) * 3 + countLength('draw', results);

  const efficiency = ((totalPoints / (results.length * 3)) * 100).toFixed(2);
  return {
    name: teamInt.teamName,
    totalPoints,
    totalGames: results.length,
    totalVictories: countLength('win', results),
    totalDraws: countLength('draw', results),
    totalLosses: countLength('lost', results),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(efficiency),
  };
};

const tabela = (Ileader: ILeaderboard[]) => {
  Ileader.sort((valor1, valor2) => (
    valor2.totalPoints - valor1.totalPoints
      || valor2.totalVictories - valor1.totalVictories
      || valor2.goalsBalance - valor1.goalsBalance
      || valor2.goalsFavor - valor1.goalsFavor
      || valor2.goalsOwn - valor1.goalsOwn
  ));
  return Ileader;
};
// -------------------------------

const createResponse = (status: number, message: unknown) => ({
  status,
  message,
});

export { calculateRank, createResponse, createResultsMatch, tabela };
