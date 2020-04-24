module.exports = (knex, UserMessage) => {
  return (params) => {
    return knex("user_messages")
      .insert({
        from_id: params.fromId,
        to_id: params.toId,
        message: params.message,
      })
      .then(() => {
        return knex("user_messages")
          .where({
            from_id: params.fromId,
            to_id: params.toId,
            message: params.message,
          })
          .first();
      })
      .then((message) => {
        const username = knex("users") // { username: 'rp-3' }
          .select("username")
          .where("id", message.from_id)
          .first();

        return Promise.all([username]).then((username) => {
          message.from = username[0].username;

          return message;
        });
      })
      .then((message) => [new UserMessage(message)]);
  };
};
