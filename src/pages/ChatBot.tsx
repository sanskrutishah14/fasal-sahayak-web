import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Sprout, Send, User, Bot, ArrowLeft, Leaf, LogOut } from "lucide-react";
import { useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${user?.user_metadata?.full_name || 'there'}! I'm your AgriSaathi AI assistant. I can help you with crop recommendations, weather insights, and farming best practices. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your question! This AI chatbot will be fully functional once integrated with Supabase backend. I would be able to provide personalized crop recommendations based on your location, soil type, and weather data.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/welcome')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-hero p-2 rounded-full">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AgriSaathi AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Smart farming guidance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="bg-white/95 backdrop-blur-sm shadow-strong border-0 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="bg-gradient-hero p-2 rounded-full h-fit">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-hero text-white ml-auto'
                      : 'bg-muted/50 text-foreground'
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="bg-primary/10 p-2 rounded-full h-fit">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about crops, weather, farming tips..."
                className="flex-1 border-2 focus:border-primary transition-colors"
              />
              <Button 
                type="submit" 
                className="bg-gradient-hero hover:opacity-90 px-6"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['Weather forecast', 'Crop rotation tips', 'Pest control', 'Market prices'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-accent/50"
                  onClick={() => setInputMessage(suggestion)}
                >
                  <Leaf className="h-3 w-3 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <Button
                variant="link"
                className="text-primary text-sm"
                onClick={() => navigate('/chatbot')}
              >
                Go to Full Chatbot Experience →
              </Button>
            </div>
          </div>
        </Card>

          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground text-center">
              <strong>✓ You're authenticated!</strong> Full AI functionality will be added with Perplexity API integration.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ChatBot;