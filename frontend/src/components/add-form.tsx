import { FormEvent, useState } from "react";
import { FormField } from "@/lib/definitions";
import FormFields from "@/components/form-fields";

export default function Form({
	addTransaction,
	transactionType,
}: {
	addTransaction: (transaction: FormField) => void;
	transactionType: "income" | "expense";
}) {
	const initialInputState = {
		title: "",
		amount: 0,
		category: "",
		description: "",
		date: "",
	};

	const [inputState, setInputState] = useState<FormField>(initialInputState);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await addTransaction(inputState);
			setInputState(initialInputState);
		} catch (error) {
			console.error(
				`An error occurred while adding the ${transactionType}:`,
				error
			);
		}
	};

	return (
		<form
			action=""
			onSubmit={handleSubmit}
			className="space-y-4 flex flex-col items-end"
		>
			<FormFields
				transactionType={transactionType}
				inputState={inputState}
				setInputState={setInputState}
			/>
			<button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 w-1/2 text-sm">
				{`Add ${
					transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
				}`}
			</button>
		</form>
	);
}
