import { RequestHandler } from "express";
import {
  IAddExpenseBody,
  IUpdateBodyExpense,
  IUpdateParams,
} from "../@types/expenseInterface";
import ExpenseService from "../services/expense.service";
class ExpenseController {
  private expenseService = new ExpenseService();
  public getexpense: RequestHandler = async (req, res, next) => {
    try {
      const expenses = await this.expenseService.getExpense();
      res.status(200).json(expenses);
    } catch (err) {
      next(err);
    }
  };

  public addExpense: RequestHandler<
    unknown,
    unknown,
    IAddExpenseBody,
    unknown
  > = async (req, res, next) => {
    const reqBody = req.body;
    try {
      const expense = await this.expenseService.addExpense(reqBody);
      res.status(201).json(expense);
    } catch (err) {
      next(err);
    }
  };
  public getexpenseById: RequestHandler<{ id: string }> = async (
    req,
    res,
    next
  ) => {
    const { id: expenseId } = req.params;
    try {
      const expense = await this.expenseService.getExpenseById(expenseId);
      res.status(200).json(expense);
    } catch (err) {
      next(err);
    }
  };
  public updateExpense: RequestHandler<
    IUpdateParams,
    unknown,
    IUpdateBodyExpense,
    unknown
  > = async (req, res, next) => {
    const { id: expenseId } = req.params;
    const reqBody = req.body;
    try {
      const newExpense = await this.expenseService.updateExpense(expenseId, reqBody);
      res.status(200).json(newExpense);
    } catch (err) {
      next(err);
    }
  };
  public deleteExpense: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
      
      const expense = await this.expenseService.deleteExpense(id);
      res.status(200).json(expense);
    } catch (err) {
      next(err);
    }
  };
}
export default ExpenseController;
