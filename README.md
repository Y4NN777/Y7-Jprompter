# PromptForge7

![PromptForge7](https://img.shields.io/badge/PromptForge-AI%20Prompt%20Converter-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDJMMy4wOTYwMSAxOEg2TDEzIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTEgMkwyMS4wNTMgMThIMThMMTEgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiA5TDkgMTZIMTVMMTIgOVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=)

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify)

> **Transform regular prompts into powerful structured JSON prompts that get better AI results.**

PromptForge7 is a web application that leverages Google's Gemini AI to convert natural language prompts into structured JSON formats, making your AI interactions more precise, consistent, and effective.

![Demo](./demo.gif)
<img width="400" height="201" alt="image" src="https://github.com/user-attachments/assets/6ad20bb4-6b7a-4fd8-baaa-d9839ed4f24c" />
<img width="400" height="201" alt="image" src="https://github.com/user-attachments/assets/0df9289e-46ac-4754-ab8b-d12aba6e915c" />



## Features

- **AI-Powered Conversion**: Smart transformation using Google Gemini 2.0.
- **Template Library**: Pre-built templates for common use cases.
- **Modern UI**: A responsive design with smooth animations.
- **Copy & Export**: Easy sharing and downloading of JSON prompts.
- **Learning Center**: A comprehensive guide to JSON prompting best practices.
- **Real-time Processing**: Fast conversions with detailed explanations.
- **Template Search**: Find the perfect template quickly.
- **Editable JSON**: Edit the generated JSON directly in the UI.
- **Complexity Control**: Adjust the complexity of the generated JSON with a simple slider.

## Quick Start

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
GEMINI_API_KEY=your_gemini_api_key_here
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.0 Flash
- **Syntax Highlighting**: Prism.js via react-syntax-highlighter
- **Icons**: Lucide React
- **Deployment**: Netlify (recommended) or Vercel

## Project Structure

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
deployment config
└── tailwind.config.js         # Tailwind CSS config
```

## Usage

### Converting Prompts

1.  **Enter Your Prompt**: Type or paste your natural language prompt.
2.  **Adjust Complexity**: Use the slider to set the desired complexity of the JSON output.
3.  **Click Convert**: Let AI transform it into structured JSON.
4.  **Review & Edit**: Review the generated JSON and edit it directly if needed.
5.  **Export**: Copy or download the generated JSON prompt.
6.  **Learn**: Read the explanation to understand the improvements.

### Using Templates

1.  **Browse Categories**: Explore templates by Analysis, Creative, Development, etc.
2.  **Search**: Use the search bar to find specific templates.
3.  **Preview Structure**: Expand templates to see the JSON structure.
4.  **Apply**: Click "Use Template" to load the structure into the converter.
