interface addExpenseBody{
    title?:string;
    amount?:number;
    date?:Date;
    category?:string;
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
export {addExpenseBody,updateParams,updateBodyExpense};