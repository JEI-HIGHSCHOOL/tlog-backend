import { hash } from 'bcrypt';
import { PrismaClient, Plan, UserPlan } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RequestWithUser, RequestWithUserCheck } from '@/interfaces/auth.interface';
import { PlanWithPlanMetaData, RequestUserWithSearchLocation, UserPlanWithOwner } from '@/interfaces/plans.interface';
import sharp from "sharp"
import PlanLoader from "@/utils/planloader";
import fs from 'fs'

class PlanService {
  public plans = new PrismaClient().plan;
  public userplans = new PrismaClient().userPlan;
  public user = new PrismaClient().user;
  public planloader = new PlanLoader();

  public async CreatePlan(req: RequestUserWithSearchLocation): Promise<string> {
    const { user, body: { plans, title } } = req;
    const plan_create_data = await this.userplans.create({
      data: {
        title: title,
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
    return plan_create_data.id;
  }

  public async getPlan(req: RequestWithUserCheck): Promise<PlanWithPlanMetaData> {
    return await this.planloader.getPlan(req.params.id, req.user, { plans: true });;
  }

  public async deletePlan(req: RequestWithUser): Promise<string> {
    return await this.planloader.deletePlan(req.params.plan_id, req.params.id, req.user);;
  }

  public async getMyPlan(req: RequestWithUser): Promise<UserPlanWithOwner> {
    return await this.planloader.getMyPlan(req.user);
  }

  public async uploadPlanImage(req: RequestWithUser): Promise<string> {
    sharp(req.file.path)
      .resize({ width: 600 })
      .withMetadata()
      .toBuffer((err, buffer) => {
        if (err) throw err;
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });
    return await this.planloader.uploadPlanImage(req.params.id, req.file);
  }
}

export default PlanService;
