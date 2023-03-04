import { Request, Response, NextFunction } from 'express';
import { CleanToken } from './JWToken';

const Token = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  let decoder;
  try {
    decoder = await CleanToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  res.locals.user = decoder;
  next();
};

export default Token;

/*
let decoder serve para armazenar o resultado do token
tentei colocar ele direto mas deu erro, como assim não deu problema no lint
deixei assim
*/
