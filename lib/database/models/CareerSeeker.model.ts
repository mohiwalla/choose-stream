import mongoose from "mongoose";

const CareerSeekerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		skills: {
			type: String,
			required: true,
		},
		linkedIn: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

CareerSeekerSchema.index({ phone: 1, email: 1 }, { unique: true });

export default mongoose.models.CareerSeeker ||
	mongoose.model("CareerSeeker", CareerSeekerSchema);
