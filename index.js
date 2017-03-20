"use strict";

const app = require('express')();
const domains = require('./utils').loadDomains('config.yml');

const cors_filter = require('./filters/cors').cors;
const domain_filter = require('./filters/domain').domain(domains);
const accessToken_filter = require('./filters/access_token').accessToken(process.env);

const tags_route = require('./routes/tags');
const documentation_route = require('./routes/documentation');

app.use(cors_filter)
    .use(domain_filter)
    .use(accessToken_filter);

app.route("/tags")
    .get(tags_route.getTags);

app.route("/browse")
    .get(documentation_route.browse);

app.route("/describe")
    .get(documentation_route.describe);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('The Simple CMS server with file based configuration is starting on port:', app.get('port'));
});
