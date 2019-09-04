const { dbGetProjectOwner } = require('../db/index');

async function getProjectOwner (request, response, next) {
  try {
    const { params: { id } } = request;
    const { rows : [projectOwner]} = await dbGetProjectOwner(id);
    delete projectOwner['password'];
    response.send({'data': projectOwner});
  } catch (error) {
    next(error);
  }
}

module.exports = getProjectOwner;
