const { dbAddProjectOwner } = require('../db/index');

async function registerController(req, res, next) {
  try {
    const { body: { username, email, subscription_type }} = req;
    const response = await dbAddProjectOwner(username, email, subscription_type);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = registerController;