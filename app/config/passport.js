const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db')

const userExists = async (username) => {
  console.log('finding user')
  const query = {
    text: 'SELECT id FROM account WHERE screen_name = $1;',
    values: [username]
  }
  const result = await db.query(query);
  return result.rowCount === 1;
}

const checkPassword = async (username, passphrase) => {
  console.log('checking passphrase')
  const query = {
    text: 'SELECT id, passphrase FROM account WHERE screen_name = $1;',
    values: [username]
  }
  const result = await db.query(query);
  if ( bcrypt.compareSync(passphrase, result.rows[0].passphrase) ) {
    return result.rows[0];
  } else {
    return false
  }
}

const insertUser = async (username, passphrase) => {
  const salt = bcrypt.genSaltSync(10);
  const query = {
    text: 'INSERT INTO account(screen_name, passphrase) VALUES($1,$2) RETURNING id;',
    values: [username, bcrypt.hashSync(passphrase, salt, null)]
  };
  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch(err) {
    console.log(err.stack)
    return false
  }
}

module.exports = (passport) => {
  // Session setup.
  // Serialize user.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // Deserialize user.
  passport.deserializeUser(function(id, done) {
    const query = {
      text: 'SELECT * FROM account WHERE id = $1;',
      values: [id]
    }
    db.query(query)
      .then( res => done(null, res.rows[0]) )
      .catch( err => done(err, false) )
  });

  // Local signup
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passphraseField: 'passphrase',
      passReqToCallback: true,
    },
    async (req, username, passphrase, done) => {
      if(! await userExists(username)) {
        const user_created = await insertUser(username, passphrase);
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
      u = await userExists(username);
      p = await checkPassword(username, passphrase);
      return done(null, p);
    }
  ));
}

