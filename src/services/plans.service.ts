import { hash } from 'bcrypt';
import { Plans, PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { DBPlan, RequestUserWithSearchLocation } from '@/interfaces/plans.interface';
import uuid4 from 'uuid4';
import PlanLoader from "@/utils/planloader";

class PlanService {
  public plans = new PrismaClient().plans;
  public userplans = new PrismaClient().userPlan;
  public user = new PrismaClient().user;
  public planloader = new PlanLoader();

  public async CreatePlan(req: RequestUserWithSearchLocation): Promise<boolean> {
    const { user, body: { plans } } = req;
    const planId = uuid4();
    let dbplan: DBPlan[] = [];
    plans.forEach((plan) => {
      dbplan.push({
        plan_id: planId,
        place_id: plan.id,
        latitude: plan.latitude,
        longitude: plan.longitude,
        place_name: plan.place_name,
        place_phone: plan.place_phone,
        place_category_group_name: plan.place_category_group_name,
        place_address: plan.place_address,
        userId: user.id
      });
    })
    await this.plans.createMany({
      data: dbplan
    })
    await this.userplans.create({
      data: {
        plan_id: planId,
        createdAt: new Date(),
        share: false,
        userId: user.id
      }
    })
    console.log(await this.plans.findMany({
      where: {
        user: {
          id: user.id
        }
      }
    }))
    return true;
  }

  public async getPlan(req: RequestWithUser): Promise<Plans[]> {
    return await this.planloader.getPlan(req.params.id, req.user);;
  }
}

export default PlanService;
