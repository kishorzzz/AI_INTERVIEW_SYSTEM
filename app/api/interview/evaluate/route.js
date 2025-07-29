import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { connectDB } from "@/lib/mongodb"
import Interview from "@/models/Interview"
import { verifyToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    // Verify authentication
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { sessionId, questionId, question, answer, domain, difficulty } = await request.json()

    // Validate input
    if (!sessionId || !questionId || !question || !answer) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Evaluate this interview answer:

Question: ${question}
Answer: ${answer}
Domain: ${domain}
Difficulty: ${difficulty}

Provide a detailed evaluation including:
1. Score out of 10
2. Strengths in the answer
3. Areas for improvement
4. Specific feedback
5. Keywords covered

Format as JSON:
{
  "score": 8,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "feedback": "Detailed feedback text",
  "keywordsCovered": ["keyword1", "keyword2"],
  "overallAssessment": "Brief overall assessment"
}`,
      system:
        "You are an expert technical interviewer. Provide constructive, detailed feedback on interview answers. Be fair but thorough in your evaluation.",
    })

    let evaluation
    try {
      evaluation = JSON.parse(text)
    } catch (parseError) {
      // Fallback evaluation
      evaluation = {
        score: 7,
        strengths: ["Good understanding of concepts"],
        improvements: ["Could provide more specific examples"],
        feedback: "Solid answer with room for improvement",
        keywordsCovered: ["basic concepts"],
        overallAssessment: "Satisfactory response",
      }
    }

    // Update interview with answer and evaluation
    await Interview.findOneAndUpdate(
      { sessionId, userId: user.userId },
      {
        $push: {
          answers: {
            questionId,
            answer,
            evaluation,
            timestamp: new Date(),
          },
        },
      },
    )

    return NextResponse.json({
      success: true,
      evaluation,
    })
  } catch (error) {
    console.error("Error evaluating answer:", error)
    return NextResponse.json({ success: false, message: "Failed to evaluate answer" }, { status: 500 })
  }
}
