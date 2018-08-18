
exports.up = function(knex, Promise) {
  return knex.schema.table('account', (t) => {
    t.string('email')
  })
  
};

exports.down = function(knex, Promise) {
  
};
