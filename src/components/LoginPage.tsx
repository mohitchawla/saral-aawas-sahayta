import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe } from "lucide-react";

interface LoginPageProps {
  onLogin: (phoneNumber: string, language: string, income: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [income, setIncome] = useState('10000-15000');
  const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'language'>('phone');
  const [otp, setOtp] = useState('');

  const content = {
    hindi: {
      title: "निवि",
      subtitle: "आपका स्मार्ट वित्तीय साथी",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "अपना मोबाइल नंबर डालें",
      getOtp: "OTP भेजें",
      otpLabel: "OTP",
      otpPlaceholder: "6 अंकों का OTP डालें",
      verify: "सत्यापित करें",
      languageLabel: "भाषा चुनें",
      incomeLabel: "मासिक आय",
      complete: "शुरू करें",
      selectLanguage: "अपनी भाषा चुनें",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000", 
        "20000+": "₹20,000+"
      }
    },
    english: {
      title: "Nivi",
      subtitle: "Your Smart Financial Companion",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "Enter your mobile number",
      getOtp: "Get OTP",
      otpLabel: "OTP",
      otpPlaceholder: "Enter 6-digit OTP",
      verify: "Verify",
      languageLabel: "Select Language",
      incomeLabel: "Monthly Income",
      complete: "Get Started",
      selectLanguage: "Choose Your Language",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000",
        "20000+": "₹20,000+"
      }
    },
    marathi: {
      title: "निवि",
      subtitle: "तुमचा स्मार्ट आर्थिक साथी",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "तुमचा मोबाइल नंबर टाका",
      getOtp: "OTP पाठवा",
      otpLabel: "OTP",
      otpPlaceholder: "6 अंकी OTP टाका",
      verify: "सत्यापित करा",
      languageLabel: "भाषा निवडा",
      incomeLabel: "मासिक उत्पन्न",
      complete: "सुरुवात करा",
      selectLanguage: "तुमची भाषा निवडा",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000",
        "20000+": "₹20,000+"
      }
    },
    telugu: {
      title: "నివి",
      subtitle: "మీ స్మార్ట్ ఫైనాన్షియల్ కంపానియన్",
      phoneLabel: "మొబైల్ నంబర్",
      phonePlaceholder: "మీ మొబైల్ నంబర్ ఎంటర్ చేయండి",
      getOtp: "OTP పంపండి",
      otpLabel: "OTP",
      otpPlaceholder: "6 అంకెల OTP ఎంటర్ చేయండి",
      verify: "వేరిఫై చేయండి",
      languageLabel: "భాష ఎంచుకోండి",
      incomeLabel: "నెలవారీ ఆదాయం",
      complete: "ప్రారంభించండి",
      selectLanguage: "మీ భాష ఎంచుకోండి",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000",
        "20000+": "₹20,000+"
      }
    },
    tamil: {
      title: "நிவி",
      subtitle: "உங்கள் ஸ்மார்ட் நிதி துணை",
      phoneLabel: "மொபைல் எண்",
      phonePlaceholder: "உங்கள் மொபைல் எண்ணை உள்ளிடவும்",
      getOtp: "OTP அனுப்பவும்",
      otpLabel: "OTP",
      otpPlaceholder: "6 இலக்க OTP உள்ளிடவும்",
      verify: "சரிபார்க்கவும்",
      languageLabel: "மொழியைத் தேர்வு செய்யவும்",
      incomeLabel: "மாதாந்திர வருமானம்",
      complete: "தொடங்கவும்",
      selectLanguage: "உங்கள் மொழியைத் தேர்வு செய்யவும்",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000",
        "20000+": "₹20,000+"
      }
    },
    punjabi: {
      title: "ਨਿਵੀ",
      subtitle: "ਤੁਹਾਡਾ ਸਮਾਰਟ ਵਿੱਤੀ ਸਾਥੀ",
      phoneLabel: "ਮੋਬਾਈਲ ਨੰਬਰ",
      phonePlaceholder: "ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
      getOtp: "OTP ਭੇਜੋ",
      otpLabel: "OTP",
      otpPlaceholder: "6 ਅੰਕਾਂ ਦਾ OTP ਦਾਖਲ ਕਰੋ",
      verify: "ਪੁਸ਼ਟੀ ਕਰੋ",
      languageLabel: "ਭਾਸ਼ਾ ਚੁਣੋ",
      incomeLabel: "ਮਾਸਿਕ ਆਮਦਨ",
      complete: "ਸ਼ੁਰੂ ਕਰੋ",
      selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
      languages: {
        hindi: "हिंदी",
        english: "English",
        marathi: "मराठी",
        telugu: "తెలుగు",
        tamil: "தமிழ்",
        punjabi: "ਪੰਜਾਬੀ"
      },
      incomeOptions: {
        "10000-15000": "₹10,000 - ₹15,000",
        "15000-20000": "₹15,000 - ₹20,000",
        "20000+": "₹20,000+"
      }
    }
  };

  const t = content[language as keyof typeof content];

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') { // Mock OTP verification
      setStep('language');
    }
  };

  const handleLanguageSelection = () => {
    setStep('profile');
  };

  const handleComplete = () => {
    onLogin(phoneNumber, language, income);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">₹</span>
          </div>
          <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
          <CardDescription className="text-base">{t.subtitle}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.phoneLabel}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={phoneNumber.length !== 10}
                className="w-full"
                size="lg"
              >
                {t.getOtp}
              </Button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  OTP भेजा गया / OTP Sent to +91 {phoneNumber}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.otpLabel}</label>
                <Input
                  type="text"
                  placeholder={t.otpPlaceholder}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="w-full"
                size="lg"
              >
                {t.verify}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setStep('phone')}
                className="w-full"
              >
                Change Number / नंबर बदलें
              </Button>
            </div>
          )}

          {step === 'language' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{t.selectLanguage}</h2>
              </div>

              <div className="space-y-3">
                {Object.entries(t.languages).map(([key, value]) => (
                  <Button
                    key={key}
                    variant={language === key ? "default" : "outline"}
                    className="w-full h-14 text-lg"
                    onClick={() => setLanguage(key)}
                  >
                    {value}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleLanguageSelection}
                className="w-full h-12"
                size="lg"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 'profile' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">{t.incomeLabel}</label>
                <div className="space-y-2">
                  {Object.entries(t.incomeOptions).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setIncome(value)}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        income === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full"
                size="lg"
              >
                {t.complete}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;