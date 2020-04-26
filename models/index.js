module.exports = function(knex) {
  return {
    users: require("./users")(knex),
    cats: require("./cats")(knex),
  };
};
