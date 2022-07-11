import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { overview } from '@/interfaces/index.interface';

class IndexService {
  public users = new PrismaClient().user;
  public plans = new PrismaClient().plan;
  public userPlans = new PrismaClient().userPlan;

  public async getOverView(): Promise<overview> {
    const userCount = (await this.users.findMany()).length
    const plansCount = (await this.userPlans.findMany()).length
    const placeCount = (await this.plans.findMany()).length

    return {users: userCount, plans: plansCount, places: placeCount};
  }
}

export default IndexService;