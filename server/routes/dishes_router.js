const router = require("express").Router();
require("dotenv/config");

router.get("/", (req, res) => {
  res.send(process.env.SECRET);
});

module.exports = router;
