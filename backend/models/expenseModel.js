const expenseData = require("../seeds/expenseData");
const { v4: uuidv4 } = require("uuid");

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
		const newExpense = { id: uuidv4(), ...expense };
		this.incomes.push(newExpense);
		this.sortExpensesByDate();
		return newExpense;
	}

	updateExpense(id, expense) {
		const index = this.expenses.findIndex((exp) => exp.id === id);
		if (index !== -1) {
			this.expenses[index] = { ...this.expenses[index], ...expense };
			this.sortExpensesByDate();
			return this.expenses[index];
		}
	}

	deleteExpense(id) {
		const index = this.expenses.findIndex((expense) => expense.id === id);
		if (index !== -1) {
			this.expenses.splice(index, 1);
		}
	}

	sortExpensesByDate() {
		this.expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
	}
}

module.exports = new ExpenseModel();
