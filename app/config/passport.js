const Account = require('../accounts/Account')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs')

module.exports = (passport) => {

  // Session setup.
  // Serialize user.
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  // Deserialize user.
  passport.deserializeUser(async (id, done) => {
    try {
      const oneAccount = await Account
        .query()
        .where('id', '=', id)
      return done(null, oneAccount)
    } catch (err) {
      return done(err, false)
    }
  });

  // Local signup
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passphraseField: 'passphrase',
      passReqToCallback: true,
    },
    async (req, username, passphrase, done) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        const createdAccount = await Account
          .query()
          .returning('id')
          .insert({
            screen_name: username,
            passphrase: bcrypt.hashSync(passphrase, salt, null)
          })
        if (createdAccount) {
          return done(null, createdAccount)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
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
      try {
        console.log('logging in... ' + username)
        const checkedAccount = await Account
          .query()
          .select('id', 'screen_name', 'passphrase')
          .where('screen_name', '=', username)
        if ( checkedAccount.length && bcrypt.compareSync(passphrase, checkedAccount[0].passphrase )) {
          return done(null, checkedAccount[0])
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, null)
      }
    }
  ))
}

