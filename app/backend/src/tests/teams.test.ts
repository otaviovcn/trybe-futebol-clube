import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from "bcryptjs";
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { ALL_TEAMS, ONE_TEAM } from './mocks/teams.mocks.test';
import { HTTP_OK } from '../utils/statusCode';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes dos endpoints /teams e /teams:id', () => {
  let chaiHttpResponse: Response;

  it('Testa o retorno da rota /teams:id', async () => {
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.deep.equal(HTTP_OK);
    expect(body).to.be.deep.equal(ONE_TEAM);
  });

  it('Testa o retorno da rota /teams', async () => {
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.deep.equal(HTTP_OK);
    expect(body).to.be.deep.equal(ALL_TEAMS);
  });
});
