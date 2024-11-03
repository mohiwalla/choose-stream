"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { logo, name, navLinks } from "@/app/config/constants"
import { Button } from "./ui/button"
import WhatsappButton from "./whatsappButton"

export default function Nav() {
	const route = usePathname()

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
					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						<WhatsappButton />
					</div>
				</div>
			</nav>
		</header>
	)
}
