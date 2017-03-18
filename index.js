"use strict";

const express = require('express')
const app = express()
const yaml = require('js-yaml');
const extend = require("util")._extend;
const fs = require('fs');
var config;

try {
    let config_file = fs.readFileSync('config.yml', 'utf8');
    config = yaml.safeLoad(config_file);
} catch (e) {
    console.log(e);
    process.exit();
}

function computeTagList(domain) {
    let tags = {};
    domain.files.forEach(function (entry) {
        entry.tags.forEach(function (tag) {
            if (tags[tag] == null)
                tags[tag] = [];
            tags[tag].push(entry.id);
        })
    })
    return tags;
}

var domains = config.reduce( function (acc, domain) {
    let domain_uuid = domain.domain_uuid;
    acc[domain_uuid] = {
        uuid: domain_uuid,
        tags: computeTagList(domain),
        files: domain.files
    };
    return acc;
}, {});

function filterRequiredLanguage(language) {
    return function (doc) {
        doc.i18n = doc.i18n.filter(function (i18n) {
            return i18n.language === language;
        });
        return doc;
    };
}

function docsWithTranslations(doc) {
    return doc.i18n.length > 0;
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function (req, res, next) {
    let domain_uuid = req.get("domain_uuid") || config[0].domain_uuid;
    req.domain = domains[domain_uuid];
    next();
});

app.use(function accessTokenOK(req, res, next) {
    let access_token = req.query.access_token;
    if (access_token !== process.env[req.domain.uuid.substr(0,8)]) {
        return res.status(403).end();
    }
    return next();
});

app.get("/tags", function (req, res) {
    res.send(Object.keys(req.domain.tags));
});

app.get("/browse", function (req, res) {
    let docs = req.domain.files.map(function (doc) {
        return extend({}, doc);
    });

    let language = req.query.language;
    if (language != null) {
        docs = docs.map(filterRequiredLanguage(language)).filter(docsWithTranslations);
    }

    if (req.query.tags_array != null) {
        docs = docs.filter(function(doc){
            let shouldReturn = true;
            for (var tag of req.query.tags_array.split("_")) {
                shouldReturn = shouldReturn && (doc.tags.indexOf(tag) > -1);
            }
            return shouldReturn;
        });
    }

    if (req.query.query_text != null) {
        docs = docs.filter(function(doc){
           return doc.description.indexOf(req.query.query_text) > -1;
        });
    };

    res.send(docs);
});

app.get("/describe", function (req, res) {
    if (req.query.documents === undefined || req.query.documents === "") {
        return res.status(404).end();
    }

    let docIDs = req.query.documents.split("_");
    let docs = [];
    req.domain.files.forEach( function (doc) {
        if (docIDs.indexOf(doc.document_id) !== -1) {
            docs.push(extend({}, doc));
        }
    });

    let language = req.query.language;
    if (language != null) {
        docs = docs.map(filterRequiredLanguage(language)).filter(docsWithTranslations);
    }

    res.send(docs);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('The Simple CMS server with file based configuration is starting on port:', app.get('port'));
});