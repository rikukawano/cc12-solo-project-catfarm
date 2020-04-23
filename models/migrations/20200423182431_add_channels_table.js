exports.up = function(knex, Promise) {
  return knex.schema.createTable("channels", (t) => {
    t.increments().index();

    t.integer("channel_id")
      .unique()
      .notNullable();

    t.integer("from_id");

    t.string("message");

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channels");
};
