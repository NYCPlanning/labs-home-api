const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');

chai.use(chaiThings);
chai.use(chaiHttp);
const should = chai.should();

const server = require('../../app');

describe('GET /posts', () => {
  it('should respond with valid blog posts JSON with expected props', (done) => {
    chai.request(server)
      .get('/posts')
      .end((err, res) => {
        const post = res.body.items[0];

        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');

        post.should.have.property('title');
        post.should.have.property('description');
        post.should.have.property('link');
        post.should.have.property('url');
        post.should.have.property('created');
        post.should.have.property('image');

        done();
      });
  });
});
