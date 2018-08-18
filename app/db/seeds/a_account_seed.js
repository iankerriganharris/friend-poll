

const bcrypt = require('bcrypt-nodejs')

exports.seed = knex => {
  const salt = bcrypt.genSaltSync(10);
  const pw = bcrypt.hashSync('test', salt, null)
  return knex('account').insert([
    {id: 1, screen_name: 'doglover', first_name: 'George', last_name: 'Stephens', passphrase: pw},
    {id: 2, screen_name: 'camper', first_name: 'Jan', last_name: 'Woods', passphrase: pw},
    {id: 3, screen_name: 'sporty', passphrase: pw},
    {id: 4, screen_name: 'fab', passphrase: pw},
    {id: 5, screen_name: 'sneakerhead', passphrase: pw},
    {id: 6, screen_name: 'eater', passphrase: pw},
    {id: 7, screen_name: 'sneakerless', passphrase: pw},
    {id: 8, screen_name: 'eat_everything', passphrase: pw}
  ]);
};
