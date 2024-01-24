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
				return <i className="fa-solid fa-money-bill text-3xl sm:text-4xl"></i>;
			case "freelancing":
				return (
					<i className="fa-solid fa-earth-americas text-3xl sm:text-4xl"></i>
				);
			case "investments":
				return (
					<i className="fa-solid fa-arrow-trend-up text-3xl sm:text-4xl"></i>
				);
			case "stocks":
				return <i className="fa-brands fa-bitcoin text-3xl sm:text-4xl"></i>;
			case "property":
				return <i className="fa-solid fa-building text-3xl sm:text-4xl"></i>;
			case "bank":
				return (
					<i className="fa-solid fa-users-between-lines text-3xl sm:text-4xl"></i>
				);
			case "youtube":
				return <i className="fa-brands fa-youtube text-3xl sm:text-4xl"></i>;
			case "other":
				return <i className="fa-solid fa-piggy-bank text-3xl sm:text-4xl"></i>;
			default:
				return "";
		}
	};

	const expenseIcon = () => {
		switch (category) {
			case "education":
				return <i className="fa-solid fa-book-open text-3xl sm:text-4xl"></i>;
			case "food":
				return <i className="fa-solid fa-bowl-food text-3xl sm:text-4xl"></i>;
			case "health":
				return (
					<i className="fa-solid fa-briefcase-medical text-3xl sm:text-4xl"></i>
				);
			case "subscriptions":
				return <i className="fa-solid fa-tv text-3xl sm:text-4xl"></i>;
			case "housing":
				return <i className="fa-solid fa-building text-3xl sm:text-4xl"></i>;
			case "clothing":
				return <i className="fa-solid fa-shirt text-3xl sm:text-4xl"></i>;
			case "travelling":
				return <i className="fa-solid fa-earth-asia text-3xl sm:text-4xl"></i>;
			case "other":
				return <i className="fa-solid fa-circle-dot text-3xl sm:text-4xl"></i>;
			default:
				return "";
		}
	};

	return (
		<div className="bg-gray-50 border-2 border-white shadow-md rounded-lg p-2 mb-2 flex items-center gap-2 text-gray-800">
			<div className="w-12 h-12 sm:w-16 sm:h-16 p-1 bg-gray-100 flex items-center justify-center border-2 border-white rounded-lg flex-shrink-0">
				{type === "income" ? incomeIcon() : expenseIcon()}
			</div>
			<div className="flex flex-col gap-1 w-full pr-2">
				<p className="font-semibold">{title}</p>
				<div className="flex justify-between items-start text-sm sm:items-center gap-2 sm:gap-4">
					<p className="flex items-center gap-0.5 sm:gap-1 opacity-80 w-12">
						<i className="fa-solid fa-dollar-sign"></i> {amount}
					</p>
					<p className="flex items-center gap-0.5 sm:gap-1 opacity-80 whitespace-nowrap w-24">
						<i className="fa-solid fa-calendar"></i> {date}
					</p>
					<p className="flex items-center gap-0.5 sm:gap-1 opacity-80 flex-grow w-0">
						<i className="fa-solid fa-comment"></i>
						<span className="inline-block overflow-ellipsis overflow-hidden whitespace-nowrap">
							{description}
						</span>
					</p>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
				<Link href={`/${type}s/${id}/edit`}>
					<i className="fa-solid fa-pen-to-square text-xl sm:text-2xl hover:text-gray-600"></i>
				</Link>
				<button
					onClick={() => {
						handleDelete(id);
					}}
				>
					<i className="fa-solid fa-trash text-xl sm:text-2xl sm:pr-2 hover:text-gray-600"></i>
				</button>
			</div>
		</div>
	);
}
