import ChooseStream from "@/lib/database/models/ChooseStream.model"
import mongoose from "mongoose"

export async function POST(req: Request) {
	const uri = process.env.MONGODB_URI as string
	const chooseStreamData = await req.json()

	try {
		await mongoose.connect(uri)
		const chooseStream = new ChooseStream(chooseStreamData)
		await chooseStream.save()

		return new Response(
			JSON.stringify({
				ok: true,
				text: "Details saved successfully.",
			})
		)
	} catch (error: any) {
		const errorField = Object.keys(error.keyValue)[0]

		if (error.code === 11000) {
			return new Response(
				JSON.stringify({
					text: `Entered ${errorField} already exists.`,
				}),
				{
					status: 400,
				}
			)
		} else {
			return new Response(
				JSON.stringify({
					text: "Something went wrong on server.",
				}),
				{
					status: 500,
				}
			)
		}
	}
}
