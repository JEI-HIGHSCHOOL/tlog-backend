import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EmailVerify, PrismaClient, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { CreateUserDto, EmailVerifyDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { generateRandomCode, isEmpty } from '@utils/util';
import sendMail from '@/utils/mailsendr';

class AuthService {
  public users = new PrismaClient().user;
  public emailVerify = new PrismaClient().emailVerify;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "유저 정보가 없습니다");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `이미 가입된 유저입니다.`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "유저를 찾을 수 었습니다");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `올바르지 않은 아이디 입니다`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "일치하지 않는 비밀번호 입니다");

    const token = this.createToken(findUser);
    const cookie = this.createCookie(token);
    return { cookie, token };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async verify(email: string): Promise<number> {
    if (isEmpty(email)) throw new HttpException(400, '이메일 정보가 없습니다');
    const findUser: User = await this.users.findUnique({ where: { email } });
    if(findUser) throw new HttpException(400, '이미 가입된 유저입니다');
    const token = generateRandomCode(6);
    await sendMail(email, `이메일 인증 코드: ${token}`);
    const verifyData: EmailVerify = await this.emailVerify.create({
      data: { email: email, token: token, createdAt: new Date() },
    });
    return verifyData.id;
  }

  public async verifyCheck(token: string, id: string): Promise<boolean> {
    if (isEmpty(token)) throw new HttpException(400, '인증코드 정보가 없습니다');
    if (isEmpty(id)) throw new HttpException(400, '인증 아이디 정보가 없습니다');
    const verifyData: EmailVerify = await this.emailVerify.findUnique({
      where: { id: Number(id) }
    });
    if(!verifyData) throw new HttpException(400, '찾을 수 없는 인증번호 입니다');
    if(verifyData.token !== token) throw new HttpException(400, '인증번호가 올바르지 않습니다');
    return true;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
