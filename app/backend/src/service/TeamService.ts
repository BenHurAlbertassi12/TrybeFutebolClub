import Team from '../database/models/TeamModel';

interface ITeam {
  id?: number;
  teamName: string;
}

interface ITeamService {
  findAll(): Promise<ITeam[] | void>;
  findByPk(id: number): Promise<ITeam | void>;
}

export default class TeamService implements ITeamService {
  constructor(private _teamModel = Team) {}

  findAll = async (): Promise<ITeam[] | void> => {
    try {
      const teams = await this._teamModel.findAll();
      return teams;
    } catch (err) {
      console.error(`Error finding all teams: ${err}`);
    }
  };

  async findByPk(id: number): Promise<ITeam | void> {
    const team = await this._teamModel.findByPk(id);
    /*
    vai receber como parâmetro o valor da chave primária do registro que se deseja buscar
    e retorna o registro correspondente encontrado na tabela.
    Se o registro não existir, ele retorna null.
    */
    return team || undefined;
  }
}
