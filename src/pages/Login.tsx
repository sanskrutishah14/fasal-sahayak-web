import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Sprout, ArrowLeft, Mail, Lock } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with Supabase integration
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm shadow-strong border-0 p-8">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4"
              onClick={() => navigate('/welcome')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-hero p-3 rounded-full">
                <Sprout className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your CropWise account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 focus:border-primary transition-colors"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-hero hover:opacity-90 text-white py-6 text-lg font-semibold shadow-soft transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="p-0 h-auto text-primary font-semibold"
                onClick={() => navigate('/signup')}
              >
                Sign up here
              </Button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> Login functionality requires Supabase integration. 
              Click the Supabase button to enable authentication.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;