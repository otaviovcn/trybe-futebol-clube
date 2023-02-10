import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from "bcryptjs";
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/Teams';
import {
  ALL_TEAMS,
  ONE_TEAM,
} from './mocks/teams.mocks.test';
import { HTTP_OK, HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } from '../utils/statusCode';

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

  // it('Testa o retorno da rota /tams/:id', async () => {
  //   const email = 'teste@teste.com';
  //   const password = '123';
  //   const result = await chai.request(app).post("/login").send({ email, password });


  //   expect(result.status).to.be.equal(HTTP_UNPROCESSABLE_ENTITY);
  //   expect(result.text).to.be.equal(`{"message":${JSON.stringify(MIN_LENGTH_PASSWORD_MESSAGE)}}`);
  // });

  // it('Testa o retorno ao não passar um dos campos na requisição', async () => {
  //   const email = 'teste@teste.com';
  //   const result = await chai.request(app).post("/login").send({ email });


  //   expect(result.status).to.be.equal(HTTP_BAD_REQUEST);
  //   expect(result.text).to.be.equal(`{"message":${JSON.stringify(NO_PASSWORD_OR_EMAIL_MESSAGE)}}`);
  // });
});
