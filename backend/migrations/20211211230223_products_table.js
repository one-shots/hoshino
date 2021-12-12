exports.up = function(knex) {
  return knex.schema
    .createTable('products', function(table) {
      table.increments('id')
      table.string('name').notNullable()
    })
    .createTable('reviews', function(table) {
      table.increments('id')
      table.integer('product_id')
        .references('id')
        .inTable('products')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
        .notNullable()
      table.integer('rating').notNullable()
      table.text('comment')
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('reviews')
    .dropTable('products')
}
