"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
	const pathName = usePathname();

	return (
		<nav className="flex h-full">
			<div className="flex flex-col grow bg-gray-100 border-2 border-white shadow-md p-4 gap-2 rounded-xl bg-opacity-80">
				<Link
					href="/"
					className="grid grid-cols-[30px,auto] items-center my-2 font-medium cursor-pointer transition-all duration-400 ease-in-out text-black pl-4 relative"
				>
					{pathName === "/" && (
						<div className="absolute left-0 top-0 w-1 h-full bg-black rounded-md"></div>
					)}
					<i className="fa-solid fa-chart-line"></i>
					<p>Dashboard</p>
				</Link>
				<Link
					href="/incomes"
					className="grid grid-cols-[30px,auto] items-center my-2 font-medium cursor-pointer transition-all duration-400 ease-in-out text-black pl-4 relative"
				>
					{pathName === "/incomes" && (
						<div className="absolute left-0 top-0 w-1 h-full bg-black rounded-md"></div>
					)}
					<i className="fa-solid fa-money-bill-trend-up"></i>
					<p>Incomes</p>
				</Link>
				<Link
					href="/expenses"
					className="grid grid-cols-[30px,auto] items-center my-2 font-medium cursor-pointer transition-all duration-400 ease-in-out text-black pl-4 relative"
				>
					{pathName === "/expenses" && (
						<div className="absolute left-0 top-0 w-1 h-full bg-black rounded-md"></div>
					)}

					<i className="fa-solid fa-money-bill-transfer"></i>
					<p>Expenses</p>
				</Link>
			</div>
		</nav>
	);
}
