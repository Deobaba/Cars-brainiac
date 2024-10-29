import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import { ENVIRONMENT } from '../config/env';


// generate token
export const generateToken = (user: IUser) => {
  return jwt.sign({ id:user.id,usertype:user.usertype }, ENVIRONMENT.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// verify token 
export const verifyToken = (token: string) => {
  return jwt.verify(token, ENVIRONMENT.JWT_SECRET as string);
};