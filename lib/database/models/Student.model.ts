import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		standard: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		subject: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

StudentSchema.index({ phone: 1, email: 1 }, { unique: true })

export default mongoose.models.Student ||
	mongoose.model("Student", StudentSchema)
