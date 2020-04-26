const moment = require("moment");

const Cat = function(dbCat) {
  this.id = dbCat.id;
  this.catId = dbCat.cat_id;
  this.name = dbCat.name;
  this.buyPrice = dbCat.buyPrice;
  this.sellPrice = dbCat.sellPrice;
  this.ownerId = dbCat.owner_id;
  this.url = dbCat.url;
  this.createdAt = new Date(dbCat.created_at);
};

Cat.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    catId: this.catId,
    name: this.name,
    buyPrice: this.buyPrice,
    sellPrice: this.sellPrice,
    ownerId: this.owner_id,
    url: this.url,
    createdAt: moment(this.createdAt).format("hh:mm:ss"),
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Cat),
    list: require("./list")(knex, Cat),
    remove: require("./remove")(knex, Cat),
  };
};
