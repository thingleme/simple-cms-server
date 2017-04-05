function domain(domains) {
    return function(req, res, next) {
        let domain_uuid = req.get("domain_uuid") || Object.keys(domains)[0];
        req.domain = domains[domain_uuid] || {
            uuid: domain_uuid,
            tags:[],
            files: []
        };
        next();
    }
}

module.exports = { domain };