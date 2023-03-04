import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

interface IPayload {
  id: number;
  email: string;
  password: string;
  role: string;
  username: string;
}

dotenv.config();

function JWToken(payload: IPayload): string {
  return sign(payload, process.env.JWT_SECRET as string);
}

export function CleanToken(token: string) {
  return verify(token, process.env.JWT_SECRET as string);
}

export default JWToken;
