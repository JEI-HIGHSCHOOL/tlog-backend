import { HttpException } from '@/exceptions/HttpException';
import { PlanWithPlanMetaData } from '@/interfaces/plans.interface';
import { Plan, prisma, PrismaClient, User, UserPlan } from '@prisma/client';

class PlanLoader {
  public plans = new PrismaClient().plan;
  public userplans = new PrismaClient().userPlan;
  public user = new PrismaClient().user

  public async getPlan(id: string, user: User, include?: getPlanWithType): Promise<PlanWithPlanMetaData> {
    const planData = await this.userplans.findUnique({
      where: { id },
      include: {
        ...include,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
    }) as unknown as PlanWithPlanMetaData;
    if(!planData) throw new HttpException(400, '찾을 수 없는 계획입니다.');
    if(!planData.share && planData.userId !== user.id) throw new HttpException(400, '이 계획은 공유되지 않았습니다.');
    return planData;
  }
}

interface getPlanWithType {
  plans: boolean;
}

export default PlanLoader;
