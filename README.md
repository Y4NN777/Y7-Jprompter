# PromptForge7

![PromptForge7](https://img.shields.io/badge/PromptForge7-AI%20Prompt%20Converter-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtanNvbiI+PHBhdGggZD0iTTE1IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3WiIvPjxwYXRoIGQ9Ik0xNCAydjRhMiAyIDAgMCAwIDIgMmg0Ii8+PHBhdGggZD0iTTQgMTJoMSIvPjxwYXRoIGQ9Ik0xOSAxMmgxIi8+PHBhdGggZD0iTTEwIDE4di0xYTIgMiAwIDAgMSAyLTIgMiAyIDAgMCAwLTItMnYtMSIvPjwvc3ZnPg==)

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify)

> **Transform regular prompts into powerful structured JSON prompts that get better AI results.**

PromptForge7 is a cutting-edge web application that leverages Google's Gemini AI to convert natural language prompts into structured JSON formats, making your AI interactions more precise, consistent, and effective.

## ✨ Features

- 🧠 **AI-Powered Conversion** - Smart transformation using Google Gemini
- 📚 **Template Library** - Pre-built templates for common use cases
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📋 **Copy & Export** - Easy sharing and downloading of JSON prompts
- 🤖 **Interactive Chatbot** - Learn about JSON prompting from an AI assistant
- ↔️ **Resizable Panels** - Adjust the layout to your preference
- ⚡ **Real-time Processing** - Fast conversions with detailed explanations
- 🔍 **Template Search** - Find the perfect template quickly
- 💾 **Export Ready** - Download JSON files for immediate use

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key ([Get yours here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/Y4NN777/PromptForge7.git
cd PromptForge7

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Gemini API key

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

### Environment Setup

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini
- **Icons**: Lucide React
- **Deployment**: Netlify (recommended) or Vercel

## 📁 Project Structure

```
promptforge7/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main application
│   ├── components/
│   │   ├── Chatbot.tsx         # Interactive learning center
│   │   ├── ConverterTab.tsx    # Main converter UI
│   │   └── TemplatesTab.tsx    # Template library UI
│   ├── lib/
│   │   ├── gemini.ts           # Gemini AI integration
│   │   └── templates.ts        # Prompt templates
│   └── types/
│       └── index.ts            # TypeScript definitions
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── netlify.toml               # Netlify deployment config
└── tailwind.config.js         # Tailwind CSS config
```

## 🎯 Usage

### Converting Prompts

1. **Enter Your Prompt**: Type or paste your natural language prompt
2. **Click Convert**: Let AI transform it into structured JSON
3. **Review & Export**: Copy or download the generated JSON prompt
4. **Learn**: Click the help icon to understand the improvements

### Using Templates

1. **Browse Categories**: Explore templates by Analysis, Creative, Development, etc.
2. **Apply**: Click "Use This Template" to load it into the converter


