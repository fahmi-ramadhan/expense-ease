import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { FormField } from "@/lib/definitions";
import FormFields from "@/components/form-fields";

export default function EditForm({
	initialData,
	updateTransaction,
	transactionType,
}: {
	initialData: FormField;
	updateTransaction: (transaction: FormField) => void;
	transactionType: "income" | "expense";
}) {
	const [inputState, setInputState] = useState<FormField>(initialData);

	useEffect(() => {
		setInputState(initialData);
	}, []);

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
			await updateTransaction(inputState);
		} catch (error) {
			console.error(
				`An error occurred while updating the ${transactionType}:`,
				error
			);
		}
	};

	return (
		<form
			action={`/${transactionType}s`}
			onSubmit={handleSubmit}
			className="space-y-4"
		>
			<FormFields
				transactionType={transactionType}
				inputState={inputState}
				handleInput={handleInput}
			/>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href={`/${transactionType}s`}
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
					{`Edit ${
						transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
					}`}
				</button>
			</div>
		</form>
	);
}
