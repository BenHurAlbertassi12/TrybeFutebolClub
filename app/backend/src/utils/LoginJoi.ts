import Joi = require('joi');

const errAll = 'All fields must be filled';
const errEaP = 'Invalid email or password';

const errMsg = {
  'string.empty': errAll,
  'string.email': errEaP,
  'string.required': errAll,
  'string.min': errEaP,
};

const LoginJoi = Joi.object({
  email: Joi.string().email().required().messages(errMsg),
  password: Joi.string().min(6).required().messages(errMsg),
});

export default LoginJoi;
