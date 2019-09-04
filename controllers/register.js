const { dbAddProjectOwner } = require('../db/index');
const validateProjectOwner = require('../lib/validate');

async function registerController(req, res, next) {
  try {
    const { body: { username, email, password, subscription_type }} = req;
    const validationError = validateProjectOwner({username, email, password, subscription_type});
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      next(error);
    } 
    await dbAddProjectOwner(username, email, password, subscription_type);
    res.status(201).end();
  } catch (error) {
    // if the error come back from the database unique constraint violation
    if (error.code === '23505') {
      const uniqeError = new Error(error.detail);
      uniqeError.statusCode = 400;
      next(uniqeError);
      return;
    }
    next(error);
  }
}

module.exports = registerController;