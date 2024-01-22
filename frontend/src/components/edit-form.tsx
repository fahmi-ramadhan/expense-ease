import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { FormField } from "@/lib/definitions";

export default function EditForm({
	initialData,
	updateIncome,
}: {
	initialData: FormField;
	updateIncome: (income: FormField) => void;
}) {
	const [inputState, setInputState] = useState<FormField>(initialData);
	const { title, amount, category, description, date } = inputState;

	useEffect(() => {
		setInputState(initialData);
	}, [initialData]);

	const handleInput =
		(name: keyof FormField) =>
		(
			e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
		) => {
			const value = name === "amount" ? Number(e.target.value) : e.target.value;
			setInputState({ ...inputState, [name]: value });
		};

	const handleSubmit = async (e: FormEvent) => {
		try {
			await updateIncome(inputState);
		} catch (error) {
			console.error("An error occurred while updating the income:", error);
		}
	};

	return (
		<form action="/incomes" onSubmit={handleSubmit} className="space-y-4">
			<div className="input-control">
				<input
					required
					type="text"
					value={title}
					name="title"
					placeholder="Salary Title"
					onChange={handleInput("title")}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="input-control">
				<input
					required
					value={amount}
					type="number"
					name={"amount"}
					placeholder={"Salary Amount"}
					onChange={handleInput("amount")}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="selects input-control">
				<select
					required
					value={category}
					name="category"
					id="category"
					onChange={handleInput("category")}
					className="w-full p-2 border border-gray-300 rounded"
				>
					<option value="" disabled>
						Select Option
					</option>
					<option value="salary">Salary</option>
					<option value="freelancing">Freelancing</option>
					<option value="investments">Investments</option>
					<option value="stocks">Stocks</option>
					<option value="property">Property</option>
					<option value="bank">Bank Transfer</option>
					<option value="youtube">Youtube</option>
					<option value="other">Other</option>
				</select>
			</div>
			<div className="input-control">
				<textarea
					name="description"
					value={description}
					placeholder="Add A Reference"
					id="description"
					cols={30}
					rows={4}
					onChange={handleInput("description")}
					className="w-full p-2 border border-gray-300 rounded"
				></textarea>
			</div>
			<div className="input-control">
				<input
					required
					type="date"
					value={date}
					name="date"
					onChange={handleInput("date")}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/incomes"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
					Edit Income
				</button>
			</div>
		</form>
	);
}
