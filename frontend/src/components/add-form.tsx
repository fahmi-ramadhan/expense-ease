import { ChangeEvent, FormEvent, useState } from "react";
import { FormField } from "@/lib/definitions";

export default function Form({
	addIncome,
}: {
	addIncome: (income: FormField) => void;
}) {
	const initialInputState = {
		title: "",
		amount: 0,
		category: "",
		description: "",
		date: "",
	};

	const [inputState, setInputState] = useState<FormField>(initialInputState);
	const { title, amount, category, description, date } = inputState;

	const handleInput =
		(name: keyof FormField) =>
		(
			e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
		) => {
			const value = name === "amount" ? Number(e.target.value) : e.target.value;
			setInputState({ ...inputState, [name]: value });
		};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await addIncome(inputState);
			setInputState(initialInputState); // Reset form fields
		} catch (error) {
			console.error("An error occurred while adding the income:", error);
		}
	};

	return (
		<form action="" onSubmit={handleSubmit} className="space-y-4">
			<input
				required
				type="text"
				value={title}
				name="title"
				placeholder="Income Title"
				onChange={handleInput("title")}
				className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-500"
			/>
			<input
				required
				value={amount || ""}
				type="number"
				name={"amount"}
				placeholder={"Income Amount"}
				onChange={handleInput("amount")}
				className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-500"
			/>
			<select
				required
				value={category}
				name="category"
				id="category"
				onChange={handleInput("category")}
				className={`w-full p-2 border border-gray-300 rounded-md ${
					category ? "" : "text-gray-500"
				}`}
			>
				<option value="" disabled>
					Select Category
				</option>
				<option value="salary" className="text-black">
					Salary
				</option>
				<option value="freelancing" className="text-black">
					Freelancing
				</option>
				<option value="investments" className="text-black">
					Investments
				</option>
				<option value="stocks" className="text-black">
					Stocks
				</option>
				<option value="property" className="text-black">
					Property
				</option>
				<option value="bank" className="text-black">
					Bank Transfer
				</option>
				<option value="youtube" className="text-black">
					Youtube
				</option>
				<option value="other" className="text-black">
					Other
				</option>
			</select>
			<textarea
				name="description"
				value={description}
				placeholder="Description"
				id="description"
				rows={4}
				onChange={handleInput("description")}
				className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-500"
			></textarea>
			<input
				required
				type="date"
				value={date}
				name="date"
				onChange={handleInput("date")}
				className={`w-full p-2 border border-gray-300 rounded-md ${
					date ? "" : "text-gray-500"
				}`}
			/>
			<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
				Add Income
			</button>
		</form>
	);
}
