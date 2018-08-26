
exports.up = knex => {
  return knex.schema
    .createTable('reply', table => {
      table.increments('id').primary()
      table.integer('id_account')
        .unsigned()
        .references('id')
        .inTable('account')
      table.integer('id_question')
        .unsigned()
        .references('id')
        .inTable('question')
      table.string('description')
    })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('reply')
}
