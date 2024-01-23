"use client";

import { getIncomes, getExpenses } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import Chart from "@/components/chart";
import History from "@/components/history";

export default function Home() {
	const [incomes, setIncomes] = useState<Transaction[]>([]);
	const [expenses, setExpenses] = useState<Transaction[]>([]);

	useEffect(() => {
		getIncomes()
			.then(setIncomes)
			.catch((error) => {
				console.error("Error fetching incomes:", error);
			});
	}, []);

	useEffect(() => {
		getExpenses()
			.then(setExpenses)
			.catch((error) => {
				console.error("Error fetching expenses:", error);
			});
	}, []);

	const totalIncomes = incomes.reduce(
		(total, income) => total + income.amount,
		0
	);
	const totalExpenses = expenses.reduce(
		(total, expense) => total + expense.amount,
		0
	);

	const transactionHistory = [
		...incomes.map((income) => ({ ...income, type: "income" as "income" })),
		...expenses.map((expense) => ({
			...expense,
			type: "expense" as "expense",
		})),
	]
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, 5);

	return (
		<>
			<h1 className="text-2xl font-bold">All Transactions</h1>
			<div className="grid grid-cols-5 gap-4 mt-4">
				<div className="col-span-3 h-96">
					<Chart incomes={incomes} expenses={expenses} />
					<div className="grid grid-cols-4 gap-4 mt-4">
						<div className="grid col-span-2 bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl">
							<h2 className="font-semibold">Total Incomes</h2>
							<p className="text-4xl opacity-80 font-semibold">
								<i className="fa-solid fa-dollar-sign"></i>
								{totalIncomes}
							</p>
						</div>
						<div className="grid col-span-2 bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl">
							<h2 className="font-semibold">Total Expenses</h2>
							<p className="text-4xl opacity-80 font-semibold">
								<i className="fa-solid fa-dollar-sign"></i>
								{totalExpenses}
							</p>
						</div>
						<div className="col-start-2 col-end-4 flex flex-col justify-center items-center bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl">
							<h2 className="font-semibold">Total Balance</h2>
							<p className="text-green-500 opacity-80 text-4xl font-semibold">
								<i className="fa-solid fa-dollar-sign"></i>
								{totalIncomes - totalExpenses}
							</p>
						</div>
					</div>
				</div>
				<div className="col-span-2">
					<h2 className="text-xl font-semibold mb-2">Recent History</h2>
					<History transactionHistory={transactionHistory} />
					<h2 className="my-2 mt-4 flex items-center justify-between font-semibold">
						Min <span className="text-xl font-semibold">Income</span>Max
					</h2>
					<div className="bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl flex justify-between items-center">
						<p>
							<i className="fa-solid fa-dollar-sign"></i>
							{Math.min(...incomes.map((item) => item.amount))}
						</p>
						<p>
							<i className="fa-solid fa-dollar-sign"></i>
							{Math.max(...incomes.map((item) => item.amount))}
						</p>
					</div>
					<h2 className="my-2 mt-4 flex items-center justify-between font-semibold">
						Min <span className="text-xl font-semibold">Expense</span>Max
					</h2>
					<div className="bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl flex justify-between items-center">
						<p>
							<i className="fa-solid fa-dollar-sign"></i>
							{Math.min(...expenses.map((item) => item.amount))}
						</p>
						<p>
							<i className="fa-solid fa-dollar-sign"></i>
							{Math.max(...expenses.map((item) => item.amount))}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
