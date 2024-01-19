const expenseData = require("../seeds/expenseData");

class ExpenseModel {
	constructor() {
		this.expenses = expenseData;
	}

	getExpenses() {
		return this.expenses;
	}

	getExpenseById(id) {
		return this.expenses.find((expense) => expense.id === id);
	}

	addExpense(expense) {
		this.expenses.push({ id: this.expenses.length + 1, ...expense });
	}

	updateExpense(id, expense) {
		const index = this.expenses.findIndex((exp) => exp.id === id);
		if (index !== -1) {
			this.expenses[index] = { ...this.expenses[index], ...expense };
		}
	}

	deleteExpense(id) {
		const index = this.expenses.findIndex((expense) => expense.id === id);
		if (index !== -1) {
			this.expenses.splice(index, 1);
		}
	}
}

module.exports = new ExpenseModel();
