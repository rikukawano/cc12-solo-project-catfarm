module.exports = (knex, channelMessage) => {
  return (params) => {
    return knex("channel_messages")
      .insert({
        from_id: params.fromId,
        channel_id: params.channelId,
        message: params.message,
      })
      .then(() => {
        return knex("channel_messages")
          .where({ channel_id: params.channelId })
          .select()
          .first();
      })
      .then((message) => {
        const username = knex
          .select("username")
          .from("users")
          .where("id", params.fromId)
          .first();

        const channelName = knex
          .select("name")
          .from("channels")
          .where("id", params.channelId)
          .first();

        return Promise.all([username, channelName]).then(
          ([username, channelName]) => {
            message.from = username.username;
            message.to = channelName.name;
            return message;
          }
        );
      })
      .then((message) => [new channelMessage(message)])
      .catch((err) => {
        // throw errors
        return Promise.reject(err);
      });
  };
};
