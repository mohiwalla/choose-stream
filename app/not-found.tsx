import Link from "next/link"

export default function Error() {
	return (
		<div className="grid md:grid-cols-2 text-center p-12">
			<h1 className="md:text-9xl text-8xl font-black mb-2 text-red-600">
				404
			</h1>
			<p className="text-xl my-auto md:text-left">
				We couldn&apos;t find it 😕 Would you like to go&nbsp;
				<Link href="/" className="underline text-blue-600">
					home..?
				</Link>
			</p>
		</div>
	)
}
