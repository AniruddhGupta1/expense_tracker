import { RequestHandler } from "express";
import { ISignUpBody, ILoginBody } from "../@types/userInterface";
import UserService from "../services/user.service";
import UserDao from "../dao/user.dao";
class UserController {
  private userDao: UserDao;
  private userService:UserService
  constructor() {
    this.userDao = new UserDao();
    this.userService=new UserService();
  }
  public signUp: RequestHandler<unknown, unknown, ISignUpBody, unknown> = async (
    req,
    res,
    next
  ) => {
    const reqBody = req.body;
    try {
      const newuser = await this.userService.signUp(reqBody);
      
      // this is how password is to be has
      req.session.userId = newuser._id;
      res.status(201).json(newuser);
    } catch (err) {
      next(err);
    }
  };

  public login: RequestHandler<unknown, unknown, ILoginBody, unknown> = async (
    req,
    res,
    next
  ) => {
    const reqBody = req.body;
    try {
      const existinguser = await this.userService.login(reqBody);
      req.session.userId = existinguser._id;
      res.status(201).json(existinguser);
    } catch (error) {
      next(error);
    }
  };
  public logout: RequestHandler = async (req, res, next) => {
    req.session.destroy((error) => {
      if (error) next(error);
      else res.sendStatus(201);
    });
  };
}
export default UserController;
