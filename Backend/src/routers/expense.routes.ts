import express from "express"
import ExpenseController from "../controller/expense";
class ExpenseRouter{
    private router:express.Router;
    private expensecontroller:ExpenseController;
constructor(){
    this.router = express.Router();
    this.expensecontroller = new ExpenseController();
    this.initialiseRouters()
}
public initialiseRouters(){
this.router.get('/api/expenses', this.expensecontroller.getexpense);
this.router.post('/api/expenses', this.expensecontroller.addExpense);
this.router.get('/api/expenses/:id', this.expensecontroller.getexpenseById);
this.router.patch('/api/expenses/:id', this.expensecontroller.updateExpense);
this.router.delete('/api/expenses/:id',this.expensecontroller.deleteExpense);
}
public getRouter(){
    return this.router;
}
}
export default  ExpenseRouter;