exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function() {
      return knex('products').del()
    })
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'The Minimalist Keyboard' },
      ])
    })
}
