import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InterviewAI - AI-Powered Interview System",
  description:
    "Master your next tech interview with AI-generated questions, voice interactions, and personalized feedback across 50+ domains.",
  keywords: "interview, AI, tech interview, coding interview, MERN, DevOps, AI/ML, DSA",
  authors: [{ name: "InterviewAI Team" }],
  openGraph: {
    title: "InterviewAI - AI-Powered Interview System",
    description:
      "Master your next tech interview with AI-generated questions, voice interactions, and personalized feedback.",
    type: "website",
    url: "https://interviewai.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewAI - AI-Powered Interview System",
    description:
      "Master your next tech interview with AI-generated questions, voice interactions, and personalized feedback.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
