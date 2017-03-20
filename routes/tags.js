function getTags(req, res) {
    return res.send(req.domain.tags);
}

module.exports = { getTags };