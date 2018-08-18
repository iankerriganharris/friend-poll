
exports.seed = function(knex, Promise) {
  return knex('follow').insert([
    {id_account: 1, id_follower: 2},
    {id_account: 1, id_follower: 3},
    {id_account: 1, id_follower: 4},
    {id_account: 1, id_follower: 5},
    {id_account: 2, id_follower: 1},
    {id_account: 4, id_follower: 1},
    {id_account: 5, id_follower: 1},
    {id_account: 4, id_follower: 2},
    {id_account: 4, id_follower: 3},
    {id_account: 6, id_follower: 2},
    {id_account: 6, id_follower: 3},
    {id_account: 6, id_follower: 4},
    {id_account: 6, id_follower: 5},
  ]);
};