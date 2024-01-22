const IncomeModel = require("../models/incomeModel");

exports.getIncomes = async (req, res) => {
	try {
		const incomes = IncomeModel.getIncomes();
		res.status(200).json(incomes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getIncomeById = async (req, res) => {
	const { id } = req.params;

	try {
		const income = IncomeModel.getIncomeById(id);
		if (!income) {
			return res.status(404).json({ message: "Income not found." });
		}
		res.status(200).json(income);
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
		if (!title || !category || !date) {
			return res.status(400).json({ message: "Missing some required fields" });
		}
		if (amount <= 0 || typeof amount !== "number") {
			return res
				.status(400)
				.json({ message: "Amount must be a positive number!" });
		}
		const newIncome = IncomeModel.addIncome(income);
		res.status(200).json(newIncome);
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
		if (!title || !category || !date) {
			return res.status(400).json({ message: "Missing some required fields" });
		}
		if (amount <= 0 || typeof amount !== "number") {
			return res
				.status(400)
				.json({ message: "Amount must be a positive number!" });
		}
		const updatedIncome = IncomeModel.updateIncome(id, income);
		res.status(200).json(updatedIncome);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteIncome = async (req, res) => {
	const { id } = req.params;

	try {
		IncomeModel.deleteIncome(id);
		res.status(200).json({ message: "Income deleted." });
	} catch (error) {
		res.status(500).json({
			message: "An error occurred while deleting the income.",
			error,
		});
	}
};
