module.exports = (knex, Cat) => {
  return (params) => {
    return knex("cats")
      .where("id", params)
      .del();
  };
};
