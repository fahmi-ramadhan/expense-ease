"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import { getIncomes, deleteIncome, addIncome } from "@/lib/actions";
import Form from "@/components/add-form";
import Search from "@/components/search";
import TransactionItem from "@/components/transaction-item";

export default function Home() {
	const [incomes, setIncomes] = useState<Transaction[]>([]);

	useEffect(() => {
		getIncomes()
			.then(setIncomes)
			.catch((error) => {
				console.error("Error fetching incomes:", error);
			});
	}, []);

	const handleDelete = (id: string) => {
		deleteIncome(id)
			.then(() => {
				setIncomes(incomes.filter((income) => income.id !== id));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAddIncome = async (income: Omit<Transaction, "id">) => {
		try {
			const newIncome = await addIncome(income);
			console.log(newIncome);
			setIncomes((prevIncomes) => {
				const updatedIncomes = [...prevIncomes, newIncome];
				updatedIncomes.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
				return updatedIncomes;
			});
		} catch (error) {
			console.error("An error occurred while adding the income:", error);
		}
	};

	return (
		<main className="flex flex-col">
			<h1 className="text-2xl font-bold md:block hidden">Incomes</h1>
			<div className="flex gap-4 mt-4">
				<div className="w-full md:w-1/4">
					<Form addTransaction={handleAddIncome} transactionType="income" />
				</div>
				<div className="w-full md:w-3/4">
					<div className="w-full mb-4 flex items-center justify-between gap-2">
						<Search placeholder="Search income..." />
					</div>
					{[...incomes].reverse().map((income) => {
						return (
							<TransactionItem
								transaction={{ ...income, type: "income" as "income" }}
								handleDelete={handleDelete}
								key={income.id}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}
