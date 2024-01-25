"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import { getIncomes, deleteIncome, addIncome } from "@/lib/actions";
import Form from "@/components/add-form";
import Search from "@/components/search";
import TransactionItem from "@/components/transaction-item";
import Modal from "@/components/modal";

export default function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || "";

	const [allIncomes, setAllIncomes] = useState<Transaction[]>([]);
	const [incomes, setIncomes] = useState<Transaction[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getIncomes()
			.then((incomes: Transaction[]) => {
				setAllIncomes(incomes);
				setIncomes(
					incomes.filter(
						(income) =>
							income.title.toLowerCase().includes(query.toLowerCase()) ||
							income.amount.toString().includes(query) ||
							income.category.toLowerCase().includes(query.toLowerCase()) ||
							income.description.toLowerCase().includes(query.toLowerCase())
					)
				);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching incomes:", error);
			});
	}, [query]);

	useEffect(() => {
		setIncomes(
			allIncomes.filter(
				(income) =>
					income.title.toLowerCase().includes(query.toLowerCase()) ||
					income.amount.toString().includes(query) ||
					income.category.toLowerCase().includes(query.toLowerCase()) ||
					income.description.toLowerCase().includes(query.toLowerCase())
			)
		);
	}, [query, allIncomes]);

	const handleDelete = (id: string) => {
		deleteIncome(id)
			.then(() => {
				const updatedIncomes = allIncomes.filter((income) => income.id !== id);
				setAllIncomes(updatedIncomes);
				setIncomes(
					updatedIncomes.filter(
						(income) =>
							income.title.toLowerCase().includes(query.toLowerCase()) ||
							income.amount.toString().includes(query) ||
							income.category.toLowerCase().includes(query.toLowerCase()) ||
							income.description.toLowerCase().includes(query.toLowerCase())
					)
				);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAddIncome = async (income: Omit<Transaction, "id">) => {
		try {
			const newIncome = await addIncome(income);
			setAllIncomes((prevIncomes) => {
				const updatedIncomes = [...prevIncomes, newIncome];
				updatedIncomes.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
				return updatedIncomes;
			});
		} catch (error) {
			console.error("An error occurred while adding the income:", error);
		}
	};

	return (
		<main className="flex flex-col">
			<h1 className="text-2xl font-bold md:block hidden">Incomes</h1>
			<div className="flex gap-4 mt-4">
				<div className="w-1/4 lg:block hidden">
					<Form addTransaction={handleAddIncome} transactionType="income" />
				</div>
				<div className="w-full lg:w-3/4">
					<div className="w-full mb-4 flex items-center justify-between gap-2">
						<Search placeholder="Search income..." />
						<button
							className="lg:hidden bg-gray-800 text-white text-sm p-2 rounded-md"
							onClick={() => setIsModalOpen(true)}
						>
							Add Income
						</button>
					</div>
					{isLoading ? (
						<div className="flex justify-center">
							<div className="border-4 border-gray-200 rounded-full h-8 w-8 mt-2 animate-spin border-t-gray-800"></div>
						</div>
					) : (
						[...incomes].reverse().map((income) => {
							return (
								<TransactionItem
									transaction={{ ...income, type: "income" as "income" }}
									handleDelete={handleDelete}
									key={income.id}
								/>
							);
						})
					)}
				</div>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Form addTransaction={handleAddIncome} transactionType="income" />
			</Modal>
		</main>
	);
}
