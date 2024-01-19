class IncomeModel {
	constructor() {
		this.incomes = [
			{
				id: 1,
				title: "Salary",
				amount: 5000,
				category: "Job",
				description: "Monthly salary",
				date: "2022-01-01",
			},
			{
				id: 2,
				title: "Freelance",
				amount: 2000,
				category: "Job",
				description: "Freelance project",
				date: "2022-01-15",
			},
		];
	}

	getIncomes() {
		return this.incomes;
	}

	getIncomeById(id) {
		return this.incomes.find((income) => income.id === id);
	}

	addIncome(income) {
		this.incomes.push({ id: this.incomes.length + 1, ...income });
	}

	updateIncome(id, income) {
		const index = this.incomes.findIndex((inc) => inc.id === id);
		if (index !== -1) {
			this.incomes[index] = { ...this.incomes[index], ...income };
		}
	}

	deleteIncome(id) {
		const index = this.incomes.findIndex((income) => income.id === id);
		if (index !== -1) {
			this.incomes.splice(index, 1);
		}
	}
}

module.exports = new IncomeModel();
