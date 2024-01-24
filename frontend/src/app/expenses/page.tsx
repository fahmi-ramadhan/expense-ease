"use client";

import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/definitions";
import { getExpenses, deleteExpense, addExpense } from "@/lib/actions";
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

	const [allExpenses, setAllExpenses] = useState<Transaction[]>([]);
	const [expenses, setExpenses] = useState<Transaction[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getExpenses()
			.then((expenses: Transaction[]) => {
				setAllExpenses(expenses);
				setExpenses(
					expenses.filter(
						(expense) =>
							expense.title.toLowerCase().includes(query.toLowerCase()) ||
							expense.amount.toString().includes(query) ||
							expense.category.toLowerCase().includes(query.toLowerCase()) ||
							expense.description.toLowerCase().includes(query.toLowerCase())
					)
				);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching expenses:", error);
			});
	}, []);

	useEffect(() => {
		setExpenses(
			allExpenses.filter(
				(expense) =>
					expense.title.toLowerCase().includes(query.toLowerCase()) ||
					expense.amount.toString().includes(query) ||
					expense.category.toLowerCase().includes(query.toLowerCase()) ||
					expense.description.toLowerCase().includes(query.toLowerCase())
			)
		);
	}, [query, allExpenses]);

	const handleDelete = (id: string) => {
		deleteExpense(id)
			.then(() => {
				const updatedExpenses = allExpenses.filter(
					(expense) => expense.id !== id
				);
				setAllExpenses(updatedExpenses);
				setExpenses(
					updatedExpenses.filter(
						(expense) =>
							expense.title.toLowerCase().includes(query.toLowerCase()) ||
							expense.amount.toString().includes(query) ||
							expense.category.toLowerCase().includes(query.toLowerCase()) ||
							expense.description.toLowerCase().includes(query.toLowerCase())
					)
				);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAddExpense = async (expense: Omit<Transaction, "id">) => {
		try {
			const newExpense = await addExpense(expense);
			setAllExpenses((prevExpenses) => {
				const updatedExpenses = [...prevExpenses, newExpense];
				updatedExpenses.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
				return updatedExpenses;
			});
		} catch (error) {
			console.error("An error occurred while adding the expense:", error);
		}
	};

	return (
		<main className="flex flex-col">
			<h1 className="text-2xl font-bold md:block hidden">Expenses</h1>
			<div className="flex gap-4 mt-4">
				<div className="w-1/4 lg:block hidden">
					<Form addTransaction={handleAddExpense} transactionType="expense" />
				</div>
				<div className="w-full lg:w-3/4">
					<div className="w-full mb-4 flex items-center justify-between gap-2">
						<Search placeholder="Search expense..." />
						<button
							className="lg:hidden bg-gray-800 text-white text-sm p-2 rounded-md"
							onClick={() => setIsModalOpen(true)}
						>
							Add Expense
						</button>
					</div>
					{isLoading ? (
						<div className="flex justify-center">
							<div className="border-4 border-gray-200 rounded-full h-8 w-8 mt-2 animate-spin border-t-gray-800"></div>
						</div>
					) : (
						[...expenses].reverse().map((expense) => {
							return (
								<TransactionItem
									transaction={{ ...expense, type: "expense" as "expense" }}
									handleDelete={handleDelete}
									key={expense.id}
								/>
							);
						})
					)}
				</div>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Form addTransaction={handleAddExpense} transactionType="expense" />
			</Modal>
		</main>
	);
}
