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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [language, setLanguage] = useState("hindi");
  const [income, setIncome] = useState("10000-15000");

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin(phoneNumber, language, income);
    }
  };

  const content = {
    hindi: {
      title: "पैसा ट्रैकर",
      subtitle: "आसान तरीके से अपना पैसा संभालें",
      phoneLabel: "मोबाइल नंबर",
      otpLabel: "OTP डालें",
      sendOTP: "OTP भेजें",
      verifyOTP: "जांचें",
      language: "भाषा चुनें",
      income: "मासिक आय",
      incomeOptions: {
        "10000-15000": "₹10,000 - 15,000",
        "15000-20000": "₹15,000 - 20,000",
        "20000+": "₹20,000+"
      }
    },
    english: {
      title: "Money Tracker",
      subtitle: "Manage your finances effortlessly",
      phoneLabel: "Mobile Number",
      otpLabel: "Enter OTP",
      sendOTP: "Send OTP",
      verifyOTP: "Verify",
      language: "Choose Language",
      income: "Monthly Income",
      incomeOptions: {
        "10000-15000": "₹10,000 - 15,000",
        "15000-20000": "₹15,000 - 20,000",
        "20000+": "₹20,000+"
      }
    }
  };

  const t = content[language as keyof typeof content];

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
          {!showOTP ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.phoneLabel}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t.language}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={language === "hindi" ? "default" : "outline"}
                    onClick={() => setLanguage("hindi")}
                    className="flex-1"
                    size="sm"
                  >
                    हिंदी
                  </Button>
                  <Button
                    variant={language === "english" ? "default" : "outline"}
                    onClick={() => setLanguage("english")}
                    className="flex-1"
                    size="sm"
                  >
                    English
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">{t.income}</label>
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
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10}
                className="w-full"
                size="lg"
              >
                {t.sendOTP}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  OTP भेजा गया / OTP Sent to +91 {phoneNumber}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.otpLabel}</label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full"
                size="lg"
              >
                {t.verifyOTP}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowOTP(false)}
                className="w-full"
              >
                Change Number / नंबर बदलें
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;