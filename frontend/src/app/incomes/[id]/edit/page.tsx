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
	}, []);

	const handleUpdateIncome = async (updatedIncome: Omit<Transaction, "id">) => {
		const updatedIncomeData = await updateIncome(id, updatedIncome);
		setIncome(updatedIncomeData);
	};

	return (
		<div>
			{income ? (
				<EditForm initialData={income} updateIncome={handleUpdateIncome} />
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}
