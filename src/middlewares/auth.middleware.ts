import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser, RequestWithUserCheck } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { id: userId }});
      findUser.password = undefined;
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, '잘못된 유저 토큰입니다'));
      }
    } else {
      next(new HttpException(401, '유저 토큰정보가 없습니다'));
    }
  } catch (error) {
    next(new HttpException(401, '유저 토큰정보가 없습니다'));
  }
};

const withAuthMiddleware = async (req: RequestWithUserCheck, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { id: userId } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        req.user = null;
        next();
      }
    } else {
      req.user = null;
      next();
    }
  } catch (error) {
    req.user = null;
    next();
  }
};

export default authMiddleware;

export { withAuthMiddleware };
