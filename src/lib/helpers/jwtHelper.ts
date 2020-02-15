import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const createToken = (
  payload: JwtPayload,
  secretKey: string,
) => {
  return jwt.sign( payload, secretKey);
};

export const getTokenFromBearerString = (bearerString: string): string => {
  const token = bearerString.split(' ')[1] ;
  return token;
};
