const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income");
const expenseController = require("../controllers/expense");

router
	.get("/get-incomes", incomeController.getIncomes)
	.post("/add-income", incomeController.addIncome)
	.put("/update-income/:id", incomeController.updateIncome)
	.delete("/delete-income/:id", incomeController.deleteIncome)
	.get("/get-expenses", expenseController.getExpenses)
	.post("/add-expense", expenseController.addExpense)
	.put("/update-expense/:id", expenseController.updateExpense)
	.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
