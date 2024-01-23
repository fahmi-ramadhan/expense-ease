"use client";

import { useState, useEffect } from "react";
import EditForm from "@/components/edit-form";
import { Transaction } from "@/lib/definitions";
import { updateExpense } from "@/lib/actions";
import { getExpenseById } from "@/lib/actions";

export default function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const [expense, setExpense] = useState<Transaction>();

	useEffect(() => {
		getExpenseById(id)
			.then(setExpense)
			.catch((error) => {
				console.error("Error fetching expenses:", error);
			});
	}, []);

	const handleUpdateExpense = async (
		updatedExpense: Omit<Transaction, "id">
	) => {
		const updatedExpenseData = await updateExpense(id, updatedExpense);
		setExpense(updatedExpenseData);
	};

	return (
		<div className="flex flex-col">
			{expense ? (
				<div className="w-full mx-auto overflow-hidden">
					<h1 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">
						Edit Expense
					</h1>
					<EditForm
						initialData={expense}
						updateTransaction={handleUpdateExpense}
						transactionType="expense"
					/>
				</div>
			) : (
				<h1 className="text-2xl font-bold">Loading...</h1>
			)}
		</div>
	);
}
