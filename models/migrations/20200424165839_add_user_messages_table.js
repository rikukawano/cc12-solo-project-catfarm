exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_messages", (t) => {
    t.increments().index();

    t.integer("from_id").notNullable();
    t.foreign("from_id")
      .references("id") // column
      .inTable("users"); // table

    t.integer("to_id").notNullable();
    t.foreign("to_id")
      .references("id")
      .inTable("users");

    t.string("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_messages");
};
