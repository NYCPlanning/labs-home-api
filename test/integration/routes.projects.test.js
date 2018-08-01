const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const chaiThings = require('chai-things');

chai.use(chaiThings);
chai.use(chaiHttp);
const should = chai.should();

const server = require('../../app');
const airtableResponse = require('../airtable-response');

nock('https://api.airtable.com')
  .get('/v0/app1f3lv9mx7L5xnY/Labs%20Live%20Projects?view=Public&api_key=undefined')
  .reply(200, airtableResponse);

describe('GET /projects', () => {
  it('should respond with valid projects JSON', (done) => {
    chai.request(server)
      .get('/projects')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');

        done();
      });
  });
});
