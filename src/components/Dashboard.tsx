import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingDown, 
  TrendingUp, 
  Mic, 
  MessageCircle, 
  Star,
  Lightbulb,
  Home,
  Car,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed
} from "lucide-react";

interface DashboardProps {
  userLanguage: string;
  userIncome: string;
  onVoiceInput: () => void;
  onChatBot: () => void;
}

const Dashboard = ({ userLanguage, userIncome, onVoiceInput, onChatBot }: DashboardProps) => {
  const [userRating] = useState(4); // Mock rating
  
  const content = {
    hindi: {
      greeting: "नमस्ते!",
      thisMonth: "इस महीने",
      income: "आय",
      expenses: "खर्च",
      savings: "बचत",
      budget: "बजट",
      categories: "श्रेणियां",
      recommendations: "सुझाव",
      voiceInput: "आवाज़ से जोड़ें",
      askBot: "सवाल पूछें",
      rating: "आपकी रेटिंग",
      categoryNames: {
        rent: "किराया",
        groceries: "राशन",
        transport: "यात्रा",
        mobile: "मोबाइल",
        food: "खाना",
        miscellaneous: "अन्य"
      },
      recommendationTabs: {
        investments: "निवेश",
        savings: "बचत",
        current: "वर्तमान निवेश",
        medical: "चिकित्सा"
      },
      investmentTips: [
        "PPF में ₹500/महीना निवेश करें - 15 साल में 15% रिटर्न",
        "ELSS म्यूचुअल फंड में ₹1000/महीना SIP शुरू करें",
        "NSC में ₹100/महीना निवेश करें - 5 साल lock-in"
      ],
      savingsTips: [
        "रोज़ के ₹50 बचाकर साल में ₹18,000 जमा करें",
        "महंगे ब्रांड के बजाय generic products खरीदें",
        "बिजली बचाकर ₹200/महीना कम करें"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (पिछले 6 महीने)",
        "RD: ₹1,000/महीना (चल रहा)",
        "Gold ETF: ₹500 (3 महीने)"
      ],
      medicalTips: [
        "Ayushman Bharat योजना में रजिस्टर करें - ₹5 लाख cover",
        "सरकारी अस्पताल: AIIMS, Safdarjung (दिल्ली)",
        "Jan Aushadhi store से generic दवाएं खरीदें"
      ]
    },
    english: {
      greeting: "Hello!",
      thisMonth: "This Month",
      income: "Income",
      expenses: "Expenses", 
      savings: "Savings",
      budget: "Budget",
      categories: "Categories",
      recommendations: "Smart Recommendations",
      voiceInput: "Voice Input",
      askBot: "Ask Assistant",
      rating: "Your Rating",
      categoryNames: {
        rent: "Rent",
        groceries: "Groceries",
        transport: "Transport",
        mobile: "Mobile",
        food: "Food",
        miscellaneous: "Miscellaneous"
      },
      recommendationTabs: {
        investments: "Investments",
        savings: "Savings",
        current: "Current Portfolio",
        medical: "Medical"
      },
      investmentTips: [
        "Invest ₹500/month in PPF - 15% returns in 15 years",
        "Start ₹1000/month SIP in ELSS Mutual Funds",
        "Invest ₹100/month in NSC - 5 year lock-in"
      ],
      savingsTips: [
        "Save ₹50 daily to accumulate ₹18,000 yearly",
        "Buy generic products instead of expensive brands",
        "Reduce electricity bill by ₹200/month"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (Last 6 months)",
        "RD: ₹1,000/month (Ongoing)",
        "Gold ETF: ₹500 (3 months)"
      ],
      medicalTips: [
        "Register for Ayushman Bharat - ₹5 lakh coverage",
        "Government Hospitals: AIIMS, Safdarjung (Delhi)",
        "Buy generic medicines from Jan Aushadhi stores"
      ]
    },
    marathi: {
      greeting: "नमस्कार!",
      thisMonth: "या महिन्यात",
      income: "उत्पन्न",
      expenses: "खर्च",
      savings: "बचत",
      budget: "बजेट",
      categories: "श्रेणी",
      recommendations: "सूचना",
      voiceInput: "आवाजाने भरा",
      askBot: "प्रश्न विचारा",
      rating: "तुमची रेटिंग",
      categoryNames: {
        rent: "भाडे",
        groceries: "किराणा",
        transport: "वाहतूक",
        mobile: "मोबाइल",
        food: "खाणे",
        miscellaneous: "इतर"
      },
      recommendationTabs: {
        investments: "गुंतवणूक",
        savings: "बचत",
        current: "सध्याची गुंतवणूक",
        medical: "वैद्यकीय"
      },
      investmentTips: [
        "PPF मध्ये ₹500/महिना गुंतवणूक करा",
        "ELSS मध्ये ₹1000/महिना SIP सुरू करा",
        "NSC मध्ये ₹100/महिना गुंतवणूक करा"
      ],
      savingsTips: [
        "दररोज ₹50 वाचवा",
        "महाग ब्रँडऐवजी generic products घ्या",
        "वीज बचत करून ₹200/महिना कमी करा"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (गेले 6 महिने)",
        "RD: ₹1,000/महिना (चालू)",
        "Gold ETF: ₹500 (3 महिने)"
      ],
      medicalTips: [
        "आयुष्मान भारत योजनेत नोंदणी करा",
        "सरकारी रुग्णालय: AIIMS, Safdarjung",
        "जन औषधी स्टोअरमधून generic औषधे घ्या"
      ]
    },
    telugu: {
      greeting: "నమస్కారం!",
      thisMonth: "ఈ నెలలో",
      income: "ఆదాయం",
      expenses: "ఖర్చులు",
      savings: "ఆదా",
      budget: "బడ్జెట్",
      categories: "వర్గాలు",
      recommendations: "సూచనలు",
      voiceInput: "వాయిస్ ఇన్‌పుట్",
      askBot: "ప్రశ్న అడగండి",
      rating: "మీ రేటింగ్",
      categoryNames: {
        rent: "అద్దె",
        groceries: "కిరాణా",
        transport: "రవాణా",
        mobile: "మొబైల్",
        food: "ఆహారం",
        miscellaneous: "ఇతరాలు"
      },
      recommendationTabs: {
        investments: "పెట్టుబడులు",
        savings: "ఆదా",
        current: "ప్రస్తుత పెట్టుబడులు",
        medical: "వైద్య"
      },
      investmentTips: [
        "PPF లో ₹500/నెలకు పెట్టుబడి పెట్టండి",
        "ELSS లో ₹1000/నెలకు SIP ప్రారంభించండి",
        "NSC లో ₹100/నెలకు పెట్టుబడి పెట్టండి"
      ],
      savingsTips: [
        "రోజుకు ₹50 ఆదా చేయండి",
        "ఖరీదైన బ్రాండ్‌లకు బదులు generic ఉత్పత్తులు కొనండి",
        "విద్యుత్ ఆదా చేసి ₹200/నెలకు తగ్గించండి"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (గత 6 నెలలు)",
        "RD: ₹1,000/నెలకు (కొనసాగుతున్న)",
        "Gold ETF: ₹500 (3 నెలలు)"
      ],
      medicalTips: [
        "ఆయుష్మాన్ భారత్ పథకంలో నమోదు చేసుకోండి",
        "ప్రభుత్వ ఆసుపత్రులు: AIIMS, Safdarjung",
        "జన్ ఔషధి దుకాణాల నుండి generic మందులు కొనండి"
      ]
    },
    tamil: {
      greeting: "வணக்கம்!",
      thisMonth: "இந்த மாதம்",
      income: "வருமானம்",
      expenses: "செலவுகள்",
      savings: "சேமிப்பு",
      budget: "பட்ஜெட்",
      categories: "வகைகள்",
      recommendations: "பரிந்துரைகள்",
      voiceInput: "குரல் உள்ளீடு",
      askBot: "கேள்வி கேளுங்கள்",
      rating: "உங்கள் மதிப்பீடு",
      categoryNames: {
        rent: "வாடகை",
        groceries: "மளிகை",
        transport: "போக்குவரத்து",
        mobile: "மொபைல்",
        food: "உணவு",
        miscellaneous: "இதர"
      },
      recommendationTabs: {
        investments: "முதலீடுகள்",
        savings: "சேமிப்பு",
        current: "தற்போதைய முதலீடுகள்",
        medical: "மருத்துவம்"
      },
      investmentTips: [
        "PPF இல் ₹500/மாதம் முதலீடு செய்யுங்கள்",
        "ELSS இல் ₹1000/மாதம் SIP தொடங்குங்கள்",
        "NSC இல் ₹100/மாதம் முதலீடு செய்யுங்கள்"
      ],
      savingsTips: [
        "தினமும் ₹50 சேமியுங்கள்",
        "விலையுயர்ந்த பிராண்டுகளுக்கு பதிலாக generic தயாரிப்புகளை வாங்குங்கள்",
        "மின்சாரம் சேமித்து ₹200/மாதம் குறையுங்கள்"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (கடந்த 6 மாதங்கள்)",
        "RD: ₹1,000/மாதம் (தொடர்ந்து)",
        "Gold ETF: ₹500 (3 மாதங்கள்)"
      ],
      medicalTips: [
        "ஆயுஷ்மான் பாரத் திட்டத்தில் பதிவு செய்யுங்கள்",
        "அரசு மருத்துவமனைகள்: AIIMS, Safdarjung",
        "ஜன் ஔஷதி கடைகளில் இருந்து generic மருந்துகள் வாங்குங்கள்"
      ]
    },
    punjabi: {
      greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ!",
      thisMonth: "ਇਸ ਮਹੀਨੇ",
      income: "ਆਮਦਨ",
      expenses: "ਖਰਚੇ",
      savings: "ਬਚਤ",
      budget: "ਬਜਟ",
      categories: "ਸ਼੍ਰੇਣੀਆਂ",
      recommendations: "ਸੁਝਾਅ",
      voiceInput: "ਆਵਾਜ਼ ਇਨਪੁੱਟ",
      askBot: "ਸਵਾਲ ਪੁੱਛੋ",
      rating: "ਤੁਹਾਡੀ ਰੇਟਿੰਗ",
      categoryNames: {
        rent: "ਕਿਰਾਇਆ",
        groceries: "ਸਮਾਨ",
        transport: "ਆਵਾਜਾਈ",
        mobile: "ਮੋਬਾਈਲ",
        food: "ਖਾਣਾ",
        miscellaneous: "ਹੋਰ"
      },
      recommendationTabs: {
        investments: "ਨਿਵੇਸ਼",
        savings: "ਬਚਤ",
        current: "ਮੌਜੂਦਾ ਨਿਵੇਸ਼",
        medical: "ਮੈਡੀਕਲ"
      },
      investmentTips: [
        "PPF ਵਿੱਚ ₹500/ਮਹੀਨਾ ਨਿਵੇਸ਼ ਕਰੋ",
        "ELSS ਵਿੱਚ ₹1000/ਮਹੀਨਾ SIP ਸ਼ੁਰੂ ਕਰੋ",
        "NSC ਵਿੱਚ ₹100/ਮਹੀਨਾ ਨਿਵੇਸ਼ ਕਰੋ"
      ],
      savingsTips: [
        "ਰੋਜ਼ ₹50 ਬਚਾਓ",
        "ਮਹਿੰਗੇ ਬਰਾਂਡਾਂ ਦੀ ਬਜਾਏ generic ਉਤਪਾਦ ਖਰੀਦੋ",
        "ਬਿਜਲੀ ਬਚਾ ਕੇ ₹200/ਮਹੀਨਾ ਘੱਟ ਕਰੋ"
      ],
      currentInvestments: [
        "PPF: ₹2,500 (ਪਿਛਲੇ 6 ਮਹੀਨੇ)",
        "RD: ₹1,000/ਮਹੀਨਾ (ਚੱਲ ਰਿਹਾ)",
        "Gold ETF: ₹500 (3 ਮਹੀਨੇ)"
      ],
      medicalTips: [
        "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਯੋਜਨਾ ਵਿੱਚ ਰਜਿਸਟਰ ਕਰੋ",
        "ਸਰਕਾਰੀ ਹਸਪਤਾਲ: AIIMS, Safdarjung",
        "ਜਨ ਔਸ਼ਧੀ ਸਟੋਰ ਤੋਂ generic ਦਵਾਈਆਂ ਖਰੀਦੋ"
      ]
    }
  };

  const t = content[userLanguage as keyof typeof content];
  
  // Mock data based on income bracket
  const incomeAmount = userIncome === "10000-15000" ? 12000 : userIncome === "15000-20000" ? 17500 : 22000;
  const expenses = Math.floor(incomeAmount * 0.75);
  const savings = incomeAmount - expenses;
  
  const categories = [
    { name: t.categoryNames.rent, amount: Math.floor(expenses * 0.35), icon: Home, color: "bg-primary" },
    { name: t.categoryNames.groceries, amount: Math.floor(expenses * 0.25), icon: ShoppingCart, color: "bg-secondary" },
    { name: t.categoryNames.transport, amount: Math.floor(expenses * 0.15), icon: Car, color: "bg-accent" },
    { name: t.categoryNames.mobile, amount: Math.floor(expenses * 0.1), icon: Smartphone, color: "bg-warning" },
    { name: t.categoryNames.food, amount: Math.floor(expenses * 0.1), icon: UtensilsCrossed, color: "bg-success" },
    { name: t.categoryNames.miscellaneous, amount: Math.floor(expenses * 0.05), icon: Star, color: "bg-muted" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t.greeting}</h1>
          <p className="text-muted-foreground">{t.thisMonth}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < userRating ? "fill-accent text-accent" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{t.rating}</span>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.income}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{incomeAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.expenses}</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{expenses.toLocaleString()}</div>
            <Progress value={(expenses / incomeAmount) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.savings}</CardTitle>
            <Wallet className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">₹{savings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((savings / incomeAmount) * 100)}% of income
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>{t.categories}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="font-bold">₹{category.amount.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            {t.recommendations}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {Object.entries(t.recommendationTabs).map(([key, label]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm text-primary">{t.recommendationTabs.investments}</h4>
              <div className="space-y-2">
                {t.investmentTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border-l-2 border-primary">
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm text-secondary">{t.recommendationTabs.savings}</h4>
              <div className="space-y-2">
                {t.savingsTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg border-l-2 border-secondary">
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm text-accent">{t.recommendationTabs.current}</h4>
              <div className="space-y-2">
                {t.currentInvestments.map((investment, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border-l-2 border-accent">
                    <p className="text-sm font-medium">{investment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm text-destructive">{t.recommendationTabs.medical}</h4>
              <div className="space-y-2">
                {t.medicalTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-destructive/5 to-warning/5 rounded-lg border-l-2 border-destructive">
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={onVoiceInput}
          size="lg"
          className="h-16 flex items-center gap-3"
        >
          <Mic className="h-5 w-5" />
          {t.voiceInput}
        </Button>

        <Button
          onClick={onChatBot}
          variant="secondary"
          size="lg"
          className="h-16 flex items-center gap-3"
        >
          <MessageCircle className="h-5 w-5" />
          {t.askBot}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;