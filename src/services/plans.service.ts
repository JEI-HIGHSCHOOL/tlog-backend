import { hash } from 'bcrypt';
import { PrismaClient, Plan, UserPlan } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { DBPlan, PlanWithPlanMetaData, RequestUserWithSearchLocation } from '@/interfaces/plans.interface';
import uuid4 from 'uuid4';
import PlanLoader from "@/utils/planloader";

class PlanService {
  public plans = new PrismaClient().plan;
  public userplans = new PrismaClient().userPlan;
  public user = new PrismaClient().user;
  public planloader = new PlanLoader();

  public async CreatePlan(req: RequestUserWithSearchLocation): Promise<boolean> {
    const { user, body: { plans } } = req;
    const plan_create_data = await this.userplans.create({
      data: {
        createdAt: new Date(),
        share: false,
        userId: user.id
      }
    })
    let dbplan: Plan[] = [];
    plans.forEach((plan_item) => {
      // @ts-ignore
      dbplan.push({
        place_id: plan_item.id,
        latitude: plan_item.latitude,
        longitude: plan_item.longitude,
        place_name: plan_item.place_name,
        place_phone: plan_item.place_phone,
        place_category_group_name: plan_item.place_category_group_name,
        place_address: plan_item.place_address,
        planId: plan_create_data.id,
      });
    })
    await this.plans.createMany({
      data: dbplan
    })
    return true;
  }

  public async getPlan(req: RequestWithUser): Promise<PlanWithPlanMetaData> {
    return await this.planloader.getPlan(req.params.id, req.user, { plans: true });;
  }
}

export default PlanService;
