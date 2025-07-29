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

    const { domain, difficulty, questionCount, resumeData } = await request.json()

    // Validate input
    if (!domain || !difficulty || !questionCount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    let prompt = ""

    if (resumeData) {
      prompt = `Based on this resume data: ${resumeData}, generate ${questionCount} ${difficulty} level interview questions for a ${domain} role. Focus on the candidate's experience and skills mentioned in the resume.`
    } else {
      prompt = `Generate ${questionCount} ${difficulty} level interview questions for ${domain}. Include a mix of theoretical concepts, practical scenarios, and coding problems.`
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt:
        prompt +
        `

Format the response as a JSON array with this structure:
[
  {
    "id": 1,
    "question": "Question text here",
    "domain": "${domain}",
    "difficulty": "${difficulty}",
    "expectedAnswer": "Brief expected answer outline",
    "keywords": ["keyword1", "keyword2"],
    "timeLimit": 300
  }
]`,
      system:
        "You are an expert technical interviewer. Generate high-quality, relevant interview questions that test both theoretical knowledge and practical skills. Make questions challenging but fair.",
    })

    // Parse the generated questions
    let questions
    try {
      questions = JSON.parse(text)
    } catch (parseError) {
      // Fallback questions if AI response isn't valid JSON
      questions = Array.from({ length: questionCount }, (_, i) => ({
        id: i + 1,
        question: `Sample ${domain} question ${i + 1} at ${difficulty} level`,
        domain,
        difficulty,
        expectedAnswer: "Sample expected answer",
        keywords: ["sample", "keyword"],
        timeLimit: 300,
      }))
    }

    // Create interview session
    const sessionId = `session_${Date.now()}_${user.userId}`
    const interview = await Interview.create({
      userId: user.userId,
      sessionId,
      domain,
      difficulty,
      questions,
      status: "in_progress",
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      questions,
      sessionId,
      interviewId: interview._id,
    })
  } catch (error) {
    console.error("Error generating questions:", error)
    return NextResponse.json({ success: false, message: "Failed to generate questions" }, { status: 500 })
  }
}
