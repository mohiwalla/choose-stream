import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import {
	name,
	title,
	authors,
	description,
	images,
	type,
	siteName,
	url,
	card,
	creator,
	keywords,
	lang,
} from "./config/constants"
import Header from "@/components/header"

export const metadata: Metadata = {
	title: name,
	description: description,
	authors: authors,
	openGraph: {
		title: title,
		description: description,
		images: images,
		type: type,
		siteName: siteName,
		url: url,
	},
	twitter: {
		title: siteName,
		description: description,
		images: images,
		card: card,
		creator: creator,
		site: creator,
	},
	keywords: keywords,
	metadataBase: new URL(url),
}

const globalFontFamily = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang={lang} className={globalFontFamily.className} suppressHydrationWarning>
			<head></head>

			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
