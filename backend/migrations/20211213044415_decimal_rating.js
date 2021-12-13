exports.up = function(knex) {
  return knex.raw(`alter table reviews alter column rating type decimal(10,2);`)
};

exports.down = function(knex) {
  // TODO revert the column from float to int (sorry, I skipped this for sake of time)
  throw Error('TODO implement backward migration')
};
