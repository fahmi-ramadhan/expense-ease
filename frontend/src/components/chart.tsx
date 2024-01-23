import { Transaction } from "@/lib/definitions";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJs,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

ChartJs.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export default function Chart({
	incomes,
	expenses,
}: {
	incomes: Transaction[];
	expenses: Transaction[];
}) {
	const allDates = Array.from(
		new Set([...incomes, ...expenses].map((transaction) => transaction.date))
	).sort();

	const incomeData = allDates.map((date) => {
		const transaction = incomes.find((income) => income.date === date);
		return transaction ? transaction.amount : 0;
	});

	const expenseData = allDates.map((date) => {
		const transaction = expenses.find((expense) => expense.date === date);
		return transaction ? transaction.amount : 0;
	});

	const data = {
		labels: allDates,
		datasets: [
			{
				label: "Income",
				data: incomeData,
				backgroundColor: "green",
				tension: 0.2,
			},
			{
				label: "Expenses",
				data: expenseData,
				backgroundColor: "red",
				tension: 0.2,
			},
		],
	};

	return (
		<div className="bg-gray-50 border-2 border-white shadow-md p-4 rounded-xl h-full">
			<Line data={data} />
		</div>
	);
}
