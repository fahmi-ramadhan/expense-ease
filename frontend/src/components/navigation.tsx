"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const pathName = usePathname();

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const currentPage = () => {
		if (pathName === "/") {
			return "Dashboard";
		} else if (pathName.startsWith("/incomes")) {
			return "Incomes";
		} else if (pathName.startsWith("/expenses")) {
			return "Expenses";
		} else {
			return "404";
		}
	};

	const tabs = [
		{ href: "/", icon: "fa-solid fa-chart-line", text: "Dashboard" },
		{
			href: "/incomes",
			icon: "fa-solid fa-money-bill-trend-up",
			text: "Incomes",
		},
		{
			href: "/expenses",
			icon: "fa-solid fa-money-bill-transfer",
			text: "Expenses",
		},
	];

	return (
		<nav className="flex flex-col h-full">
			<div className="md:hidden p-4 rounded-md text-gray-900 text-xl font-bold bg-gray-100 bg-opacity-80 border-2 border-white shadow-md flex justify-between items-center">
				<div></div>
				<span>{currentPage()}</span>
				<button onClick={toggleNav}>
					<i className="fa-solid fa-bars"></i>
				</button>
			</div>
			<div
				className={`flex flex-col grow bg-gray-100 border-2 border-white shadow-md p-2 sm:p-4 sm:gap-2 rounded-xl bg-opacity-80 mt-2 sm:mt-4 md:mt-0 ${
					isNavOpen || "hidden md:flex"
				}`}
			>
				{tabs.map((tab) => (
					<Link
						key={tab.href}
						href={tab.href}
						className="grid grid-cols-[30px,auto] items-center my-2 font-medium cursor-pointer pl-4 relative"
					>
						{tab.text === currentPage() && (
							<div className="absolute left-0 top-0 w-1 h-full bg-gray-900 rounded-md"></div>
						)}
						<i className={tab.icon}></i>
						<p>{tab.text}</p>
					</Link>
				))}
			</div>
		</nav>
	);
}
