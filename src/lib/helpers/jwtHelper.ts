import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const createToken = (payload: JwtPayload, secretKey: string, expiresIn: string | number) =>
  jwt.sign(payload, secretKey, { expiresIn});

export const getTokenFromBearerString = (bearerString: string): string => {
  const token = bearerString.split(' ')[1] ;
  return token;
};
