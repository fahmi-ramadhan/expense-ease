import { ChangeEvent } from "react";
import { FormField } from "@/lib/definitions";

export default function FormFields({
	transactionType,
	inputState,
	setInputState,
}: {
	transactionType: "income" | "expense";
	inputState: FormField;
	setInputState: (inputState: FormField) => void;
}) {
	const { title, amount, category, description, date } = inputState;

	const handleInput =
		(name: keyof FormField) =>
		(
			e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
		) => {
			let value = name === "amount" ? Number(e.target.value) : e.target.value;
			if (name === "amount" && Number(value) < 0) {
				value = 0;
			}
			setInputState({ ...inputState, [name]: value });
		};

	const incomeOptions = [
		{ value: "salary", label: "Salary" },
		{ value: "freelancing", label: "Freelancing" },
		{ value: "investments", label: "Investments" },
		{ value: "stocks", label: "Stocks" },
		{ value: "property", label: "Property" },
		{ value: "bank", label: "Bank Transfer" },
		{ value: "youtube", label: "Youtube" },
		{ value: "other", label: "Other" },
	];

	const expenseOptions = [
		{ value: "education", label: "Education" },
		{ value: "food", label: "Food" },
		{ value: "health", label: "Health" },
		{ value: "subscriptions", label: "Subscriptions" },
		{ value: "housing", label: "Housing" },
		{ value: "clothing", label: "Clothing" },
		{ value: "travelling", label: "Travelling" },
		{ value: "other", label: "Other" },
	];

	const options = transactionType === "income" ? incomeOptions : expenseOptions;

	return (
		<>
			<input
				required
				type="text"
				value={title}
				name="title"
				placeholder={`${
					transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
				} Title`}
				onChange={handleInput("title")}
				className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-500"
			/>
			<input
				required
				value={amount || ""}
				type="number"
				name="amount"
				placeholder={`${
					transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
				} Amount`}
				onChange={handleInput("amount")}
				className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-500"
			/>
			<select
				required
				value={category}
				name="category"
				id="category"
				onChange={handleInput("category")}
				className={`w-full p-2 border border-gray-300 rounded-md text-sm ${
					category ? "" : "text-gray-500"
				}`}
			>
				<option value="" disabled>
					Select Category
				</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="text-black"
					>
						{option.label}
					</option>
				))}
			</select>
			<textarea
				name="description"
				value={description}
				placeholder="Description"
				id="description"
				rows={4}
				onChange={handleInput("description")}
				maxLength={100}
				className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm"
			></textarea>
			<input
				required
				type="date"
				value={date}
				name="date"
				onChange={handleInput("date")}
				className={`w-full p-2 border border-gray-300 rounded-md text-sm ${
					date ? "" : "text-gray-500"
				}`}
			/>
		</>
	);
}
