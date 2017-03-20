process.env.NODE_ENV = 'test';

function initTestServer() {
    const loadDomains = require('../utils').loadDomains;
    var domains = loadDomains('test/test_config.yml');

    const app = require('express')();

    const cors_filter = require('../filters/cors').cors;
    const domain_filter = require('../filters/domain').domain;

    app.use(cors_filter);
    app.use(domain_filter(domains));

    return app;
}

module.exports = {initTestServer};