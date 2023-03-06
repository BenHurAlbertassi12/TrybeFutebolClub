import { ModelStatic, Op } from 'sequelize';
import MSGError from '../middleware/errors/MSGError';
import Team from '../database/models/TeamModel';
import Matche from '../database/models/MatchesModel';
import { ITeamsId, ITeamsGoals } from '../interface/Iteams';

const req21e422 = 'It is not possible to create a match with two equal teams';

export default class MatcheService {
  protected model: ModelStatic<Matche> = Matche;

  async getAllService(inProgress?: boolean): Promise<Matche[]> {
    const where = inProgress === undefined
      ? {}
      : {
        [Op.and]: [{ inProgress }],
      }; // cria condição de pesquisa dendro do bd
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where,
    });
    return result;
  }
  // dependendo do resultado do 'improgress'
  // a pesquisa retornara todas as partidas existentes

  async finalizar(id: number): Promise<number[] | undefined> {
    const upFim = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return upFim;
  }

  async CreateService({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
  }: ITeamsId): Promise<Matche> {
    if (homeTeamId === awayTeamId) {
      throw new MSGError(req21e422, 422);
    }
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
  /*
    se a condição de igualdade for true,
    um erro lançado com o status code 422.
    Caso contrário, a função continua normalmente
    e retorna o resultado da criação do objeto no banco de dados.
  */

  async AttService(id: number, { homeTeamGoals, awayTeamGoals }: ITeamsGoals) {
    return this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}

/*
    "op" é um operador do Sequelize que indica que as o conteud dentro dele
    devem ser combinadas usando o operador lógico "and".
    https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#shorthand-syntax-for-opin
    */
