import express from "express";
import UserController from "../controller/user.controller";
import ExpenseController from "../controller/expense.controller";
export default class ExternalRoutes {
  public router: express.Router;
  private usercontroller: UserController;
  private expensecontroller: ExpenseController;
  private path: string;
  constructor() {
    this.router = express.Router();
    this.path = "/api/external";
    this.usercontroller = new UserController();
    this.expensecontroller = new ExpenseController();
    this.initialiseExpenseRoutes(`${this.path}/expenses`);
    this.initialiseUserRoutes(`${this.path}/user`);
  }

  public initialiseExpenseRoutes(prefix: string) {
    this.router.get(`${prefix}/`, this.expensecontroller.getexpense);
    this.router.post(`${prefix}`, this.expensecontroller.addExpense);
    this.router.get(`${prefix}/:id`, this.expensecontroller.getexpenseById);
    this.router.put(`${prefix}/:id`, this.expensecontroller.updateExpense);
    this.router.delete(`${prefix}/:id`, this.expensecontroller.deleteExpense);
  }

  public initialiseUserRoutes(prefix: string) {
    this.router.post(`${prefix}/signup`, this.usercontroller.signUp);
    this.router.post(`${prefix}/login`, this.usercontroller.login);
    this.router.post(`${prefix}/logout`, this.usercontroller.logout);
  }
}
