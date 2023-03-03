import * as Joi from 'joi';

interface ILogin {
  email: string;
  password: string;
}

const loginJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginValidate = (body: ILogin) => {
  const { error } = loginJoi.validate(body);
  if (error) return 'All fields must be filled';
};

export default LoginValidate;
