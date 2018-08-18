
exports.seed = function(knex, Promise) {
  return knex('question').del()
    .then(function () {
      return knex('account').del()
    })
    .then(function () {
      return knex('follow').del()
    })
};
