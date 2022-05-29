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
    if(!planData.share) {
      if(!user) throw new HttpException(400, '이 계획은 공유되지 않았습니다.');
      if(planData.userId !== user.id) throw new HttpException(400, '이 계획은 공유되지 않았습니다.');
    }
    return planData;
  }

  public async deletePlan(plan_id: string, id: string, user: User): Promise<string> {
    const plan = await this.plans.findUnique({
      where: { id },
      include: {
        plan: true
      }
    })
    if(!plan) throw new HttpException(400, '찾을 수 없는 계획입니다.');
    if(plan.planId !== plan_id) throw new HttpException(400, '찾을 수 없는 계획입니다.');
    if(!user || user.id !== plan.plan.userId) throw new HttpException(400, '이 계획을 관리할 권한이 없습니다');
    await this.plans.delete({where: { id }})
    return id;
  }
}

interface getPlanWithType {
  plans: boolean;
}

export default PlanLoader;
