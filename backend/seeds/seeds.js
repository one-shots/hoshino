exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'The Minimalist Keyboard' },
      ])
    })
}
