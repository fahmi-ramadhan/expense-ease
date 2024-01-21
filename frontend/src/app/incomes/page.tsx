"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import { getIncomes, deleteIncome, addIncome } from "@/lib/actions";
import Form from "@/components/add-form";
import Search from "@/components/search";
import Link from "next/link";

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
			.then((data) => {
				// Remove the deleted income from the state
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
			setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
		} catch (error) {
			console.error("An error occurred while adding the income:", error);
		}
	};

	return (
		<main className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold">Incomes</h1>
			<div className="flex gap-4 w-full mt-8">
				<div className="w-full md:w-1/4">
					<Form addIncome={handleAddIncome} />
				</div>
				<div className="w-full md:w-3/4">
					<div className="w-full mb-4 flex items-center justify-between gap-2">
						<Search placeholder="Search income..." />
					</div>
					<table className="table-auto border-collapse w-full">
						<thead>
							<tr className="bg-gray-800 text-white">
								<th className="px-4 py-2">Title</th>
								<th className="px-4 py-2">Amount</th>
								<th className="px-4 py-2">Category</th>
								<th className="px-4 py-2">Description</th>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">Action</th>
							</tr>
						</thead>
						<tbody>
							{incomes.map((income, index) => (
								<tr
									key={income.id}
									className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
								>
									<td className="border px-4 py-2">{income.title}</td>
									<td className="border px-4 py-2">{income.amount}</td>
									<td className="border px-4 py-2">{income.category}</td>
									<td className="border px-4 py-2">{income.description}</td>
									<td className="border px-4 py-2">{income.date}</td>
									<td className="border px-4 py-2">
										<div className="space-x-2">
											<Link href={`/incomes/${income.id}/edit`}>Edit</Link>
											<button onClick={() => handleDelete(income.id)}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
