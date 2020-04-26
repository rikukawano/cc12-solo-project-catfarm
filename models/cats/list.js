module.exports = (knex, Cat) => {
  return (params) => {
    return knex("cats")
      .where("owner_id", params.ownerId)
      .then((cats) => cats.map((cat) => new Cat(cat)));
  };
};
