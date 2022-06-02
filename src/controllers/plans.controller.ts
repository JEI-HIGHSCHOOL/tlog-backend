import { NextFunction, Request, Response } from 'express';
import { Plan, User, UserPlan } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import userService from '@services/plans.service';
import { RequestWithUser, RequestWithUserCheck } from '@/interfaces/auth.interface';
import { PlanWithPlanMetaData, RequestUserWithSearchLocation, UserPlanWithOwner } from '@/interfaces/plans.interface';
import ResponseWrapper from '@/utils/responseWrapper';

class PlansController {
  public userService = new userService();

  public createPlan = async (req: RequestUserWithSearchLocation, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CreatePlanData: string = await this.userService.CreatePlan(req);

      ResponseWrapper(res, {data: CreatePlanData, message: '성공적으로 생성되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public getPlan = async (req: RequestWithUserCheck, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPlanData: PlanWithPlanMetaData = await this.userService.getPlan(req);

      ResponseWrapper(res, {data: userPlanData});
    } catch (error) {
      next(error);
    }
  };

  public deletePlan = async (req: RequestUserWithSearchLocation, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deletePlanData: string = await this.userService.deletePlan(req);

      ResponseWrapper(res, {data: deletePlanData, message: '성공적으로 삭제되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public addPlanImage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uploadPlanImageData: any = await this.userService.uploadPlanImage(req);

      ResponseWrapper(res, {message: '성공적으로 업로드 되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public getMyPlan = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPlanData: UserPlanWithOwner = await this.userService.getMyPlan(req);

      ResponseWrapper(res, {data: userPlanData});
    } catch (error) {
      next(error);
    }
  };
}

export default PlansController;
