const resources = require('../models/resources.models');
const logger = require("../../config/logger");

exports.getByName = async function (req, res) {
    try {
        const resource = await resources.getByName(req.params.name);
        if (resource === null) {
            res.status(404).send(`Resource '${req.params.name}' not found`);
            return;
        }
        res.status(200).send(resource);
    } catch (err) {
        logger.getLogger().error(`Error in getByName(), resources.controller, ${err}`);
        res.status(500).send();
    }
}


exports.setByName = async function (req, res) {
    try {
        const found = await resources.setByName(req.params.name, req.body.value);
        if (!found) {
            res.status(404).send(`Resource '${req.params.name}' not found`);
            return;
        }
        res.status(200).send(`Resource '${req.params.name}' updated`)
    } catch (err) {
        logger.getLogger().error(`Error in setByName(), resources.controller, ${err}`);
        res.status(500).send();
    }
}