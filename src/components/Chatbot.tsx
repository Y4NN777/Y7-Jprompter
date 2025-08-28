'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { explainConversion } from '@/lib/gemini';
import Card from './ui/Card';

interface Message {
  text: string;
  isUser: boolean;
}

const predefinedQuestions = [
  "What is JSON prompting?",
  "What are the benefits of using JSON prompts?",
  "Can you show me an example of a good JSON prompt?",
  "What are some common mistakes to avoid?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (question?: string) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real scenario, you'd have a dedicated Gemini endpoint for this.
      // We'll simulate a response for now.
      const response = await getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = async (userMessage: string): Promise<string> => {
    // This is a mock implementation. For a real chatbot, you would call your Gemini API here.
    // The explainConversion function is used as a placeholder.
    const prompt = `You are a helpful assistant explaining concepts about JSON prompting. Answer the following question: ${userMessage}`;
    try {
      const response = await explainConversion(prompt, {});
      return response;
    } catch {
      return "I can't provide a detailed explanation right now, but JSON prompting is a powerful technique for getting structured data from language models.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Learning Center Chatbot</h2>
      <Card>
        <div 
          ref={chatContainerRef}
          className="h-96 overflow-y-auto pr-4 mb-4 border-b pb-4 custom-scrollbar"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Bot />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-lg">
                <p>Welcome! Ask me anything about JSON prompting, or choose one of the questions below.</p>
              </div>
            </div>
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-4 ${msg.isUser ? 'justify-end' : ''}`}>
                {!msg.isUser && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Bot />
                  </div>
                )}
                <div className={`rounded-lg p-3 max-w-lg ${msg.isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
                {msg.isUser && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Bot />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-lg flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-75 mr-2"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Or try these questions:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question..."
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            className="btn-primary p-3"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </Card>
    </div>
  );
}