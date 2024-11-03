import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
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
		},
		experience: {
			type: Number,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

TeacherSchema.index({ phone: 1, email: 1 }, { unique: true });

export default mongoose.models.Teacher ||
	mongoose.model("Teacher", TeacherSchema);
