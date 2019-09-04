const registerController = require('./controllers/register');
const unsubscribeController = require('./controllers/unsubscribe');
const { getProjectOwner, patchProjectOwner } = require('./controllers/project-owner');

module.exports = (app) => {
  app.post('/register', registerController);
  // app.delete('/unsubscribe', unsubscribeController);

  // app.get('/project-owner', getProjectOwner);
  // app.patch('/project-owner', patchProjectOwner);
}