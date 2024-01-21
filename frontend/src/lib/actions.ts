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
	return data;
};

export const deleteIncome = async (id: string) => {
	const response = await fetch(
		`http://localhost:5000/api/delete-income/${id}`,
		{
			method: "DELETE",
		}
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
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
