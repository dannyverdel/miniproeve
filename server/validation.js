const Joi = require("joi");

const dish_validation = (obj) => {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
  };

  return Joi.validate(obj, schema);
};

const question_validation = (obj) => {
  const schema = {
    question: Joi.string().required(),
    answer: Joi.string().required(),
  };

  return Joi.validate(obj, schema);
};

module.exports.dish_validation = dish_validation;
module.exports.question_validation = question_validation;
