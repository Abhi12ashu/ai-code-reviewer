# AI Code Reviewer 🤖

A professional code review tool powered by local AI. Get instant feedback on your code with detailed analysis and suggested fixes.

**Live Demo:** [vocal-figolla-194480.netlify.app](https://vocal-figolla-194480.netlify.app)  
**Source Code:** [github.com/Abhi12ashu/ai-code-reviewer](https://github.com/Abhi12ashu/ai-code-reviewer)

## ✨ Features

- **AI-Powered Analysis** - Uses local Ollama with Llama 3.1
- **Professional Feedback** - Code reviews with severity levels and scores
- **Real-time Results** - Instant analysis with beautiful UI
- **Multiple Review Tones** - Strict, Friendly, or Senior Engineer
- **100% Free & Private** - No API keys, runs locally

## 🚀 Quick Start

### Local Development
```bash

git clone https://github.com/Abhi12ashu/ai-code-reviewer.git
cd ai-code-reviewer
npm install
npm run dev

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Ollama with Llama 3.1 8B Instruct
- **Deployment:** Netlify (Static Export)
- **Notifications:** React Hot Toast

## 🎯 What It Analyzes

- Code quality and best practices
- Potential bugs and errors
- Performance improvements
- Security vulnerabilities
- Code style consistency
- Architectural suggestions

## 🚀 Quick Start

### Prerequisites

1. **Install Node.js** (18.x or higher)
2. **Install Ollama** from [ollama.ai](https://ollama.ai)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Abhi12ashu/ai-code-reviewer.git
cd ai-code-reviewer

# 2. Install dependencies
npm install

# 3. Start Ollama (in a separate terminal)
ollama serve

# 4. Pull the AI model (one-time setup)
ollama pull llama3.1:8b-instruct-q5_1

# 5. Start the development server
npm run dev
