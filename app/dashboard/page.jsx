"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, FileText, BarChart3, Clock, Trophy, Target, Play, Settings, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "January 2024",
  })

  const [stats] = useState({
    totalInterviews: 24,
    averageScore: 85,
    totalTime: 12.5,
    streak: 7,
  })

  const [recentInterviews] = useState([
    {
      id: 1,
      domain: "MERN Stack",
      score: 88,
      questions: 15,
      duration: "45 min",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      domain: "DevOps",
      score: 92,
      questions: 20,
      duration: "60 min",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      domain: "AI/ML",
      score: 76,
      questions: 12,
      duration: "35 min",
      date: "2024-01-13",
      status: "completed",
    },
  ])

  const dashboardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      )

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        },
      )
    }, dashboardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100 dark:from-slate-900 dark:via-slate-800 dark:to-orange-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <div ref={dashboardRef} className="p-6 lg:p-8">
          {/* Header */}
          <div className="dashboard-card mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Ready to ace your next interview? Let's get started - it's completely free!
                </p>
              </div>
              <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-3">
                <Link href="/interview/setup">
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 group">
                    <Plus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start New Interview
                  </Button>
                </Link>
                <Link href="/dashboard/history">
                  <Button
                    variant="outline"
                    className="px-6 py-3 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 bg-transparent"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View History
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="stat-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Interviews</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalInterviews}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Average Score</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.averageScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Time</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalTime}h</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Current Streak</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.streak} days</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Interviews */}
            <div className="lg:col-span-2">
              <Card className="dashboard-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        Recent Interviews
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Your latest interview sessions
                      </CardDescription>
                    </div>
                    <Link href="/dashboard/history">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                      >
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{interview.domain}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {interview.questions} questions • {interview.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={interview.score >= 80 ? "default" : "secondary"} className="mb-1">
                          {interview.score}%
                        </Badge>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{interview.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar content continues with updated colors... */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="dashboard-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/interview/setup">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Play className="mr-3 h-4 w-4" />
                      Start Interview
                    </Button>
                  </Link>
                  <Link href="/resume/upload">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </Link>
                  <Link href="/dashboard/history">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <BarChart3 className="mr-3 h-4 w-4" />
                      View Analytics
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="dashboard-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                    This Week's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Interviews Completed</span>
                      <span className="font-medium text-slate-900 dark:text-white">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Average Score</span>
                      <span className="font-medium text-slate-900 dark:text-white">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Study Time</span>
                      <span className="font-medium text-slate-900 dark:text-white">8.5h</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="dashboard-card bg-gradient-to-r from-orange-600 to-red-600 border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Trophy className="h-8 w-8" />
                    <div>
                      <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
                      <p className="text-orange-100 text-sm">7-day streak completed</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    View All Achievements
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
