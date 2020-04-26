const express = require("express");

module.exports = (models) => {
  /**
   * Controller Logic
   */
  const createUser = (req, res) =>
    models.users
      .create({ username: req.body.username })
      .then((user) => res.status(201).json(user.serialize()))
      .catch((err) => {
        if (err.message === "That username already exists") {
          return models.users
            .get({ username: req.body.username })
            .then((user) => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      });

  const getUser = (req, res) => {
    models.users
      .get({ username: req.params.username })
      .then((user) => res.status(200).json(user.serialize()))
      .catch((err) => res.status(400).send(err.message));
  };

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createUser);
  router.get("/:username", getUser);

  return router;
};
