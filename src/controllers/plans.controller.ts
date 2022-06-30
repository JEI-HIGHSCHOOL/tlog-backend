import { NextFunction, Request, Response } from 'express';
import { Plan, User, UserPlan } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import PlanService from '@services/plans.service';
import { RequestWithUser, RequestWithUserCheck } from '@/interfaces/auth.interface';
import { PlanWithPlanMetaData, RequestUserWithSearchLocation, UserPlanWithOwner } from '@/interfaces/plans.interface';
import ResponseWrapper from '@/utils/responseWrapper';

class PlansController {
  public planService = new PlanService();

  public createPlan = async (req: RequestUserWithSearchLocation, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CreatePlanData: string = await this.planService.CreatePlan(req);

      ResponseWrapper(res, {data: CreatePlanData});
    } catch (error) {
      next(error);
    }
  };

  public suggestPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const SuggestPlanData: UserPlan[] = await this.planService.suggestPlan();

      ResponseWrapper(res, {data: SuggestPlanData});
    } catch (error) {
      next(error);
    }
  };

  public getPlan = async (req: RequestWithUserCheck, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPlanData: PlanWithPlanMetaData = await this.planService.getPlan(req);

      ResponseWrapper(res, {data: userPlanData});
    } catch (error) {
      next(error);
    }
  };

  public getPlanDetail = async (req: RequestWithUserCheck, res: Response, next: NextFunction): Promise<void> => {
    try {
      const planDetailData: Plan = await this.planService.getPlanDetail(req);

      ResponseWrapper(res, {data: planDetailData});
    } catch (error) {
      next(error);
    }
  };

  public deletePlan = async (req: RequestUserWithSearchLocation, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deletePlanData: string = await this.planService.deletePlan(req);

      ResponseWrapper(res, {data: deletePlanData, message: '성공적으로 삭제되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public addPlanImage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uploadPlanImageData: any = await this.planService.uploadPlanImage(req);

      ResponseWrapper(res, {message: '성공적으로 업로드 되었습니다'});
    } catch (error) {
      next(error);
    }
  };

  public getMyPlan = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPlanData: UserPlanWithOwner = await this.planService.getMyPlan(req);

      ResponseWrapper(res, {data: userPlanData});
    } catch (error) {
      next(error);
    }
  };
}

export default PlansController;
