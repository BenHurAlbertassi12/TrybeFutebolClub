import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const errorTest = {
  email: 'dev.benhur@gmail.com',
  password: 'senhaMock',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmVuSHVyIEFsYmVydGFzc2kiLCJvdGhlck5hbWUiOiJkYSBTaWx2YSIsIm1haWwiOiJkZXYuYmVuaHVyQGdtYWlsLmNvbSJ9.EftbP2L-UBxafRRND2QAgqkoe-U6VFe3SgzFVfqMa3E';

const passRequired = '"password" is required';
const emailRequired = '"email" is required';

const loginErr = 'Invalid email or password';

describe('rota /login', () => {
    let xai: Response;
  it('login com sucesso', async () => {
    xai = await chai.request(app).post('/login').send(errorTest);

    expect(xai.status).to.be.deep.equal(401);
  });
  });

describe('campo email', () => {
  afterEach(() => sinon.restore());

  it('erro de "email" não enviado', async () => {
    const response = await chai.request(app).post('/login').send({
      password: 'senhaMock',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: emailRequired });
  });
});
describe('campo password', () => {
  afterEach(() => sinon.restore());

  it('deve retornar um erro de preenchimento obrigatório quando "password" não é enviado', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'dev.benhur@gmail.com',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: passRequired });
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
