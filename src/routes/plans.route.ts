import { Router } from 'express';
import PlansController from '@controllers/plans.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PlanAddDto } from '@/dtos/plans.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class PlansRoute implements Routes {
  public path = '/plans';
  public router = Router();
  public plansController = new PlansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(PlanAddDto, 'body'), this.plansController.createPlan);
    this.router.get(`${this.path}/:id`, authMiddleware, this.plansController.getPlan);
  }
}

export default PlansRoute;
