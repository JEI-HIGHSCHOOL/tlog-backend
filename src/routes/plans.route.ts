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
  public plansController = new PlansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(PlanAddDto, 'body'), this.plansController.createPlan);
    this.router.delete(`${this.path}/:plan_id/:id`, authMiddleware, this.plansController.deletePlan);
    this.router.post(`${this.path}/:plan_id/:id/image`, authMiddleware, imageUpload.single('img'), this.plansController.addPlanImage);
    this.router.get(`${this.path}/me`, authMiddleware, this.plansController.getMyPlan);
    this.router.get(`${this.path}/:id`, withAuthMiddleware, this.plansController.getPlan);
  }
}

export default PlansRoute;
