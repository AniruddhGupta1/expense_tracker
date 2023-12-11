import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ service: 'expense-tracker' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
