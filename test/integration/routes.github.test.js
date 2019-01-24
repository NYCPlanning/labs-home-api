const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const chaiThings = require('chai-things');

chai.use(chaiThings);
chai.use(chaiHttp);
const should = chai.should();

const server = require('../../app');

const githubIssuesResponse = require('../github-issues-response.json');
const githubReposResponse = require('../github-repos-response.json');

nock('https://api.github.com')
  .get('/search/repositories?q=org:nycplanning%20topic:labs&per_page=100')
  .reply(200, githubReposResponse);

nock('https://api.github.com')
  .post('/graphql')
  .reply(200, githubIssuesResponse);

describe('GET /github/issues', () => {
  it('should respond with a JSON array of objects with expected properties', (done) => {
    chai.request(server)
      .get('/github/issues')
      .end((err, res) => {
        const post = res.body[0];

        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');

        post.should.have.property('name');
        post.should.have.property('openIssues');
        post.should.have.property('openBugs');
        post.should.have.property('openEnhancements');

        done();
      });
  });
});
