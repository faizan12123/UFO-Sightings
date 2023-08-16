exports.up = function (knex) {
    return knex.schema
      .createTable('ufo', function (table) {
        table.increments('id').primary();
        table.string('city');
        table.string('state');
        table.string('country');
        table.string('shape');
        table.string('reported_date');
        table.string('incident_date');
        table.string('duration');
        table.string('summary');
        table.string('images');
      });
  };

exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('ufo')
  };