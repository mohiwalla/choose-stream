import mongoose from "mongoose"

const ChooseStreamSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		ePunjabID: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		marks: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.ChooseStream ||
	mongoose.model("ChooseStream", ChooseStreamSchema)
