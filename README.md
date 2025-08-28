# PromptForge

![PromptForge](https://img.shields.io/badge/PromptForge-AI%20Prompt%20Converter-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDJMMy4wOTYwMSAxOEg2TDEzIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTEgMkwyMS4wNTMgMThIMThMMTEgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiA5TDkgMTZIMTVMMTIgOVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=)

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify)

> **Transform regular prompts into powerful structured JSON prompts that get better AI results.**

PromptForge is a cutting-edge web application that leverages Google's Gemini AI to convert natural language prompts into structured JSON formats, making your AI interactions more precise, consistent, and effective.

## ✨ Features

- 🧠 **AI-Powered Conversion** - Smart transformation using Google Gemini 2.0
- 📚 **Template Library** - Pre-built templates for common use cases
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations  
- 📋 **Copy & Export** - Easy sharing and downloading of JSON prompts
- 📖 **Learning Center** - Comprehensive guide to JSON prompting best practices
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
git clone https://github.com/yourusername/promptforge.git
cd promptforge

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
- **AI**: Google Gemini 2.0 Flash
- **Syntax Highlighting**: Prism.js via react-syntax-highlighter
- **Icons**: Lucide React
- **Deployment**: Netlify (recommended) or Vercel

## 📁 Project Structure

```
promptforge/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main application
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
4. **Learn**: Read the explanation to understand improvements

### Using Templates

1. **Browse Categories**: Explore templates by Analysis, Creative, Development, etc.
2. **Search**: Use the search bar to find specific templates
3. **Preview Structure**: Expand templates to see JSON structure
4. **Apply**: Click "Use
