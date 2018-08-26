
exports.seed = function(knex, Promise) {
  return knex('reply').del()
    .then(function () {
      return knex('question').del()
    })
    .then(function () {
      return knex('follow').del()
    })
    .then(function () {
      return knex('account').del()
    })
};
