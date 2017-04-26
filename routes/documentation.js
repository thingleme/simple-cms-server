const extend = require("util")._extend;

function filterRequiredLanguage(language) {
    return function (doc) {
        doc.i18n = doc.i18n.filter(function (i18n) {
            return i18n.language === language;
        });
        return doc;
    }
}

function docsWithTranslations(doc) {
    return doc.i18n.length > 0;
}

function browse(req, res) {
    let docs = req.domain.files.map(function (doc) {
        return extend({}, doc);
    });

    let language = req.query.language;
    if (language != null) {
        docs = docs.map(filterRequiredLanguage(language)).filter(docsWithTranslations);
    }

    if (req.query.tags != null) {
        docs = docs.filter(function(doc){
            let shouldReturn = true;
            for (var tag of req.query.tags.split("_")) {
                shouldReturn = shouldReturn && (doc.tags.indexOf(tag) > -1);
            }
            return shouldReturn;
        });
    }

    if (req.query.query_text != null) {
        docs = docs.filter(function(doc){
            return doc.description.indexOf(req.query.query_text) > -1;
        });
    }

    res.send(docs);
}

function describe(req, res) {
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
}

module.exports = { browse, describe };