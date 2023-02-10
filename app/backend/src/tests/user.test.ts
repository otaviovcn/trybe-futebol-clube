import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from "bcryptjs";
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';
import {
  LOGIN_MOCK,
  MIN_LENGTH_PASSWORD_MESSAGE,
  NO_PASSWORD_OR_EMAIL_MESSAGE,
} from './mocks/login.mocks.test';
import { HTTP_OK, HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } from '../utils/statusCode';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  // const { stub } = require('sinon');
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  it('Testa o retorno ao passar informações corretas na requisição', async () => {
    sinon.stub(UserModel, 'findOne').resolves({ ...LOGIN_MOCK } as UserModel);
    sinon.stub(bcrypt, 'compare').resolves(true);

    const email = LOGIN_MOCK.email;
    const password = LOGIN_MOCK.password;
    const result = await chai.request(app).post('/login').send({ email, password });

    expect(result.status).to.be.equal(HTTP_OK);
    expect(result.body).have.property('token');

    (UserModel.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  });

  it('Testa o retorno ao passar a senha incompleta na requisição', async () => {
    const email = 'teste@teste.com';
    const password = '123';
    const result = await chai.request(app).post("/login").send({ email, password });


    expect(result.status).to.be.equal(HTTP_UNPROCESSABLE_ENTITY);
    expect(result.text).to.be.equal(`{"message":${JSON.stringify(MIN_LENGTH_PASSWORD_MESSAGE)}}`);
  });

  it('Testa o retorno ao não passar um dos campos na requisição', async () => {
    const email = 'teste@teste.com';
    const result = await chai.request(app).post("/login").send({ email });


    expect(result.status).to.be.equal(HTTP_BAD_REQUEST);
    expect(result.text).to.be.equal(`{"message":${JSON.stringify(NO_PASSWORD_OR_EMAIL_MESSAGE)}}`);
  });
});
