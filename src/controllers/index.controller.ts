import { NextFunction, Request, Response } from 'express';
import IndexService from '@/services/index.service';
import ResponseWrapper from '@/utils/responseWrapper';
import { overview } from '@/interfaces/index.interface';
class IndexController {
  public IndexService = new IndexService();
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({"Hello": "World", "Travel": "API"});
    } catch (error) {
      next(error);
    }
  };

  public overview = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CreatePlanData: overview = await this.IndexService.getOverView();

      ResponseWrapper(res, {data: CreatePlanData});
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
