const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    return knex("channels")
      .insert({ name: params.name })
      .then(() => {
        return knex("channels")
          .where({ name: params.name })
          .select();
      })
      .then((channel) => new Channel(channel));
  };
};
