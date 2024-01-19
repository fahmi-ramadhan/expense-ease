const IncomeModel = require("../models/incomeModel");

exports.getIncomes = async (req, res) => {
	try {
		const incomes = IncomeModel.getIncomes();
		res.status(200).json(incomes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.addIncome = async (req, res) => {
	const { title, amount, category, description, date } = req.body;

	const income = {
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
		IncomeModel.addIncome(income);
		res.status(200).json({ message: "Income added." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateIncome = async (req, res) => {
	const { id } = req.params;
	const { title, amount, category, description, date } = req.body;

	const income = {
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
		IncomeModel.updateIncome(Number(id), income);
		res.status(200).json({ message: "Income updated." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteIncome = async (req, res) => {
	const { id } = req.params;

	try {
		IncomeModel.deleteIncome(Number(id));
		res.status(200).json({ message: "Income deleted." });
	} catch (error) {
		res
			.status(500)
			.json({ message: "An error occurred while deleting the income.", error });
	}
};
