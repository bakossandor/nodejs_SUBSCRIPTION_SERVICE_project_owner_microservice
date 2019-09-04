const Joi = require('@hapi/joi');

const projectOwnerSchema = {
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
  subscription_type: Joi.number().integer().min(0).max(2).required()
}

function validateProjectOwner(projectOwner) {
  const { error } = Joi.validate(projectOwner, projectOwnerSchema);
  if (error) {
    switch (error.details[0].context.key) {
      case "email":
        return "You must provide a valide email adress"
      case "username":
        return "You must provide an username"
      case "password":
        return "You must provide a valid password which has to be at least 8 character, including an uppercase, a lowercase and a number"
      case "subscription_type":
        return "Problem with the subscription type"
      case "default":
        return "invalid credentials"
    }
  }
  return false;
}

module.exports = validateProjectOwner;