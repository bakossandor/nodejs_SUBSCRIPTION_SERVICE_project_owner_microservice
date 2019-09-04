const { dbDeleteProjectOwner } = require('../db/index');

async function unsubscribe(request, response, next) {
  try {
    const { params: { id }} = request;
    const { rowCount } = await dbDeleteProjectOwner(id);
    if (rowCount === 0) {
      response.status(200).send({'developerMessage': `The requested record has been deleted, the current operation deleted ${rowCount} rows`});
      return;
    }
    response.status(204).end();
  } catch (error) {
    next(error.message)
  }
}

module.exports = unsubscribe;