import mongoose from "mongoose"

const InterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  domain: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  questions: [
    {
      id: Number,
      question: String,
      domain: String,
      difficulty: String,
      expectedAnswer: String,
      keywords: [String],
      timeLimit: Number,
    },
  ],
  answers: [
    {
      questionId: Number,
      answer: String,
      evaluation: {
        score: Number,
        strengths: [String],
        improvements: [String],
        feedback: String,
        keywordsCovered: [String],
        overallAssessment: String,
      },
      timestamp: Date,
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["in_progress", "completed", "abandoned"],
    default: "in_progress",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
})

export default mongoose.models.Interview || mongoose.model("Interview", InterviewSchema)
