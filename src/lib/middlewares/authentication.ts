import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTokenFromBearerString } from '../helpers/jwtHelper';
import { getConfig } from '../../config/config';
import { logger } from '../../shared/logger';

export function auth(req: Request, res: Response, next: NextFunction) {
  if(req.headers.authorization) {
    logger.info('found auth headers', req.headers.authorization);
    const bearerString: string = req.headers.authorization;
    const token = getTokenFromBearerString(bearerString);
    const { secretKey, expiresIn, expirationUnit } = getConfig().jwt;
    try {
      const payload = jwt.verify(token, secretKey, { maxAge: `${expiresIn}${expirationUnit}`});
      req.user = payload;
    } catch(error) {
      logger.info(`token error message, ${error.message}`);
    }
  }
  next();
}
