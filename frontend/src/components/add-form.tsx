import { ChangeEvent, FormEvent, useState } from "react";

interface InputState {
	title: string;
	amount: number;
	category: string;
	description: string;
	date: string;
}

export default function Form({
	addIncome,
}: {
	addIncome: (income: InputState) => void;
}) {
	const initialInputState = {
		title: "",
		amount: 0,
		category: "",
		description: "",
		date: "",
	};

	const [inputState, setInputState] = useState<InputState>(initialInputState);
	const { title, amount, category, description, date } = inputState;

	const handleInput =
		(name: keyof InputState) =>
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
				placeholder="Salary Title"
				onChange={handleInput("title")}
				className="w-full p-2 border border-gray-300 rounded"
			/>
			<input
				required
				value={amount}
				type="number"
				name={"amount"}
				placeholder={"Salary Amount"}
				onChange={handleInput("amount")}
				className="w-full p-2 border border-gray-300 rounded"
			/>
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
				<option value="bitcoin">Bitcoin</option>
				<option value="bank">Bank Transfer</option>
				<option value="youtube">Youtube</option>
				<option value="other">Other</option>
			</select>
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
			<input
				required
				type="date"
				value={date}
				name="date"
				onChange={handleInput("date")}
				className="w-full p-2 border border-gray-300 rounded"
			/>
			<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
				Add Income
			</button>
		</form>
	);
}
