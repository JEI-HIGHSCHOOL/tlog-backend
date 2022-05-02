import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import ResponseWrapper from '@/utils/responseWrapper';
import { HttpException } from '@/exceptions/HttpException';

class AuthController {
  public authService = new AuthService();

  public me = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      userData.password = undefined;
      if(!userData) throw new HttpException(401, 'Unauthorized');
      ResponseWrapper(res, {data: userData})
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      ResponseWrapper(res, {data: signUpUserData, message: '회원가입이 완료되었습니다.'});
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, token } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      ResponseWrapper(res, {data: token, message: '성공적으로 로그인 되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      ResponseWrapper(res, {data: logOutUserData, message: '로그아웃 되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public EmailVerify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string = req.body.email
      const EmailSendData: number = await this.authService.verify(email);
      ResponseWrapper(res, {data: EmailSendData, message: "이메일로 인증번호를 보냈습니다."})
    } catch (error) {
      next(error);
    }
  };

  public EmailVerifyCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {token, id} = req.body
      const CheckEmailData: boolean = await this.authService.verifyCheck(token, id)
      ResponseWrapper(res, {data: CheckEmailData, message: "이메일 인증이 완료되었습니다"})
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
