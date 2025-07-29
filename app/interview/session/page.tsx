"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Mic, MicOff, Volume2, Play, Pause, SkipForward, Flag, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function InterviewSessionPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(15)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestionText, setCurrentQuestionText] = useState(
    "Can you explain the difference between React's useState and useEffect hooks? Provide examples of when you would use each one.",
  )

  const sessionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const questions = [
    {
      id: 1,
      text: "Can you explain the difference between React's useState and useEffect hooks? Provide examples of when you would use each one.",
      domain: "React.js",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      text: "How would you implement authentication in a MERN stack application? Walk me through the entire process.",
      domain: "MERN Stack",
      difficulty: "Advanced",
    },
    {
      id: 3,
      text: "Explain the concept of closures in JavaScript with a practical example.",
      domain: "JavaScript",
      difficulty: "Intermediate",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".session-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 },
      )
    }, sessionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayQuestion = () => {
    setIsPlaying(!isPlaying)
    setIsSpeaking(!isPlaying)

    if (!isPlaying) {
      // Simulate TTS
      setTimeout(() => {
        setIsSpeaking(false)
        setIsPlaying(false)
      }, 3000)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1)
      setCurrentQuestionText(
        questions[Math.min(currentQuestion, questions.length - 1)]?.text || "Next question loading...",
      )

      // Animate question change
      gsap.fromTo(".question-text", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
    } else {
      // Interview completed
      router.push("/interview/results")
    }
  }

  const handleEndInterview = () => {
    router.push("/interview/results")
  }

  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div ref={sessionRef} className="p-6 lg:p-8">
        {/* Header */}
        <div className="session-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
                Interview Session
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">MERN Stack • Intermediate Level</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <span className="text-lg font-mono font-semibold text-slate-900 dark:text-white">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <Button variant="destructive" onClick={handleEndInterview} className="rounded-xl">
                <Flag className="mr-2 h-4 w-4" />
                End Interview
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Question {currentQuestion} of {totalQuestions}
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Question Card */}
          <div className="lg:col-span-2">
            <Card className="session-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Current Question</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">React.js</Badge>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="question-text">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{currentQuestionText}</p>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-4 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayQuestion}
                    className={`w-16 h-16 rounded-full transition-all duration-300 ${
                      isSpeaking ? "bg-blue-500 text-white border-blue-500" : ""
                    }`}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {isSpeaking ? "Playing question..." : "Click to hear question"}
                    </p>
                    {isSpeaking && (
                      <div className="flex justify-center space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-blue-500 rounded-full animate-pulse"
                            style={{
                              height: Math.random() * 20 + 10,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-transparent">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Recording Controls */}
                <div className="text-center space-y-4">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-20 h-20 rounded-full transition-all duration-300 ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </Button>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isRecording ? "Recording your answer..." : "Click to start recording"}
                  </p>
                  {isRecording && (
                    <div className="flex justify-center">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" className="rounded-xl bg-transparent" onClick={handlePlayQuestion}>
                    Repeat Question
                  </Button>
                  <div className="space-x-3">
                    <Button
                      variant="ghost"
                      className="rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-6"
                    >
                      {currentQuestion === totalQuestions ? "Finish" : "Next Question"}
                      <SkipForward className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Info */}
            <Card className="session-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Session Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Domain:</span>
                  <Badge variant="secondary">MERN Stack</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Difficulty:</span>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Questions:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Completed:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{currentQuestion - 1}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="session-card bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-6 w-6" />
                  <h3 className="font-bold text-lg">Interview Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Take your time to think before answering</li>
                  <li>• Provide specific examples when possible</li>
                  <li>• Ask clarifying questions if needed</li>
                  <li>• Explain your thought process</li>
                </ul>
              </CardContent>
            </Card>

            {/* Question List */}
            <Card className="session-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNum) => (
                    <div
                      key={questionNum}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        questionNum === currentQuestion
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : questionNum < currentQuestion
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-slate-50 dark:bg-slate-700/50"
                      }`}
                    >
                      <span className="text-sm font-medium">Question {questionNum}</span>
                      {questionNum < currentQuestion ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : questionNum === currentQuestion ? (
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
