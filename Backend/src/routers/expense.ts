import express from "express"
import { getexpense, addExpense, getexpenseById, updateExpense, deleteExpense } from "../controller/getExpenses";
const router = express.Router();
router.get('/api/expenses', getexpense);
router.post('/api/expenses', addExpense);
router.get('/api/expenses/:id', getexpenseById);
router.patch('/api/expenses/:id', updateExpense);
router.delete('/api/expenses/:id',deleteExpense);
export default router;