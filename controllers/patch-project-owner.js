const { dbPatchProjectOwner } = require('../db/index');

async function getProjectOwner (request, response, next) {
  try {
    const { params: { id } } = request;
    const { body } = request;
    const type = typeof body;
    if ((type === 'object' && !!body) && Object.keys(body).length !== 1 && ['email', 'password', 'subscription_type'].indexOf(Object.keys(body)[0]) === -1 ) {
      const error = new Error('The body has to contain only one key value pair from the following [email, password, subscription_type]');
      error.statusCode = 400;
      next(error);
      return;
    }
    // continue from here !!!
    const updated = await dbPatchProjectOwner([Object.keys(body)[0], Object.values(body)[0]], id)
    response.send({'data': updated});
  } catch (error) {
    next(error);
  }
}

module.exports = getProjectOwner;
