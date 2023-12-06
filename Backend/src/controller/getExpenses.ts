import {  RequestHandler } from "express";
import{ Expense} from "../model/expenseModel";
import mongoose from "mongoose"
import createHttpError from "http-errors";
export const getexpense:RequestHandler =  async (req,res,next) => {
    try{
        const expenses = await Expense.find().exec();
        res.status(200).json(expenses);
    }
    catch(err){
        next(err);
    }
}
// why copilot you are not working
interface addExpenseBody{
    title?:string;
    amount?:number;
    date?:Date;
    category?:string;
}
export const addExpense:RequestHandler<unknown,unknown,addExpenseBody,unknown> = async (req,res,next) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const date = req.body.date;
    const category = req.body.category;
    try{

      const expense = new Expense({
        title:title,
        amount:amount,
        date:date,
        category:category,
      })
      res.status(201).json(await expense.save());
    }
    catch(err){
        next(err);
    }
}
export const getexpenseById:RequestHandler<{id:string}> = async (req,res,next) => {
    const id = req.params.id;
    try{
        const expense = await Expense.findById(id).exec();
        
            res.status(200).json(expense);
    }
    catch(err){
        next(err);
    }
}
interface  updateParams{
    id:string;
}
interface updateBodyExpense {
    title:string;
    amount:number;
    date:Date;
    category:string;

}
export const updateExpense:RequestHandler<updateParams,unknown,updateBodyExpense,unknown> = async (req,res,next) => {
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
            const expense = await Expense.findById(id).exec();
            if(!expense){
                throw createHttpError(404,"No expense found");
            }
            expense.title = newtitle;
            expense.amount = newamount;
            expense.date = newdate;
            expense.category=newcategory;
            const newExpense  = await expense.save() ;
            res.status(200).json(newExpense);

        }
        catch(err){
        next(err);
    }
};
export const deleteExpense:RequestHandler=async(req,res,next)=>{
    const id = req.params.id;
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"Invalid expense id ");
     }
     const expense = await Expense.findByIdAndDelete(id);
     if(!expense){
        throw createHttpError(404,"Expense not found");

     }
     
    }
    catch(err){
        next(err);
    }

};
