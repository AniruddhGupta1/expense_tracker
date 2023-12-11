import { IAddExpenseBody, IUpdateBodyExpense } from "../@types/expenseInterface";
import { Expense } from "../model/expense.model";
class ExpenseDao {
  private expenseModel = Expense;
  constructor() {}

  public getExpense = async () => {
    return await this.expenseModel.find().exec();
  };
  public async addExpense({ title, amount, date, category }: IAddExpenseBody) {
    const expense = new Expense({
      title: title,
      amount: amount,
      date: date,
      category: category,
    });
    return await expense.save();
  }
  public async getExpenseById(id: string) {
    return await Expense.findById(id).exec();
  }
  public async deleteExpense(id: string) {
    return await Expense.findByIdAndDelete(id).exec();
  }
  public async updateExpense(
    id: string,
    { title, amount, date, category }: IUpdateBodyExpense
  ) {
    return await Expense.findByIdAndUpdate(
      id,
      {
        title: title,
        amount: amount,
        date: date,
        category: category,
      },
      { new: true }
    ).exec();
  }
}
export default ExpenseDao;
