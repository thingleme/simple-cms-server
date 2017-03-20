const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig(configPath) {
    try {
        let config_file = fs.readFileSync(configPath, 'utf8');
        return yaml.safeLoad(config_file);
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

function loadDomains(configPath) {
    return loadConfig(configPath)
        .reduce(function (acc, domain) {
            function computeTagList(domain) {
                let tags = [];
                domain.files.forEach(function (entry) {
                    entry.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) == -1) {
                            tags.push(tag);
                        }
                    })
                })
                return tags;
            }

            let domain_uuid = domain.domain_uuid;
            acc[domain_uuid] = {
                uuid: domain_uuid,
                tags: computeTagList(domain),
                files: domain.files
            };

            return acc;
        }, {});
}

module.exports = {loadDomains};