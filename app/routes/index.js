// ./routes/index.js
const question = require('./question')
//const db = require('../db')

module.exports = (app, passport) => {
  const login = require('./login')(passport)
  const register = require('./register')(passport)
  app.use('/question', question)
  app.use('/login', login);
  app.use('/register', register);

  app.get('/logout', function(req, res) {
    req.logOut();
    req.session.destroy(() => {
      res.json({'status': 200});
    });
  });
}