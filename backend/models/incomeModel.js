const incomeData = require("../seeds/incomeData");
const { v4: uuidv4 } = require("uuid");

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
		const newIncome = { id: uuidv4(), ...income };
		this.incomes.push(newIncome);
		this.sortIncomesByDate();
		return newIncome;
	}

	updateIncome(id, income) {
		const index = this.incomes.findIndex((inc) => inc.id === id);
		if (index !== -1) {
			this.incomes[index] = { ...this.incomes[index], ...income };
			this.sortIncomesByDate();
			return this.incomes[index];
		}
	}

	deleteIncome(id) {
		const index = this.incomes.findIndex((income) => income.id === id);
		if (index !== -1) {
			this.incomes.splice(index, 1);
		}
	}

	sortIncomesByDate() {
		this.incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
	}
}

module.exports = new IncomeModel();
