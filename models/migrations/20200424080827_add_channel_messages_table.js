exports.up = function(knex, Promise) {
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments().index();

    t.integer("channel_id")
      .unsigned()
      .notNullable();
    t.foreign("channel_id")
      .references("id")
      .inTable("channels");

    t.integer("from_id")
      .unsigned()
      .notNullable();
    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.string("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channel_messages");
};
