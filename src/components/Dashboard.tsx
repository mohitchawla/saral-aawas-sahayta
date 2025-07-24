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
        food: "खाना"
      },
      tips: [
        "दैनिक खर्च ट्रैक करने से ₹500 महीना बचा सकते हैं",
        "SIP में ₹100 महीना जमा करना शुरू करें",
        "बिजली का बिल कम करने के लिए LED बल्ब का इस्तेमाल करें"
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
      recommendations: "Recommendations",
      voiceInput: "Voice Input",
      askBot: "Ask Assistant",
      rating: "Your Rating",
      categoryNames: {
        rent: "Rent",
        groceries: "Groceries",
        transport: "Transport",
        mobile: "Mobile",
        food: "Food"
      },
      tips: [
        "Track daily expenses to save ₹500 per month",
        "Start investing ₹100 monthly in SIP",
        "Use LED bulbs to reduce electricity bills"
      ]
    }
  };

  const t = content[userLanguage as keyof typeof content];
  
  // Mock data based on income bracket
  const incomeAmount = userIncome === "10000-15000" ? 12000 : userIncome === "15000-20000" ? 17500 : 22000;
  const expenses = Math.floor(incomeAmount * 0.75);
  const savings = incomeAmount - expenses;
  
  const categories = [
    { name: t.categoryNames.rent, amount: Math.floor(expenses * 0.4), icon: Home, color: "bg-primary" },
    { name: t.categoryNames.groceries, amount: Math.floor(expenses * 0.25), icon: ShoppingCart, color: "bg-secondary" },
    { name: t.categoryNames.transport, amount: Math.floor(expenses * 0.15), icon: Car, color: "bg-accent" },
    { name: t.categoryNames.mobile, amount: Math.floor(expenses * 0.1), icon: Smartphone, color: "bg-warning" },
    { name: t.categoryNames.food, amount: Math.floor(expenses * 0.1), icon: UtensilsCrossed, color: "bg-success" },
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
          <div className="space-y-3">
            {t.tips.map((tip, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
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