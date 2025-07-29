"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Brain,
  FileText,
  Upload,
  Code,
  Server,
  Database,
  Cloud,
  Cpu,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function InterviewSetupPage() {
  const [step, setStep] = useState(1)
  const [setupType, setSetupType] = useState<"resume" | "manual">("resume")
  const [selectedDomain, setSelectedDomain] = useState("")
  const [questionCount, setQuestionCount] = useState([15])
  const [difficulty, setDifficulty] = useState("intermediate")
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const domains = [
    {
      id: "mern",
      name: "MERN Stack",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      description: "MongoDB, Express, React, Node.js",
    },
    {
      id: "devops",
      name: "DevOps",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
      description: "CI/CD, Docker, Kubernetes, AWS",
    },
    {
      id: "aiml",
      name: "AI/ML",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      description: "Machine Learning, Deep Learning, NLP",
    },
    {
      id: "data",
      name: "Data Analytics",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      description: "SQL, Python, Visualization, Statistics",
    },
    {
      id: "dsa",
      name: "DSA",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      description: "Algorithms, Data Structures, Problem Solving",
    },
    {
      id: "cloud",
      name: "Cloud Computing",
      icon: Cloud,
      color: "from-sky-500 to-blue-500",
      description: "AWS, Azure, GCP, Serverless",
    },
    {
      id: "database",
      name: "Database",
      icon: Database,
      color: "from-teal-500 to-green-500",
      description: "SQL, NoSQL, Database Design",
    },
    {
      id: "fullstack",
      name: "Full Stack",
      icon: Code,
      color: "from-violet-500 to-purple-500",
      description: "Frontend + Backend Development",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".setup-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
    }, containerRef)

    return () => ctx.revert()
  }, [step])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleStartInterview = async () => {
    setIsLoading(true)
    // Simulate setup processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/interview/session")
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="setup-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Choose Setup Method
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                How would you like to generate your interview questions?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={setupType} onValueChange={(value) => setSetupType(value as "resume" | "manual")}>
                <div className="space-y-4">
                  <div
                    className={`flex items-center space-x-4 p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      setupType === "resume"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <RadioGroupItem value="resume" id="resume" />
                    <div className="flex-1">
                      <Label htmlFor="resume" className="flex items-center cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">Upload Resume</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            AI analyzes your resume and generates personalized questions
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-4 p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      setupType === "manual"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <RadioGroupItem value="manual" id="manual" />
                    <div className="flex-1">
                      <Label htmlFor="manual" className="flex items-center cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">Choose Domain</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Manually select a tech domain for targeted practice
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return setupType === "resume" ? (
          <Card className="setup-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Upload Your Resume
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Upload your resume in PDF format for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Drop your resume here</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">or click to browse files</p>
                <Button variant="outline" className="rounded-xl bg-transparent">
                  Choose File
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Supports PDF files up to 10MB</p>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="px-8 py-3 rounded-xl bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Analyze Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="setup-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Select Domain
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Choose the technology domain you want to practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map((domain) => (
                  <div
                    key={domain.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedDomain === domain.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => setSelectedDomain(domain.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${domain.color} rounded-lg flex items-center justify-center`}
                      >
                        <domain.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{domain.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{domain.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="px-8 py-3 rounded-xl bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedDomain}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="setup-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                Configure Interview
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Customize your interview settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Question Count */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-slate-900 dark:text-white">
                  Number of Questions: {questionCount[0]}
                </Label>
                <Slider
                  value={questionCount}
                  onValueChange={setQuestionCount}
                  max={30}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>5 questions</span>
                  <span>30 questions</span>
                </div>
              </div>

              <Separator />

              {/* Difficulty Level */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-slate-900 dark:text-white">Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                  <div className="space-y-3">
                    {[
                      { value: "beginner", label: "Beginner", description: "Basic concepts and fundamentals" },
                      {
                        value: "intermediate",
                        label: "Intermediate",
                        description: "Moderate complexity with practical scenarios",
                      },
                      { value: "advanced", label: "Advanced", description: "Complex problems and system design" },
                    ].map((level) => (
                      <div key={level.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={level.value} id={level.value} />
                        <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{level.label}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{level.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Summary */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Interview Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Setup Type:</span>
                    <Badge variant="secondary">{setupType === "resume" ? "Resume Analysis" : "Manual Selection"}</Badge>
                  </div>
                  {setupType === "manual" && selectedDomain && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Domain:</span>
                      <Badge variant="secondary">{domains.find((d) => d.id === selectedDomain)?.name}</Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Questions:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{questionCount[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Difficulty:</span>
                    <Badge variant="secondary" className="capitalize">
                      {difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Estimated Time:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {Math.ceil(questionCount[0] * 2.5)} minutes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="px-8 py-3 rounded-xl bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleStartInterview}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  {isLoading ? "Preparing..." : "Start Interview"}
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div ref={containerRef} className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
                  Interview Setup
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Configure your personalized interview experience
                </p>
              </div>
              <Link href="/dashboard">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= stepNumber
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        step > stepNumber
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">{renderStep()}</div>
        </div>
      </div>
    </div>
  )
}
