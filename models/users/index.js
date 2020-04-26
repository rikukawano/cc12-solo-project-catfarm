const moment = require("moment");
// { id: 52, username: 'rp-3', created_at: 2020-04-23T08:11:59.365Z }
const User = function(dbUser) {
  this.id = dbUser.id;
  this.username = dbUser.username;
  this.money = dbUser.money;
  this.createdAt = new Date(dbUser.created_at);
};

User.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    username: this.username,
    money: this.money,
    createdAt: moment(this.createdAt).format("hh:mm:ss"),
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, User),
    get: require("./get")(knex, User),
    update: require("./update")(knex, User),
  };
};
