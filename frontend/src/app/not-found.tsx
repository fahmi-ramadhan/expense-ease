import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-col text-center">
			<h2 className="text-3xl">There was a problem.</h2>
			<p>We could not find the page you were looking for.</p>
			<p>
				Go back to the{" "}
				<Link href="/" className="text-blue-500">
					Dashboard
				</Link>
			</p>
		</main>
	);
}
