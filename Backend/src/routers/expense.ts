import express from "express"
import { getexpense, addExpense, getexpenseById, updateExpense, deleteExpense } from "../controller/getExpenses";
const router = express.Router();
router.get('/api/Expenses', getexpense);
router.post('/api/Expenses', addExpense);
router.get('/api/Expenses/:id', getexpenseById);
router.patch('/api/Expenses/:id', updateExpense);
router.delete('/api/Expenses/:id',deleteExpense);
export default router;