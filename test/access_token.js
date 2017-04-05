let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let server = require('./init_test_server').initTestServer();
const accessToken_filter = require('../filters/access_token').accessToken;

server.use(accessToken_filter({ dom_a2d2c8a0: "test" }));

server.route("/")
    .get(function(req, res, next) { res.send({}) });

describe('Authorization', () => {
    it('it should forbid access', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
    it('it should allow request', (done) => {
        chai.request(server)
            .get('/')
            .query({access_token: "test"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
