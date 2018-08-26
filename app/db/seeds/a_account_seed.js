

const bcrypt = require('bcrypt-nodejs')
const faker  = require('faker')

const salt = bcrypt.genSaltSync(10);
const pw = bcrypt.hashSync('test', salt, null)

let accounts = new Array()
let count = 0
do {
  const account = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    passphrase: pw
  }
  account.screen_name =`${account.first_name}.${account.last_name}${count}`,
  accounts.push(account)
  count += 1
} while (count < 1000)
exports.seed = knex => {
  return knex('account').insert(accounts);
};
