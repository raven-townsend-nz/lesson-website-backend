const users = require('../models/users.models');
const logger = require("../../config/logger");

exports.adminRequired = async function (req, res, next) {
  try {
      const token = req.header('X-Authorization');
      const user = await users.getUserByToken(token);
      let admin = false;
      if (user === null) {
          res.status(401).send('Not logged in');
      } else {
          admin = user.is_admin;
          if (admin) {
              req.authenticatedUserId = user.id.toString();
              next();
          } else {
              res.status(403).send('Admin permissions required');
          }
      }
  } catch (err) {
      logger.getLogger().error(`Error in adminRequired(), authenticate, ${err}`);
      res.status(500).send();
  }
};

exports.loginRequired = async function (req, res, next) {
    try {
        const token = req.header('X-Authorization');
        const user = await users.getUserByToken(token);
        if (user === null) {
            res.status(401).send('Not logged in');
        } else {
            req.authenticatedUserId = user.id.toString();
            req.isAdmin = !!user.is_admin;
            next();
        }
    } catch (err) {
        logger.getLogger().error(`Error in loginRequired(), authenticate, ${err}`);
        res.status(500).send();
    }
};


exports.loggedOutRequired = async function (req, res, next) {
    try {
        const user = await users.getUserByEmail(req.body.email);
        if (user === null) {
            res.status(400).send('No users with that email');
        } else if (user.auth_token !== null) {
            res.status(400).send('Already logged in');
        } else {
            next();
        }
    } catch (err) {
        logger.getLogger().error(`Error in loggedOutRequired(), authenticate, ${err}`);
        res.status(500).send();
    }
}
