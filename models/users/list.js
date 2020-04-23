module.exports = (knex, User) => {
  return () => {
    return knex("users").then((users) =>
      users.map((element) => new User(element))
    );
  };
};
