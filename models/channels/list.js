module.exports = (knex, Channel) => {
  return () => {
    return knex("channels").then((channels) =>
      channels.map((channel) => new Channel(channel))
    );
  };
};
