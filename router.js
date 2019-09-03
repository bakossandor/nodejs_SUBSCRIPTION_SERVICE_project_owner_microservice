const registerController = require('./controllers/register');
const unsubscribeController = require('./controllers/unsubscribe');
const { getProjectOwner, patchProjectOwner } = require('./controllers/project-owner');
const { login, logout } = require('./controllers/auth')

module.exports = (app) => {
  app.post('/register', registerController);
  // app.delete('/unsubscribe', unsubscribeController);

  // // I might seperate the authentication controller into a different microservice
  // app.post('/login', login);
  // app.post('/logout', logout);

  // app.get('/project-owner', getProjectOwner);
  // app.patch('/project-owner', patchProjectOwner);
}