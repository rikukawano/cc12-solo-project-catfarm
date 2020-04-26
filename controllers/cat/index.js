const express = require("express");
const data = require("../data");

module.exports = (models) => {
  /**
   * Controller Logic
   */
  const createCat = (req, res) => {
    const catSelection = data.cats.find((cat) => cat.id === req.body.cat_id);
    models.cats
      .create({
        cat_id: req.body.cat_id,
        name: catSelection.name,
        buyPrice: catSelection.buyPrice,
        sellPrice: catSelection.sellPrice,
        owner_id: req.body.owner_id,
        url: catSelection.url,
      })
      .then((cat) => res.status(201).json(cat.serialize()))
      .catch((err) => {
        if (err.message === "That cat already exists") {
          return models.cats
            .get({ owner_id: req.body.owner_id })
            .then((cat) => res.status(200).json(cat.serialize()));
        }

        return res.status(400).send(err.message);
      });

    models.users.update({
      id: req.body.owner_id,
      price: catSelection.buyPrice,
      buy: true,
    });
  };

  const listCats = (req, res) => {
    models.cats
      .list({ ownerId: req.params.id })
      .then((cats) => cats.map((cat) => cat.serialize()))
      .then((cats) => res.status(200).json(cats))
      .catch((err) => res.status(400).send(err.message));
  };

  const sellCat = (req, res) => {
    models.cats
      .remove(req.params.id)
      .then(() => res.status(200).end())
      .catch((err) => res.status(400).send(err.message));

    const catSelection = data.cats.find((cat) => cat.name === req.params.name);

    models.users.update({
      id: req.params.ownerId,
      price: catSelection.sellPrice,
      buy: false,
    });
  };

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createCat);
  router.get("/:id", listCats);
  router.delete("/:id/:name/:ownerId", sellCat);

  return router;
};
