"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import { getExpenses, deleteExpense, addExpense } from "@/lib/actions";
import Form from "@/components/add-form";
import Search from "@/components/search";
import TransactionItem from "@/components/transaction-item";

export default function Home() {
	const [expenses, setExpenses] = useState<Transaction[]>([]);

	useEffect(() => {
		getExpenses()
			.then(setExpenses)
			.catch((error) => {
				console.error("Error fetching expenses:", error);
			});
	}, []);

	const handleDelete = (id: string) => {
		deleteExpense(id)
			.then(() => {
				setExpenses(expenses.filter((expense) => expense.id !== id));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAddExpense = async (expense: Omit<Transaction, "id">) => {
		try {
			const newExpense = await addExpense(expense);
			console.log(newExpense);
			setExpenses((prevExpenses) => {
				const updatedExpenses = [...prevExpenses, newExpense];
				updatedExpenses.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
				return updatedExpenses;
			});
		} catch (error) {
			console.error("An error occurred while adding the expense:", error);
		}
	};

	return (
		<main className="flex flex-col">
			<h1 className="text-2xl font-bold md:block hidden">Expenses</h1>
			<div className="flex gap-4 mt-4">
				<div className="w-full md:w-1/4">
					<Form addTransaction={handleAddExpense} transactionType="expense" />
				</div>
				<div className="w-full md:w-3/4">
					<div className="w-full mb-4 flex items-center justify-between gap-2">
						<Search placeholder="Search expense..." />
					</div>
					{[...expenses].reverse().map((expense) => {
						return (
							<TransactionItem
								transaction={{ ...expense, type: "expense" as "expense" }}
								handleDelete={handleDelete}
								key={expense.id}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}
