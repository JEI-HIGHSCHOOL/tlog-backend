import { NextFunction, Request, Response } from 'express';
import { Plan, User, UserPlan } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import userService from '@services/plans.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PlanWithPlanMetaData, RequestUserWithSearchLocation } from '@/interfaces/plans.interface';
import ResponseWrapper from '@/utils/responseWrapper';

class PlansController {
  public userService = new userService();

  public createPlan = async (req: RequestUserWithSearchLocation, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CreatePlanData: boolean = await this.userService.CreatePlan(req);

      ResponseWrapper(res, {data: CreatePlanData, message: '성공적으로 생성되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public getPlan = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPlanData: PlanWithPlanMetaData = await this.userService.getPlan(req);

      ResponseWrapper(res, {data: userPlanData});
    } catch (error) {
      next(error);
    }
  };
}

export default PlansController;
