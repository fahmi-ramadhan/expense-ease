const incomeData = require("../seeds/incomeData");

class IncomeModel {
	constructor() {
		this.incomes = incomeData;
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
