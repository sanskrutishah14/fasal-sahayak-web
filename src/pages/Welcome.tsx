import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Sprout, TrendingUp, Users, Brain, ArrowRight, Leaf, LogOut } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import farmerTechImage from "@/assets/farmer-tech.jpg";
import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const features = [
    {
      icon: Brain,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: TrendingUp,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: Users,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Sprout className="h-12 w-12" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('welcome')}
            </h1>
            
            {user ? (
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                Welcome back, {user.user_metadata?.full_name || user.email}! Ready to explore AgriSaathi?
              </p>
            ) : (
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                {t('tagline')}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button 
                  size="lg" 
                  className="bg-gradient-hero hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-strong transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/chatbot')}
                >
                  Open AI Assistant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-gradient-hero hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-strong transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/login')}
                >
                  {t('login')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up Free
                </Button>
              </>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">{t('whyChoose')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your farming with intelligent recommendations and expert guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-soft border-0 p-8 text-center hover:shadow-strong transition-all duration-300 group hover:-translate-y-2">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={farmerTechImage} 
                  alt="Farmer using technology"
                  className="rounded-2xl shadow-strong"
                />
              </div>
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to revolutionize your farming?
                </h2>
                <p className="text-xl mb-8 text-white/90">
                  Join thousands of farmers who trust AgriSaathi for smarter agricultural decisions.
                </p>
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-strong"
                  onClick={() => user ? navigate('/chatbot') : navigate('/signup')}
                >
                  {user ? 'Open AI Assistant' : 'Get Started Free'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;