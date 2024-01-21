"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
	const pathName = usePathname();

	return (
		<nav className="h-screen bg-gray-800 text-white w-64 fixed top-0 left-0 overflow-auto">
			<ul>
				<li className={pathName === "/" ? "bg-gray-900" : ""}>
					<Link href="/">
						<p className="block px-4 py-2">Dashboard</p>
					</Link>
				</li>
				<li className={pathName === "/transactions" ? "bg-gray-900" : ""}>
					<Link href="/transactions">
						<p className="block px-4 py-2">View Transactions</p>
					</Link>
				</li>
				<li className={pathName === "/incomes" ? "bg-gray-900" : ""}>
					<Link href="/incomes">
						<p className="block px-4 py-2">Incomes</p>
					</Link>
				</li>
				<li className={pathName === "/expenses" ? "bg-gray-900" : ""}>
					<Link href="/expenses">
						<p className="block px-4 py-2">Expenses</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
