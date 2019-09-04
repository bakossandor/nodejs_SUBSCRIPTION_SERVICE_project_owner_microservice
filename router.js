const registerController = require('./controllers/register');
const unsubscribeController = require('./controllers/unsubscribe');
const getProjectOwnerController = require('./controllers/get-project-owner');
const patchProjectOwnerController = require('./controllers/patch-project-owner');

module.exports = (app) => {
  app.post('/project-owner', registerController);
  app.delete('/project-owner/:id', unsubscribeController);
  app.get('/project-owner/:id', getProjectOwnerController);
  app.patch('/project-owner/:id', patchProjectOwnerController);
}