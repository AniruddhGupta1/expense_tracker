import mongoose from "mongoose";
import {
  IAddExpenseBody,
  IUpdateBodyExpense,
} from "../@types/expenseInterface";
import ExpenseDao from "../dao/expense.dao";
import createHttpError from "http-errors";

export default class ExpenseService {
  private expenseDao = new ExpenseDao();
  public getExpense = async () => {
    return await this.expenseDao.getExpense();
  };
  public addExpense = async (createExpensePayload: IAddExpenseBody) => {
    return await this.expenseDao.addExpense({ ...createExpensePayload });
  };
  public getExpenseById = async (id: string) => {
    return await this.expenseDao.getExpenseById(id);
  };
  public updateExpense = async (
    id: string,
    { title, amount, date, category }: IUpdateBodyExpense
  ) => {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid expense id ");
    }
    if (!title && !amount && !date && !category) {
      throw createHttpError(
        404,
        "All fields of expense should consist a value"
      );
    }
    const expense = await this.expenseDao.getExpenseById(id);
    if (!expense) {
      throw createHttpError(404, "No expense found");
    }
    return await this.expenseDao.updateExpense(id, {
      title,
      amount,
      date,
      category,
    });
  };
  public deleteExpense = async (id: string) => {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid expense id ");
    }
    const expense = await this.expenseDao.getExpenseById(id);
    if (!expense) {
      throw createHttpError(404, "No expense found");
    }
    return await this.expenseDao.deleteExpense(id);
  };
}
