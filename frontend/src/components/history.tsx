import { Transaction as BaseTransaction } from "@/lib/definitions";

type Transaction = BaseTransaction & { type: "income" | "expense" };

export default function History({
	transactionHistory,
}: {
	transactionHistory: Transaction[];
}) {
	return (
		<div className="flex flex-col gap-2">
			{transactionHistory.map((transaction, index) => {
				const { id, title, amount, type } = transaction;
				return (
					<div
						key={id}
						className="bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl flex justify-between items-center"
					>
						<p
							className={type === "expense" ? "text-red-500" : "text-green-500"}
						>
							{title}
						</p>

						<p
							className={type === "expense" ? "text-red-500" : "text-green-500"}
						>
							{type === "expense"
								? `-${amount <= 0 ? 0 : amount}`
								: `+${amount <= 0 ? 0 : amount}`}
						</p>
					</div>
				);
			})}
		</div>
	);
}
