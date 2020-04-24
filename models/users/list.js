module.exports = (knex, User) => {
  return () => {
    return knex("users").then((users) => users.map((user) => new User(user)));
  };
};
