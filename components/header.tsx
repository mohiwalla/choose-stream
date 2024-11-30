"use client"

import React from "react"
import Link from "next/link"
import { name } from "@/app/config/constants"

export default function Nav() {
	return (
		<header className="sticky top-0 z-10 backdrop-blur bg-background/60">
			<nav className="border-b">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap capitalize xs:inline hidden">
							{name}
						</span>
					</Link>
				</div>
			</nav>
		</header>
	)
}
