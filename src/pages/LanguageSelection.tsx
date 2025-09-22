import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Sprout, Globe } from "lucide-react";

const LanguageSelection = () => {
  const { setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm shadow-strong border-0 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-hero p-3 rounded-full">
                <Sprout className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AgriSaathi</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <p>{t('selectLanguage')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                size="lg"
                className="w-full h-16 text-lg font-medium border-2 border-muted hover:border-primary hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <div className="text-center">
                  <div className="font-semibold">{lang.nativeName}</div>
                  <div className="text-sm text-muted-foreground">{lang.name}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Choose your preferred language to continue
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSelection;