function accessToken(hash) {
    return function (req, res, next) {
        let secret = hash["dom_" + req.domain.uuid.substr(0, 8)];
        if (typeof secret !== 'undefined' && req.query['access_token'] !== secret) {
            return res.status(403).end();
        }
        next();
    }
}

module.exports = {accessToken};