const { dbGetProjectOwner, dbGetAllProjectOwner } = require('../db/index');

async function getProjectOwner (request, response, next) {
  try {
    const { params: { id } } = request;
    const { rows : [projectOwner]} = await dbGetProjectOwner(id);
    response.send({'data': projectOwner});
  } catch (error) {
    next(error);
  }
}

async function getAllProjectOwner (request, response, next) {
  try {
    const { rows } = await dbGetAllProjectOwner();
    response.send({'data': rows})
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjectOwner,
  getAllProjectOwner,
};
