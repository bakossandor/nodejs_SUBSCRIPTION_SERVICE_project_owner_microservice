const registerController = require('./controllers/register');
const unsubscribeController = require('./controllers/unsubscribe');
const { getProjectOwner, getAllProjectOwner} = require('./controllers/get-project-owner');
const { updatePassword, updateEmail } = require('./controllers/patch-project-owner');

module.exports = (app) => {
  app.get('/project-owner', getAllProjectOwner);
  app.post('/project-owner', registerController);
  app.get('/project-owner/:id', getProjectOwner);
  app.delete('/project-owner/:id', unsubscribeController);
  app.patch('/project-owner/:id/password', updatePassword);
  app.patch('/project-owner/:id/email', updateEmail);
}