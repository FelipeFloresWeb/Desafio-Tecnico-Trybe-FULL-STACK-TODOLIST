// src: https://github.com/tryber/sd-010-a-cookmaster/pull/22
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
require('dotenv').config();
const server = require('../index');


const PORT = process.env.PORT || 4000;

chai.use(chaiHttp);
const { expect } = chai;


const { Mongoose } = require('mongoose');
const { getConnection } = require('./helpers/connectionMock');

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    Mongoose.connect.restore();
  })

  describe('Será validado que o campo "email" é obrigatório', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({password: '12345678'});
    });

    after(async () => {});

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Usuário não Encontrado"', () => {
      expect(response.body.message).to.be.equals('Usuário não Encontrado');
    });
  });

  describe('Será validado que o campo "password" é obrigatório', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com'});
    });

    after(async () => {});

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Usuário não Encontrado"', () => {
      expect(response.body.message).to.be.equals('Usuário não Encontrado');
    });
  });

  describe('Será validado que não é possível fazer login com um email inválido', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@', password: '12345678'});
    });

    after(async () => {});

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Usuário não Encontrado"', () => {
      expect(response.body.message).to.be.equals('Usuário não Encontrado');
    });
  });

  describe('Será validado que não é possível fazer login com uma senha inválida', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com', password: '12'});
    });

    after(async () => {});

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Será validado que é possível fazer login com sucesso', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users')

      await usersCollection.insertOne({
        name: 'Erick Jacquin',
        email: 'erickjacquin@gmail.com',
        password: '12345678',
        role: 'user',
      })
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com', password: '12345678'});
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('a propriedade "message" não está vazia', () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
}); 