
exports.up = knex => {
 return knex.schema
   .createTable('account', table => {
     table.increments('id').primary()
     table.string('screen_name').unique()
     table.string('first_name')
     table.string('last_name')
     table.string('passphrase')
   })
   .createTable('follow', table => {
     table.increments('id').primary()
     table
       .integer('id_account')
       .unsigned()
       .references('id')
       .inTable('account')
     table
       .integer('id_follower')
       .unsigned()
       .references('id')
       .inTable('account')
   })
   .createTable('question', table => {
     table.increments('id').primary()
     table
       .integer('id_account')
       .unsigned()
       .references('id')
       .inTable('account')
     table.string('description')
   })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('account')
    .dropTableIfExists('follow')
    .dropTableIfExists('question')
}
