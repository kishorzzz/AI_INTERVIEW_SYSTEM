import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Resume from "@/models/Resume"
import { verifyToken } from "@/lib/auth"
import pdf from "pdf-parse"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request) {
  try {
    await connectDB()

    // Verify authentication
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("resume")

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json({ success: false, message: "Only PDF files are supported" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File size must be less than 10MB" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse PDF
    let pdfText = ""
    try {
      const pdfData = await pdf(buffer)
      pdfText = pdfData.text
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError)
      return NextResponse.json({ success: false, message: "Failed to parse PDF" }, { status: 400 })
    }

    // Extract information using simple text analysis
    const resumeData = await analyzeResume(pdfText)

    // Save resume data
    const resume = await Resume.create({
      userId: user.userId,
      filename: file.name,
      parsedData: resumeData,
      suggestedRole: resumeData.suggestedRole,
      suggestedDomain: resumeData.suggestedDomain,
      uploadedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      resumeData,
      resumeId: resume._id,
      message: "Resume parsed successfully",
    })
  } catch (error) {
    console.error("Error parsing resume:", error)
    return NextResponse.json({ success: false, message: "Failed to parse resume" }, { status: 500 })
  }
}

async function analyzeResume(text) {
  // Simple text analysis for resume parsing
  const lowerText = text.toLowerCase()

  // Extract skills
  const skillKeywords = [
    "javascript",
    "python",
    "java",
    "react",
    "node.js",
    "mongodb",
    "sql",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "html",
    "css",
    "typescript",
    "angular",
    "vue",
    "express",
    "django",
    "flask",
    "spring",
    "mysql",
    "postgresql",
    "redis",
    "elasticsearch",
    "jenkins",
    "terraform",
  ]

  const skills = skillKeywords.filter((skill) => lowerText.includes(skill))

  // Determine suggested domain based on skills
  let suggestedDomain = "Full Stack"
  let suggestedRole = "Software Developer"

  if (skills.some((skill) => ["react", "angular", "vue"].includes(skill))) {
    suggestedDomain = "Frontend Development"
    suggestedRole = "Frontend Developer"
  } else if (skills.some((skill) => ["node.js", "express", "django", "flask"].includes(skill))) {
    suggestedDomain = "Backend Development"
    suggestedRole = "Backend Developer"
  } else if (skills.some((skill) => ["react", "node.js", "mongodb", "express"].includes(skill))) {
    suggestedDomain = "MERN Stack"
    suggestedRole = "MERN Stack Developer"
  } else if (skills.some((skill) => ["aws", "docker", "kubernetes", "jenkins"].includes(skill))) {
    suggestedDomain = "DevOps"
    suggestedRole = "DevOps Engineer"
  } else if (skills.some((skill) => ["python", "machine learning", "tensorflow", "pytorch"].includes(skill))) {
    suggestedDomain = "AI/ML"
    suggestedRole = "ML Engineer"
  }

  // Extract experience (simple pattern matching)
  const experienceMatch = text.match(/(\d+)[\s+]*years?\s+(?:of\s+)?experience/i)
  const experience = experienceMatch ? Number.parseInt(experienceMatch[1]) : 0

  // Extract education
  const educationKeywords = ["bachelor", "master", "phd", "degree", "university", "college"]
  const hasEducation = educationKeywords.some((keyword) => lowerText.includes(keyword))

  return {
    skills,
    experience,
    hasEducation,
    suggestedRole,
    suggestedDomain,
    confidenceScore: skills.length > 3 ? 0.85 : 0.65,
    rawText: text.substring(0, 1000), // First 1000 characters for reference
  }
}
