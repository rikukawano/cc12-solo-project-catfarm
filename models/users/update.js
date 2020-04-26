module.exports = (knex) => {
  return async (params) => {
    const userMoney = await knex("users")
      .where("id", params.id)
      .select("money")
      .first();

    const newMoney = (await params.buy)
      ? userMoney.money - params.price
      : userMoney.money + params.price;

    return knex("users")
      .where({ id: params.id })
      .update({ money: newMoney })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
