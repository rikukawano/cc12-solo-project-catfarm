exports.up = function(knex, Promise) {
  return knex.schema.createTable("cats", (t) => {
    t.increments().index();

    t.integer("cat_id").notNullable();

    t.string("name")
      .notNullable()
      .index();

    t.integer("buyPrice").notNullable();
    t.integer("sellPrice").notNullable();

    // foreign key referencing user. one-to-many relationship
    t.integer("owner_id");
    t.foreign("owner_id")
      .references("id")
      .inTable("users");

    t.string("url");

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cats");
};
