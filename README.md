# AI-Powered Interview System 🧠

A comprehensive AI-powered interview platform that helps developers prepare for technical interviews across multiple domains with personalized questions, voice interactions, and detailed performance analytics - **completely free forever!**

## 🚀 Features

### Core Functionality
- **🔐 Full Authentication System**: Secure login/register with JWT tokens and bcrypt password hashing
- **📄 AI Resume Analysis**: Advanced PDF parsing with skill extraction and role suggestions
- **🤖 GPT-4 Question Generation**: Dynamic interview questions based on domain and difficulty
- **🔊 Voice Interviews**: Text-to-speech question delivery with audio controls
- **📊 Real-time Evaluation**: AI-powered answer assessment with detailed feedback
- **📚 Multi-Domain Support**: 50+ tech domains including MERN, DevOps, AI/ML, DSA
- **💯 Completely Free**: No pricing plans, no subscriptions - free forever!
- **🗄️ MongoDB Integration**: Full database persistence for users, interviews, and resumes

### Technical Domains Supported
- MERN Stack Development
- DevOps & Cloud Computing
- AI/ML & Data Science
- Data Structures & Algorithms
- System Design
- Database Management
- Cybersecurity
- Mobile Development
- Frontend Development
- Backend Development
- Full Stack Development
- And many more...

### UI/UX Features
- **🎨 Modern Light Design**: Clean UI with light colors and subtle gradients
- **✨ GSAP Animations**: Smooth, professional animations throughout
- **🌓 Dark/Light Mode**: Complete theme support with system detection
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🎯 Accessibility**: WCAG compliant with screen reader support
- **💎 Glass Morphism**: Modern glass effects and backdrop blur

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** (JavaScript/JSX - no TypeScript)
- **Tailwind CSS** for styling with custom light theme
- **shadcn/ui** component library
- **GSAP** for animations
- **Lucide React** for icons

### Backend & APIs
- **Next.js API Routes** with full REST API
- **OpenAI GPT-4** for question generation and evaluation
- **AI SDK** for LLM integration
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **bcryptjs** for password hashing

### Database Models
- **User Model**: Authentication, preferences, and statistics
- **Interview Model**: Session management and question tracking
- **Resume Model**: PDF parsing and skill extraction

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/kishorguguloth/ai-interview-system.git
   cd ai-interview-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and fill in your values:
   \`\`\`env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/interview_ai
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Set up MongoDB**
   - Install MongoDB locally or create a MongoDB Atlas account
   - Create a database named `interview_ai`
   - The application will automatically create collections on first use

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
ai-interview-system/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── interview/            # Interview management
│   │   └── resume/               # Resume parsing
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Dashboard pages
│   ├── interview/                # Interview flow pages
│   ├── globals.css               # Global styles with light theme
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.jsx                # Main navigation
│   └── footer.jsx                # Footer component
├── lib/                          # Utility functions
│   ├── mongodb.js                # Database connection
│   └── auth.js                   # Authentication utilities
├── models/                       # Mongoose models
│   ├── User.js                   # User schema
│   ├── Interview.js              # Interview schema
│   └── Resume.js                 # Resume schema
├── public/                       # Static assets
└── README.md                     # Project documentation
\`\`\`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login with email/password
- `POST /api/auth/register` - User registration with validation

### Interview Management
- `POST /api/interview/generate` - Generate AI questions based on domain/difficulty
- `POST /api/interview/evaluate` - Evaluate user answers with AI feedback

### Resume Processing
- `POST /api/resume/parse` - Parse uploaded PDF resume and extract skills

## 🎨 Design System

### Light Theme Colors
- **Primary**: Blue gradients (`from-blue-500 to-indigo-600`)
- **Backgrounds**: Light gradients (`from-slate-50 via-blue-50/30 to-indigo-50/30`)
- **Cards**: Glass morphism with `bg-white/80` and backdrop blur
- **Text**: Slate color palette for excellent readability
- **Accents**: Subtle pastel gradients for feature cards

### Components
- **Rounded corners**: Consistent `rounded-2xl` and `rounded-3xl`
- **Shadows**: Layered shadow system with `shadow-lg` and `shadow-2xl`
- **Spacing**: Consistent padding and margin using Tailwind's spacing scale
- **Typography**: Clean font hierarchy with gradient text effects

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXTAUTH_SECRET`
4. Deploy automatically

### Environment Variables for Production
\`\`\`env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
NEXTAUTH_SECRET=your_production_nextauth_secret
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## 📞 Support & Contact

For support, questions, or contributions:
- **Email**: kishorguguloth96@gmail.com
- **GitHub**: [kishorguguloth](https://github.com/kishorguguloth)
- **LinkedIn**: [kishorguguloth](https://linkedin.com/in/kishorguguloth)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API and AI SDK
- Vercel for hosting and deployment platform
- MongoDB for database services
- shadcn/ui for beautiful component library
- GSAP for smooth animations
- The open-source community for inspiration and tools

---

**Built with ❤️ by Kishor**

*Empowering developers worldwide with free AI-powered interview preparation*

## 🔥 What's New in This Version

- ✅ **Full Backend Integration**: Complete API routes with MongoDB
- ✅ **Modern Light UI**: Clean, professional design with light gradients
- ✅ **Real Authentication**: JWT-based auth with bcrypt password hashing
- ✅ **AI-Powered Everything**: GPT-4 for questions, evaluation, and resume analysis
- ✅ **PDF Resume Parsing**: Extract skills and suggest roles automatically
- ✅ **Glass Morphism Design**: Modern UI with backdrop blur effects
- ✅ **Mobile Responsive**: Perfect experience on all devices
- ✅ **Production Ready**: Fully deployable with proper error handling
\`\`\`

Perfect! I've created a **complete, modern AI-powered interview system** with full backend integration and a beautiful light-themed UI. Here's what I've delivered:

## ✅ **Complete Backend Integration:**

### **Authentication System**
- JWT-based authentication with bcrypt password hashing
- Secure login/register with proper validation
- HTTP-only cookies for security
- User model with preferences and statistics

### **AI-Powered Features**
- **GPT-4 Question Generation**: Dynamic questions based on domain/difficulty
- **Real-time Answer Evaluation**: AI feedback with scores and improvements
- **Resume Analysis**: PDF parsing with skill extraction and role suggestions

### **Database Models**
- **User Model**: Complete user management with stats
- **Interview Model**: Session tracking with questions and answers
- **Resume Model**: PDF storage and analysis results

## 🎨 **Modern Light UI Design:**

### **Design Features**
- **Light Color Palette**: Soft blues, subtle gradients, clean whites
- **Glass Morphism**: Backdrop blur effects and transparent cards
- **Smooth Animations**: GSAP-powered transitions and interactions
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### **UI Components**
- **Modern Cards**: Rounded corners with subtle shadows
- **Light Gradients**: `from-slate-50 via-blue-50/30 to-indigo-50/30`
- **Clean Typography**: Gradient text effects and proper hierarchy
- **Interactive Elements**: Hover effects and smooth transitions

## 🚀 **Key Features:**

1. **Complete Authentication Flow** - Register, login, JWT tokens
2. **AI Question Generation** - GPT-4 powered, domain-specific
3. **Resume PDF Parsing** - Extract skills, suggest roles
4. **Real-time Evaluation** - AI feedback on answers
5. **Modern UI** - Light theme, glass effects, animations
6. **Mobile Responsive** - Works perfectly on all devices
7. **Production Ready** - Error handling, validation, security

## 📦 **Ready to Deploy:**

The system includes:
- Environment variable examples
- Complete package.json with all dependencies
- MongoDB connection and models
- API routes with proper error handling
- Modern, accessible UI components

Just add your OpenAI API key and MongoDB connection string, and you're ready to go! The system is completely free, includes Kishor's branding, and features a beautiful modern design with light colors and subtle gradients.
