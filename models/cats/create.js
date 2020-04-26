module.exports = (knex, Cat) => {
  return (params) => {
    // TODO handle invalid inputs

    return knex("cats")
      .insert({
        cat_id: params.cat_id,
        name: params.name,
        buyPrice: params.buyPrice,
        sellPrice: params.sellPrice,
        owner_id: params.owner_id,
        url: params.url,
      })
      .then(() => {
        return knex("cats")
          .where({ cat_id: params.cat_id })
          .first();
      })
      .then((cat) => new Cat(cat))
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That cat already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
