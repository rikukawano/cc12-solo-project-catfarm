exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("users", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("username", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.integer("money").defaultTo(1000); // sets default value on insert

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("users");
};
