const validateUsername = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 2;

module.exports = (knex, User) => {
  return (params) => {
    const userName = params.username;

    if (!validateUsername(userName)) {
      return Promise.reject(
        new Error("Username must be provided, and be at least two characters")
      );
    }

    return knex("users")
      .insert({ username: userName })
      .then(() => {
        return knex("users")
          .where({ username: userName })
          .first();
      })
      .then((users) => new User(users))
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That username already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
