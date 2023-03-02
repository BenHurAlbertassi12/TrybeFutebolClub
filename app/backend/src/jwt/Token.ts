import * as jsonwebtoken from 'jsonwebtoken';

interface ILogin {
  email: string;
  password: string;
  username?: string;
}
function Token(user: ILogin) {
  const payload = { email: user.email, username: user.username };
  const secret = process.env.JWT_SECRET as string;
  const jwt = jsonwebtoken;
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
}

export default Token;
