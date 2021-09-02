const router = require("express").Router();
const Question = require("../models/question_model");
const { question_validation } = require("../validation");

router.get("/", async (req, res) => {
  try {
    const question = await Question.find();
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).send("Unable to find given ID of question");
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const { error } = question_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question({
    question: req.body.question,
    answer: req.body.answer,
  });

  try {
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.remove({ _id: req.params.id });
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  const { error } = question_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const question = await Question.updateOne(
      { _id: req.params.id },
      {
        $set: {
          question: req.body.question,
          answer: req.body.answer,
        },
      }
    );
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
