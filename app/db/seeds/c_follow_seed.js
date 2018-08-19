


exports.seed = function(knex, Promise) {
  let follows = new Array()

  knex('account').pluck('id').then((accountIds) => {
    let count = 0
    do {
      let id_account
      let id_follower
      do {
        id_account = faker.random.arrayElement(accountIds)
        id_follower = faker.random.arrayElement(accountIds)
      } while (id_account === id_follower)
      const follow = {
        id_account: id_account,
        id_follower: id_follower
      }
      follows.push(follow)
      count += 1
    } while (count < 1000)
  })
  return knex('follow').insert(follows);
};