import mongoose from "mongoose"

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  parsedData: {
    skills: [String],
    experience: Number,
    hasEducation: Boolean,
    suggestedRole: String,
    suggestedDomain: String,
    confidenceScore: Number,
    rawText: String,
  },
  suggestedRole: {
    type: String,
    required: true,
  },
  suggestedDomain: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema)
