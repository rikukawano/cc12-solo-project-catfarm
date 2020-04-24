module.exports = (knex, ChannelMessage) => {
  return (params) => {
    return knex("channel_messages")
      .where("channel_id", params.channelId)
      .then((messages) => {
        return Promise.all(
          messages.map((message) => {
            const username = knex
              .select("username")
              .from("users")
              .where("id", message.from_id)
              .first();

            const channelName = knex
              .select("name")
              .from("channels")
              .where("id", message.channel_id)
              .first();

            return Promise.all([username, channelName])
              .then(([username, channelName]) => {
                message.from = username.username;
                message.to = channelName.name;
                return message;
              })
              .then((message) => new ChannelMessage(message));
          })
        );
      });
  };
};
