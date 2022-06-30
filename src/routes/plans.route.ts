import { Router } from 'express';
import PlansController from '@controllers/plans.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PlanAddDto } from '@/dtos/plans.dto';
import authMiddleware, { withAuthMiddleware } from '@/middlewares/auth.middleware';
import { imageUpload } from '@/utils/multer';

class PlansRoute implements Routes {
  public path = '/plans';
  public router = Router();
  public planController = new PlansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(PlanAddDto, 'body'), this.planController.createPlan);
    this.router.delete(`${this.path}/:plan_id/:id`, authMiddleware, this.planController.deletePlan);
    this.router.get(`${this.path}/:plan_id/:id/detail`, authMiddleware, this.planController.getPlanDetail);
    this.router.post(`${this.path}/:plan_id/:id/image`, authMiddleware, imageUpload.single('img'), this.planController.addPlanImage);
    this.router.get(`${this.path}/suggest`, this.planController.suggestPlan);
    this.router.get(`${this.path}/me`, authMiddleware, this.planController.getMyPlan);
    this.router.get(`${this.path}/:id`, withAuthMiddleware, this.planController.getPlan);
  }
}

export default PlansRoute;
