import { Brain, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Demo", href: "/demo" },
      { name: "API", href: "/api" },
      { name: "Support", href: "/support" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                InterviewAI
              </span>
            </Link>
            <p className="text-slate-600 mb-6 max-w-md">
              Master your next tech interview with AI-powered questions, voice interactions, and personalized feedback
              across 50+ domains - completely free forever!
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <Mail className="h-4 w-4 text-slate-500" />
              <a
                href="mailto:kishorguguloth96@gmail.com"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                kishorguguloth96@gmail.com
              </a>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/kishorguguloth"
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/kishorguguloth"
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <a
                href="mailto:kishorguguloth96@gmail.com"
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 InterviewAI. All rights reserved.</p>
          <p className="text-slate-500 text-sm mt-4 md:mt-0">Built with ❤️ by Kishor</p>
        </div>
      </div>
    </footer>
  )
}
