import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
    title: {type:String,required: true},
    amount: {type:Number,required: true},
    date: {type:Date,required: true},
    category: {type:String,required: true},

},{timestamps: true});
export const Expense = mongoose.model("Expense", expenseSchema);
