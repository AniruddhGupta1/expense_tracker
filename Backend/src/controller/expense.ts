import {  RequestHandler } from "express";
import mongoose from "mongoose"
import createHttpError from "http-errors";
import ExpenseDao from "../dao/expense.dao";
import { addExpenseBody,updateParams,updateBodyExpense } from "../@types/expenseInterface";
class ExpenseController{
    public expenseDao :ExpenseDao;
constructor(){
this.expenseDao=new ExpenseDao();
}
 public getexpense:RequestHandler =  async (req,res,next) => {
    try{
        const expenses = await this.expenseDao.getexpense();
        res.status(200).json(expenses);
    }
    catch(err){
        next(err);
    }
}


 public addExpense:RequestHandler<unknown,unknown,addExpenseBody,unknown> = async (req,res,next) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const date = req.body.date;
    const category = req.body.category;
    try{
     if(!title || !amount || !date || !category)
     throw createHttpError(400,"All fields of expense should consist a value");
     const expense = await this.expenseDao.addExpense(title,amount,date,category);
      res.status(201).json(expense);
    }
    catch(err){
        next(err);
    }
}
public getexpenseById:RequestHandler<{id:string}> = async (req,res,next) => {
    const id = req.params.id;
    try{
        const expense = await this.expenseDao.getExpenseById(id);
        
            res.status(200).json(expense);
    }
    catch(err){
        next(err);
    }
}
 public updateExpense:RequestHandler<updateParams,unknown,updateBodyExpense,unknown> = async (req,res,next) => {
    const id = req.params.id;
    const newtitle = req.body.title;
    const newamount = req.body.amount;
    const newdate = req.body.date;
    const newcategory = req.body.category;
    try{
        if(!mongoose.isValidObjectId(id)){
               throw createHttpError(400,"Invalid expense id ");
        }
        if(!newtitle && !newamount && !newdate && !newcategory){
            throw createHttpError(404,"All fields of expense should consist a value");
        }
            const expense = await this.expenseDao.getExpenseById(id);
            if(!expense){
                throw createHttpError(404,"No expense found");
            }
            const newExpense = await this.expenseDao.updateExpense(id,newtitle,newamount,newdate,newcategory);
            res.status(200).json(newExpense);

        }
        catch(err){
        next(err);
    }
};
 public deleteExpense:RequestHandler=async(req,res,next)=>{
    const id = req.params.id;
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"Invalid expense id ");
     }
     const expense = await this.expenseDao.deleteExpense(id);
     if(!expense){
        throw createHttpError(404,"Expense not found");

     }
     
    }
    catch(err){
        next(err);
    }

}
}
export default ExpenseController;
