import { Expense } from "../model/expense.model";
class ExpenseDao{
constructor(){}

public async getexpense(){
    
        return await Expense.find().exec();
  
      
}
public async addExpense(title:string,amount:number,date:Date,category:string){
const expense = new Expense({
  title:title,
  amount:amount,
  date:date,
   category:category,
});
 return await expense.save();

}
public async getExpenseById(id:string){
    
        return await Expense.findById(id).exec();
}
public async deleteExpense(id:string){
        
            return await Expense.findByIdAndDelete(id).exec();
            
    }
    public async updateExpense(id:string,title:string,amount:number,date:Date,category:string){
        return await Expense.findByIdAndUpdate(id,{
            title:title,
            amount:amount,
            date:date,
            category:category,
        },{new:true}).exec();
    }
}
export default ExpenseDao;