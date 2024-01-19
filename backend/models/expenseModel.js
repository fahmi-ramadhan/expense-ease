class ExpenseModel {
	constructor() {
		this.expenses = [
			{
				id: 1,
				title: "Rent",
				amount: 1000,
				category: "Housing",
				description: "Monthly rent",
				date: "2022-01-01",
			},
			{
				id: 2,
				title: "Groceries",
				amount: 200,
				category: "Food",
				description: "Weekly groceries",
				date: "2022-01-02",
			},
		];
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
