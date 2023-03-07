import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import User from '../database/models/UsersModel';

import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const errorTest = {
  email: 'dev.benhur@gmail.com',
  password: 'senhaMock',
};

const userMock =  {
  id: 1,
  user: 'benhur',
  email: 'dev.benhur@gmail.com',
  role: 'benhur',
  password: 'MeArrumeUmEmprego',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmVuSHVyIEFsYmVydGFzc2kiLCJvdGhlck5hbWUiOiJkYSBTaWx2YSIsIm1haWwiOiJkZXYuYmVuaHVyQGdtYWlsLmNvbSJ9.EftbP2L-UBxafRRND2QAgqkoe-U6VFe3SgzFVfqMa3E';

const filledFail = 'todos os campos devem estar preenchidos';

const loginErr = 'Invalid email or password';

describe('rota /login', () => {
  it('Usuário consegue fazer login com sucesso', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as unknown as User);
    sinon.stub(jsonwebtoken, 'sign').resolves(token);

    const response = await chai.request(app).post('/login').send(errorTest);

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({ token });

    sinon.restore();
  });
});

describe('campo email', () => {
  afterEach(() => sinon.restore());

  it('erro de "email" não enviado', async () => {
    const response = await chai.request(app).post('/login').send({
      password: 'senhaMock',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: filledFail });
  });
});
describe('campo password', () => {
  afterEach(() => sinon.restore());

  it('deve retornar um erro de preenchimento obrigatório quando "password" não é enviado', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'dev.benhur@gmail.com',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: filledFail });
  });
});

describe('email inválido', () => {
  afterEach(() => sinon.restore());

  it('deve retornar um erro de login quando o email é inválido', async () => {
    const response = await chai.request(app).post('/login').send(errorTest);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: loginErr });
  });
});

describe('email inválido', () => {
  afterEach(() => sinon.restore());

  it('deve retornar um erro de login quando o email é inválido', async () => {
    const response = await chai.request(app).post('/login').send(errorTest);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: loginErr });
  });
});


