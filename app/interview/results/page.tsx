"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Download,
  Share2,
  RotateCcw,
  Home,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
} from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function InterviewResultsPage() {
  const [results] = useState({
    score: 85,
    totalQuestions: 15,
    correctAnswers: 13,
    timeSpent: "42:30",
    domain: "MERN Stack",
    difficulty: "Intermediate",
    date: new Date().toLocaleDateString(),
    strengths: ["React Hooks", "Node.js APIs", "Database Design"],
    improvements: ["Error Handling", "Testing Strategies"],
    detailedResults: [
      { question: "Explain React useState hook", status: "correct", score: 9, time: "3:20" },
      { question: "MongoDB aggregation pipeline", status: "correct", score: 8, time: "4:15" },
      { question: "Express middleware implementation", status: "partial", score: 6, time: "2:45" },
      { question: "JWT authentication process", status: "correct", score: 9, time: "3:50" },
      { question: "React component lifecycle", status: "incorrect", score: 3, time: "2:10" },
    ],
  })

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate score circle
      gsap.fromTo(
        ".score-circle",
        { rotation: 0, scale: 0 },
        { rotation: 360, scale: 1, duration: 1.5, ease: "back.out(1.7)" },
      )

      // Animate cards
      gsap.fromTo(
        ".result-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      )

      // Animate progress bars
      gsap.fromTo(".progress-bar", { width: 0 }, { width: "100%", duration: 1, delay: 0.5, ease: "power3.out" })
    }, resultsRef)

    return () => ctx.revert()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500"
    if (score >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-500"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "incorrect":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
      case "incorrect":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
      case "partial":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div ref={resultsRef} className="p-6 lg:p-8">
          {/* Header */}
          <div className="result-card mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4">
                Interview Results
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {results.domain} • {results.difficulty} Level • {results.date}
              </p>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-8">
              <div className="score-circle relative">
                <div
                  className={`w-48 h-48 rounded-full bg-gradient-to-r ${getScoreColor(results.score)} flex items-center justify-center shadow-2xl`}
                >
                  <div className="w-40 h-40 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{results.score}%</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Overall Score</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {results.correctAnswers}/{results.totalQuestions}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Questions Correct</div>
              </CardContent>
            </Card>

            <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{results.timeSpent}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Time Spent</div>
              </CardContent>
            </Card>

            <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">+12%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Improvement</div>
              </CardContent>
            </Card>

            <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">A-</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Grade</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Detailed Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question Breakdown */}
              <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Question Breakdown</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Detailed performance on each question
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.detailedResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(result.status)}
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            Q{index + 1}: {result.question}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Time: {result.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(result.status)}>{result.score}/10</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Analysis */}
              <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.strengths.map((strength, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                        >
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.improvements.map((improvement, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                        >
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/interview/setup">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Retake Interview
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full rounded-xl h-12 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl h-12 bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Results
                  </Button>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full rounded-xl h-12">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card className="result-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">This Month</span>
                      <span className="font-medium text-slate-900 dark:text-white">85%</span>
                    </div>
                    <div className="progress-bar">
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Last Month</span>
                      <span className="font-medium text-slate-900 dark:text-white">73%</span>
                    </div>
                    <div className="progress-bar">
                      <Progress value={73} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Overall</span>
                      <span className="font-medium text-slate-900 dark:text-white">79%</span>
                    </div>
                    <div className="progress-bar">
                      <Progress value={79} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="result-card bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="font-bold text-lg">Recommendations</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-indigo-100">
                    <li>• Practice error handling patterns</li>
                    <li>• Review testing methodologies</li>
                    <li>• Focus on system design concepts</li>
                    <li>• Strengthen database optimization</li>
                  </ul>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4 bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    View Study Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
