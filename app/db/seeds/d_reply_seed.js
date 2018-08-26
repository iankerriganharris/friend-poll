
const faker  = require('faker')

exports.seed = async (knex, Promise) => {
  const replies = new Array()
  const accountIds = await knex('account').pluck('id')
  const questionIds = await knex('question').pluck('id')
  console.log(questionIds)

  questionIds.forEach((q) => {
    let count = 0
    do {
      const oneAcc = faker.random.arrayElement(accountIds)
      const reply = {
        id_account: oneAcc,
        id_question: q,
        description: faker.commerce.productName()
      }
      replies.push(reply)
      count += 1
    } while (count < 5)
  })

  return knex('reply').insert(replies);
};