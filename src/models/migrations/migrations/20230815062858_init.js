/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable('location', function (table) {
        table.increments('id').primary();
        table.string('city');
        table.string('state');
        table.string('country');
      })
      .createTable('shape', function (table) {
        table.increments('id').primary();
        table.string('name');
      })
      .createTable('ufo', function (table) {
        table.increments('id').primary();
        table.integer('LocationID').references('id').inTable('location');
        table.integer('ShapeID').references('id').inTable('shape');
        table.timestamp('reported_date');
        table.timestamp('incident_date');
        table.string('duration');
        table.string('summary');
        table.boolean('images');
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('ufo')
      .dropTableIfExists('shape')
      .dropTableIfExists('location');
  };
