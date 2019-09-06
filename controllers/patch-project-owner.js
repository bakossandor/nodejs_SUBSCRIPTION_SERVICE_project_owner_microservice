const { dbPatchProjectOwner, dbGetUserPassword } = require('../db/index');
const { validateEmail, validatePassword } = require('../lib/validate');
const { comparePassoword, encryptPassword } = require('../lib/encrypt');

async function updateEmail (request, response, next) {
  try {
    const { params: { id } } = request;
    const { body: { email } } = request;
    if (!email) {
      const error = new Error('Not correct request form');
      error.statusCode = 400;
      next(error);
      return;
    }
    const validationError = validateEmail(email);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      next(error);
      return;
    }
    const { rows : [data]} = await dbPatchProjectOwner('email', email, id);
    response.send({data});
  } catch (error) {
    next(error);
  }
}

async function updatePassword (request, response, next) {

  // need further tests!!!!

  try {
    const { params: { id } } = request;
    const { body: { newPassword, oldPassword } } = request;
    if (!newPassword || !oldPassword && newPassword === oldPassword) {
      const error = new Error('Not correct request form');
      error.statusCode = 400;
      next(error);
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      next(error);
      return;
    }

    const getOldPasswordFromDb = await dbGetUserPassword(id);
    const matchedPassword = await comparePassoword(oldPassword, getOldPasswordFromDb.password);
    if (!matchedPassword) {
      const error = new Error('Incorrect password');
      error.statusCode = 400;
      next(error);
      return;
    }

    const encryptedPassword = await encryptPassword(newPassword);

    const { rows : [data]} = await dbPatchProjectOwner('password', encryptedPassword, id);
    response.send({data});
  } catch (error) {
    next(error);
  }
}


module.exports = {
  updateEmail,
  updatePassword
};
