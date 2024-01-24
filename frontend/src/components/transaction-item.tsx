import { Transaction as BaseTransaction } from "@/lib/definitions";
import Link from "next/link";

type Transaction = BaseTransaction & { type: "income" | "expense" };

export default function TransactionItem({
	transaction: { id, title, amount, category, description, date, type },
	handleDelete,
}: {
	transaction: Transaction;
	handleDelete: (id: string) => void;
}) {
	const incomeIcon = () => {
		switch (category) {
			case "salary":
				return <i className="fa-solid fa-money-bill text-4xl"></i>;
			case "freelancing":
				return <i className="fa-solid fa-earth-americas text-4xl"></i>;
			case "investments":
				return <i className="fa-solid fa-arrow-trend-up text-4xl"></i>;
			case "stocks":
				return <i className="fa-brands fa-bitcoin text-4xl"></i>;
			case "property":
				return <i className="fa-solid fa-building text-4xl"></i>;
			case "bank":
				return <i className="fa-solid fa-users-between-lines text-4xl"></i>;
			case "youtube":
				return <i className="fa-brands fa-youtube text-4xl"></i>;
			case "other":
				return <i className="fa-solid fa-piggy-bank text-4xl"></i>;
			default:
				return "";
		}
	};

	const expenseIcon = () => {
		switch (category) {
			case "education":
				return <i className="fa-solid fa-book-open text-4xl"></i>;
			case "food":
				return <i className="fa-solid fa-bowl-food text-4xl"></i>;
			case "health":
				return <i className="fa-solid fa-briefcase-medical text-4xl"></i>;
			case "subscriptions":
				return <i className="fa-solid fa-tv text-4xl"></i>;
			case "housing":
				return <i className="fa-solid fa-building text-4xl"></i>;
			case "clothing":
				return <i className="fa-solid fa-shirt text-4xl"></i>;
			case "travelling":
				return <i className="fa-solid fa-earth-asia text-4xl"></i>;
			case "other":
				return <i className="fa-solid fa-circle-dot text-4xl"></i>;
			default:
				return "";
		}
	};

	return (
		<div className="bg-gray-50 border-2 border-white shadow-md rounded-lg p-2 mb-2 flex items-center gap-2 text-gray-800">
			<div className="w-16 h-16 bg-gray-100 flex items-center justify-center border-2 border-white rounded-lg">
				{type === "income" ? incomeIcon() : expenseIcon()}
			</div>
			<div className="flex items-center w-full justify-between pr-4">
				<div className="flex flex-col gap-1">
					<h5 className="font-semibold">{title}</h5>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-4">
							<p className="flex items-center gap-1 opacity-80">
								<i className="fa-solid fa-dollar-sign"></i> {amount}
							</p>
							<p className="flex items-center gap-1 opacity-80">
								<i className="fa-solid fa-calendar"></i> {date}
							</p>
							<p className="flex items-center gap-1 opacity-80">
								<i className="fa-solid fa-comment"></i> {description}
							</p>
						</div>
					</div>
				</div>
				<div className="flex gap-4">
					<Link href={`/${type}s/${id}/edit`}>
						<i className="fa-solid fa-pen-to-square text-2xl hover:text-gray-600"></i>
					</Link>
					<button
						onClick={() => {
							handleDelete(id);
						}}
					>
						<i className="fa-solid fa-trash text-2xl hover:text-gray-600"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
