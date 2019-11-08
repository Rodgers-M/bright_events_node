import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

interface JwtExpiration {
  expiresIn: string;
}

export const createToken = (payload: JwtPayload, secretKey: string, expiresIn: JwtExpiration) =>
  jwt.sign(payload, secretKey, expiresIn);
