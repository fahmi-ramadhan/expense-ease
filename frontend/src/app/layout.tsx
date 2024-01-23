import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Expense Ease",
	description:
		"A simple and intuitive app to track your income and expenses, helping you manage your finances with ease.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
					integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</head>
			<body className={inter.className}>
				<div className="flex h-screen flex-col md:flex-row md:overflow-hidden gap-4 p-4">
					<div className="w-full flex-none md:w-64">
						<Navigation />
					</div>
					<div className="flex-grow md:overflow-y-auto p-4 md:p-10 border-2 border-white bg-gray-100 shadow-md rounded-xl bg-opacity-80 text-gray-900">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
