const router = require("express").Router();
const Dish = require("../models/dish_model");
const { dish_validation } = require("../validation");

router.get("/", async (req, res) => {
  try {
    const dish = await Dish.find();
    res.json(dish);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).send("Unable to find given ID of dish");
    res.json(dish);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const { error } = dish_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const dish = new Dish({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const savedDish = await dish.save();
    res.json(savedDish);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dish = await Dish.remove({ _id: req.params.id });
    res.json(dish);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  const { error } = dish_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const dish = await Dish.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
        },
      }
    );
    res.json(dish);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
