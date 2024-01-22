import { Transaction } from "@/lib/definitions";

export const getIncomes = async () => {
	const response = await fetch("http://localhost:5000/api/get-incomes");
	const data = await response.json();
	return data;
};

export const getExpenses = async () => {
	const response = await fetch("http://localhost:5000/api/get-expenses");
	const data = await response.json();
	return data;
};

export const getIncomeById = async (id: string) => {
	const response = await fetch(`http://localhost:5000/api/get-incomes/${id}`);
	const data: Transaction = await response.json();
	console.log(data);
	return data;
};

export const getExpenseById = async (id: string) => {
	const response = await fetch(`http://localhost:5000/api/get-expenses/${id}`);
	const data: Transaction = await response.json();
	return data;
};

export const deleteIncome = async (id: string) => {
	await fetch(`http://localhost:5000/api/delete-income/${id}`, {
		method: "DELETE",
	});
};

export const deleteExpense = async (id: string) => {
	await fetch(`http://localhost:5000/api/delete-expense/${id}`, {
		method: "DELETE",
	});
};

export const addIncome = async (income: Omit<Transaction, "id">) => {
	const response = await fetch("http://localhost:5000/api/add-income", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(income),
	});
	const newIncome: Transaction = await response.json();
	return newIncome;
};

export const addExpense = async (expense: Omit<Transaction, "id">) => {
	const response = await fetch("http://localhost:5000/api/add-expense", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(expense),
	});
	const newExpense: Transaction = await response.json();
	return newExpense;
};

export async function updateIncome(
	id: string,
	updatedIncome: Omit<Transaction, "id">
) {
	const response = await fetch(
		`http://localhost:5000/api/update-income/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedIncome),
		}
	);
	const data: Transaction = await response.json();
	return data;
}

export async function updateExpense(
	id: string,
	updatedExpense: Omit<Transaction, "id">
) {
	const response = await fetch(
		`http://localhost:5000/api/update-expense/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedExpense),
		}
	);
	const data: Transaction = await response.json();
	return data;
}
