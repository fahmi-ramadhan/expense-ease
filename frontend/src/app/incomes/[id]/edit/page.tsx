"use client";

import { useState, useEffect } from "react";
import EditForm from "@/components/edit-form";
import { Transaction } from "@/lib/definitions";
import { updateIncome } from "@/lib/actions";
import { getIncomeById } from "@/lib/actions";

export default function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const [income, setIncome] = useState<Transaction>();

	useEffect(() => {
		getIncomeById(id)
			.then(setIncome)
			.catch((error) => {
				console.error("Error fetching incomes:", error);
			});
	}, [id]);

	const handleUpdateIncome = async (updatedIncome: Omit<Transaction, "id">) => {
		const updatedIncomeData = await updateIncome(id, updatedIncome);
		setIncome(updatedIncomeData);
	};

	return (
		<div className="flex flex-col">
			{income ? (
				<div className="w-full mx-auto overflow-hidden">
					<h1 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">
						Edit Income
					</h1>
					<EditForm
						initialData={income}
						updateTransaction={handleUpdateIncome}
						transactionType="income"
					/>
				</div>
			) : (
				<h1 className="text-lg md:text-2xl font-bold">Loading...</h1>
			)}
		</div>
	);
}
