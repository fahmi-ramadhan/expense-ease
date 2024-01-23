import { ChangeEvent } from "react";
import { FormField } from "@/lib/definitions";

export default function FormFields({
	transactionType,
	inputState,
	handleInput,
}: {
	transactionType: "income" | "expense";
	inputState: FormField;
	handleInput: (
		name: keyof FormField
	) => (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => void;
}) {
	const { title, amount, category, description, date } = inputState;

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
				className="w-full p-2 border border-gray-300 rounded-md placeholder:text-gray-500"
			/>
			<input
				required
				value={amount || ""}
				type="number"
				name={"amount"}
				placeholder={`${
					transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
				} Amount`}
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
				<option
					value={transactionType === "income" ? "salary" : "education"}
					className="text-black"
				>
					{transactionType === "income" ? "Salary" : "Education"}
				</option>
				<option
					value={transactionType === "income" ? "freelancing" : "food"}
					className="text-black"
				>
					{transactionType === "income" ? "Freelancing" : "Food"}
				</option>
				<option
					value={transactionType === "income" ? "investments" : "health"}
					className="text-black"
				>
					{transactionType === "income" ? "Investments" : "Health"}
				</option>
				<option
					value={transactionType === "income" ? "stocks" : "subscriptions"}
					className="text-black"
				>
					{transactionType === "income" ? "Stocks" : "Subscriptions"}
				</option>
				<option
					value={transactionType === "income" ? "property" : "housing"}
					className="text-black"
				>
					{transactionType === "income" ? "Property" : "Housing"}
				</option>
				<option
					value={transactionType === "income" ? "bank" : "clothing"}
					className="text-black"
				>
					{transactionType === "income" ? "Bank Transfer" : "Clothing"}
				</option>
				<option
					value={transactionType === "income" ? "youtube" : "travelling"}
					className="text-black"
				>
					{transactionType === "income" ? "Youtube" : "Travelling"}
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
		</>
	);
}
