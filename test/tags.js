let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let server = require('./init_test_server').initTestServer();

const tags_route = require('../routes/tags');

server.route("/tags")
    .get(tags_route.getTags);

describe('/GET tags', () => {
    it('it should GET all tags', (done) => {
        chai.request(server)
            .get('/tags')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                res.body.indexOf("Git").should.be.greaterThan(-1);
                res.body.indexOf("Book").should.be.greaterThan(-1);
                res.body.indexOf("Pro").should.be.greaterThan(-1);
                res.body.indexOf("Douglas Hofstadter").should.be.greaterThan(-1);
                res.body.indexOf("Cognitive Science").should.be.greaterThan(-1);
                done();
            });
    });
});
