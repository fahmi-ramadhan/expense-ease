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
	const data = {
		labels: incomes.map((inc) => {
			const { date } = inc;
			return date;
		}),
		datasets: [
			{
				label: "Income",
				data: [
					...incomes.map((income) => {
						const { amount } = income;
						return amount;
					}),
				],
				backgroundColor: "green",
				tension: 0.2,
			},
			{
				label: "Expenses",
				data: [
					...expenses.map((expense) => {
						const { amount } = expense;
						return amount;
					}),
				],
				backgroundColor: "red",
				tension: 0.2,
			},
		],
	};

	return (
		<div className="bg-gray-100 border-2 border-white shadow-md p-4 rounded-xl h-full">
			<Line data={data} />
		</div>
	);
}
