module.exports = (knex, User) => {
  return (params) => {
    const userName = params.username;

    return knex("users")
      .where({ username: userName })
      .select()
      .then((users) => {
        if (users.length) return new User(users.pop());

        throw new Error(`Error finding user ${userName}`);
      });
  };
};
