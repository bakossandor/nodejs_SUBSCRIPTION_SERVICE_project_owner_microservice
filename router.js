const registerController = require('./controllers/register');
const unsubscribeController = require('./controllers/unsubscribe');
const { getProjectOwner, getAllProjectOwner} = require('./controllers/get-project-owner');
const { updatePassword, updateEmail } = require('./controllers/patch-project-owner');

module.exports = (app) => {
  app.get('/', getAllProjectOwner);
  app.post('/', registerController);
  app.get('/:id', getProjectOwner);
  app.delete('/:id', unsubscribeController);
  app.patch('/:id/password', updatePassword);
  app.patch('/:id/email', updateEmail);
}