

const faker  = require('faker')

exports.seed = function(knex, Promise) {
  let questions = new Array()

  knex('account').pluck('id').then((accountIds) => {
    let count = 0
    do {
      const question = {
        id_account: faker.random.arrayElement(accountIds),
        description: faker.commerce.productName()
      }
      questions.push(question)
      count += 1
    } while (count < 1000)
  })
  return knex('question').insert(questions);
};
