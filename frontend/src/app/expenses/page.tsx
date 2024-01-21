"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";

export default function Home() {
	const [expenses, setExpenses] = useState<Transaction[]>([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/get-expenses")
			.then((response) => response.json())
			.then((data) => {
				setExpenses(data);
			})
			.catch((error) => {
				console.error("Error fetching expenses:", error);
			});
	}, []);

	const handleEdit = (id: string) => {
		console.log(`Edit expense with id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Delete expense with id: ${id}`);
	};

	return (
		<main className="flex flex-col items-center justify-center p-6">
			<h1 className="text-2xl font-bold mb-4">Expenses</h1>
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
					{expenses.map((expense, index) => (
						<tr
							key={expense.id}
							className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
						>
							<td className="border px-4 py-2">{expense.title}</td>
							<td className="border px-4 py-2">{expense.amount}</td>
							<td className="border px-4 py-2">{expense.category}</td>
							<td className="border px-4 py-2">{expense.description}</td>
							<td className="border px-4 py-2">{expense.date}</td>
							<td className="border px-4 py-2">
								<div className="space-x-2">
									<button onClick={() => handleEdit(expense.id)}>Edit</button>
									<button onClick={() => handleDelete(expense.id)}>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
