let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let server = require('./init_test_server').initTestServer();

const documentation_route = require('../routes/documentation');

server.route("/browse")
    .get(documentation_route.browse);

server.route("/describe")
    .get(documentation_route.describe);

describe('/GET browse', () => {
    it('it should return all docs', (done) => {
        chai.request(server)
            .get('/browse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                done();
            });
    });
    it('it should return only GEB book matching the \'Cognitive Science\' tag', (done) => {
        chai.request(server)
            .get('/browse')
            .query({tags:'Cognitive Science'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body[0].document_id.should.be.eql('2');
                done();
            });
    });
    it('it should return no italian docs', (done) => {
        chai.request(server)
            .get('/browse')
            .query({tags:'Cognitive Science', language: 'it'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe('/GET describe', () => {
    it('it should describe one doc', (done) => {
        chai.request(server)
            .get('/describe')
            .query({documents: '1'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body[0].document_id.should.be.eql('1');
                done();
            });
    });
});