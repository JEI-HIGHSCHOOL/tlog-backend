import { HttpException } from '@/exceptions/HttpException';
import { Plans, PrismaClient, User } from '@prisma/client';

class PlanLoader {
  public plans = new PrismaClient().plans;
  public userplans = new PrismaClient().userPlan;

  public async getPlan(id: string, user: User): Promise<Plans[]> {
    const planData = await this.userplans.findFirst({
        where: {
            plan_id: id
        }
    })
    if(!planData.share && planData.userId !== user.id) throw new HttpException(400, '해당 계획은 공유되지 않았습니다.');
    const plan = await this.plans.findMany({
        where: {
            plan_id: id
        }
    })

    
    return plan;
  }
}

export default PlanLoader;
