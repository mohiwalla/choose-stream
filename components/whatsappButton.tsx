import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { defaultWhatsappMessage, whatsappNumber } from "@/app/config/constants"

export default function WhatsappButton() {
	return (
		<Button asChild variant="outline" className="py-5">
			<Link
				aria-label="Ask for more details on WhatsApp"
				href={`whatsapp://send?phone=${whatsappNumber}&text=${encodeURI(
					defaultWhatsappMessage
				)}`}
				className="gap-2"
				target="_blank"
			>
				<span
					className="hidden sm:block"
				>
					WhatsApp
				</span>
				<Image
					src="/images/whatsapp.svg"
					alt=""
					width={0}
					height={0}
					className="w-5 inline-block same mix-blend-difference"
				/>
			</Link>
		</Button>
	)
}
