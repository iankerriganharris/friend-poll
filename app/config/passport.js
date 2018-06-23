const account = require('../accounts/account-model')
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  // Session setup.
  // Serialize user.
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });
  // Deserialize user.
  passport.deserializeUser(async (id, done) => {
    await account.findOneById(id, (error, account) => {
      return error ? done(error, false) : done(null, account)
    })
  });

  // Local signup
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passphraseField: 'passphrase',
      passReqToCallback: true,
    },
    async (req, username, passphrase, done) => {
      if(! await account.exists(username)) {
        const user_created = await account.create(username, passphrase);
        if (user_created) {
          return done(null, user_created);
        } else {
          return done(null, false);
        }
      } 
      else {
        return done(null, false);
      }
    }
  ))

  // Local auth
  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'username',
      passphraseField: 'passphrase',
      passReqToCallback: true,
    },
    async (req, username, passphrase, done) => {
      u = await account.exists(username);
      p = await account.checkPassword(username, passphrase);
      return done(null, p);
    }
  ));
}

