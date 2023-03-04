import LoginJoi from './LoginJoi';

interface IUser {
  email: string;
  password: string;
}

const LoginUser = (body: IUser) => {
  const { error } = LoginJoi.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new Error(errors.join(', '));
  }
};

export default LoginUser;

/*
em grosso modo "abortEarly" serve para não para logo na primeira falha de validação
https://joi.dev/api/?v=17.8.3
*/
