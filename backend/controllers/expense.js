const ExpenseModel = require("../models/expenseModel");

exports.getExpenses = async (req, res) => {
	try {
		const expenses = ExpenseModel.getExpenses();
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.addExpense = async (req, res) => {
	const { title, amount, category, description, date } = req.body;

	const expense = {
		title,
		amount,
		category,
		description,
		date,
	};

	try {
		if (!title || !category || !description || !date) {
			return res.status(400).json({ message: "All fields are required!" });
		}
		if (amount <= 0 || typeof amount !== "number") {
			return res
				.status(400)
				.json({ message: "Amount must be a positive number!" });
		}
		ExpenseModel.addExpense(expense);
		res.status(200).json({ message: "Expense added." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateExpense = async (req, res) => {
	const { id } = req.params;
	const { title, amount, category, description, date } = req.body;

	const expense = {
		title,
		amount,
		category,
		description,
		date,
	};

	try {
		if (!title || !category || !description || !date) {
			return res.status(400).json({ message: "All fields are required!" });
		}
		if (amount <= 0 || typeof amount !== "number") {
			return res
				.status(400)
				.json({ message: "Amount must be a positive number!" });
		}
		ExpenseModel.updateExpense(Number(id), expense);
		res.status(200).json({ message: "Expense updated." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteExpense = async (req, res) => {
	const { id } = req.params;

	try {
		ExpenseModel.deleteExpense(Number(id));
		res.status(200).json({ message: "Expense deleted." });
	} catch (error) {
		res.status(500).json({
			message: "An error occurred while deleting the expense.",
			error,
		});
	}
};
