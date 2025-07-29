"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Mic, FileText, BarChart3, Users, Zap, ArrowRight, Play, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".hero-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" },
      )

      // Feature cards animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        },
      )

      // Floating animation for hero elements
      gsap.to(".floating", {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, [heroRef, featuresRef, statsRef])

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Advanced GPT-4 generated questions tailored to your skills and experience level.",
      gradient: "from-blue-100 to-indigo-100",
      iconBg: "from-blue-400 to-indigo-500",
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "Upload your resume and get personalized interview questions based on your profile.",
      gradient: "from-emerald-100 to-teal-100",
      iconBg: "from-emerald-400 to-teal-500",
    },
    {
      icon: Mic,
      title: "Voice Interviews",
      description: "Experience realistic interviews with text-to-speech technology.",
      gradient: "from-purple-100 to-pink-100",
      iconBg: "from-purple-400 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Track your progress with detailed analytics and interview history.",
      gradient: "from-amber-100 to-orange-100",
      iconBg: "from-amber-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Multi-Domain Support",
      description: "Practice for MERN, DevOps, AI/ML, DSA, and many more tech domains.",
      gradient: "from-rose-100 to-red-100",
      iconBg: "from-rose-400 to-red-500",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback and detailed performance reports after each session.",
      gradient: "from-cyan-100 to-blue-100",
      iconBg: "from-cyan-400 to-blue-500",
    },
  ]

  const stats = [
    { number: "95%", label: "Success Rate", icon: Star },
    { number: "50+", label: "Tech Domains", icon: Brain },
    { number: "24/7", label: "Available", icon: CheckCircle },
    { number: "Free", label: "Always", icon: Zap },
  ]

  const domains = [
    "MERN Stack",
    "DevOps",
    "AI/ML",
    "Data Analytics",
    "DSA",
    "System Design",
    "React.js",
    "Node.js",
    "Python",
    "Java",
    "Cloud Computing",
    "Cybersecurity",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20" />

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating" />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="hero-title">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Interview System
              </span>
            </h1>
          </div>

          <div className="hero-subtitle">
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master your next tech interview with AI-generated questions, voice interactions, and personalized feedback
              across 50+ domains - completely free forever!
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
              >
                Start Your Interview
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-2xl border-2 border-slate-200 hover:bg-white/80 hover:border-blue-300 transition-all duration-300 group bg-white/60 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {domains.slice(0, 6).map((domain, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-white/90 transition-all duration-200"
              >
                {domain}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700"
            >
              +44 more
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to ace your next technical interview - completely free forever
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`feature-card group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm overflow-hidden hover:scale-105`}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white overflow-hidden shadow-2xl">
            <CardContent className="p-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Join thousands of developers who have improved their interview skills with our free AI-powered
                  platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="px-8 py-4 text-lg rounded-2xl bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-4 text-lg rounded-2xl border-white text-white hover:bg-white/10 transition-all duration-300 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
