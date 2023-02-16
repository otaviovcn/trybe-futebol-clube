import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { HTTP_OK } from '../utils/statusCode';

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /leaderboard', () => {
  afterEach(sinon.restore);

 it('Checa o retorno da rota /leaderboard/home', async () => {
    const result = await chai.request(app).get('/leaderboard/home');
    expect(result.body).to.be.an('array');
    expect(result.status).to.equal(HTTP_OK);
  });

  it('Checa o retorno da rota /leaderboard/away', async () => {
    const result = await chai.request(app).get('/leaderboard/away');
    expect(result.body).to.be.an('array');
    expect(result.status).to.equal(HTTP_OK);
  });
});
