import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Mic, Volume2, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  userLanguage: string;
  userIncome: string;
  onBack: () => void;
}

const ChatBot = ({ userLanguage, userIncome, onBack }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const content = {
    hindi: {
      title: "वित्तीय सहायक",
      subtitle: "पैसे के बारे में पूछें",
      placeholder: "अपना सवाल यहाँ लिखें...",
      faqs: [
        "मैं कैसे पैसे बचा सकता हूं?",
        "SIP क्या है?",
        "इमरजेंसी फंड कैसे बनाऊं?",
        "बीमा क्यों जरूरी है?",
        "गोल्ड में निवेश कैसे करें?"
      ],
      botResponses: {
        "मैं कैसे पैसे बचा सकता हूं?": "पैसे बचाने के लिए: 1) महीने की शुरुआत में ही बचत अलग कर दें 2) छोटे-छोटे खर्चों को ट्रैक करें 3) जरूरत और चाहत में फर्क करें 4) हर दिन का हिसाब रखें। आपकी आय ₹" + userIncome.split('-')[0] + " है, तो कम से कम ₹500-1000 महीना बचाने की कोशिश करें।",
        "SIP क्या है?": "SIP मतलब Systematic Investment Plan है। यह म्यूचुअल फंड में हर महीने एक निश्चित रकम जमा करने का तरीका है। आप ₹100 से भी शुरुआत कर सकते हैं। यह आपके पैसे को बढ़ाने का सुरक्षित तरीका है।",
        "इमरजेंसी फंड कैसे बनाऊं?": "इमरजेंसी फंड के लिए: 1) 3-6 महीने के खर्च के बराबर पैसा अलग रखें 2) यह पैसा बैंक के सेविंग अकाउंट या FD में रखें 3) हर महीने थोड़ा-थोड़ा जमा करते रहें 4) इसे सिर्फ जरूरी स्थिति में ही इस्तेमाल करें।",
        "बीमा क्यों जरूरी है?": "बीमा आपको और आपके परिवार को वित्तीय सुरक्षा देता है। अगर कोई दुर्घटना हो या बीमारी आए तो बीमा आपके इलाज का खर्च उठाता है। हेल्थ इंश्योरेंस और टर्म लाइफ इंश्योरेंस जरूर लें।",
        "गोल्ड में निवेश कैसे करें?": "गोल्ड में निवेश के तरीके: 1) डिजिटल गोल्ड - PhonePe, Paytm से खरीद सकते हैं 2) गोल्ड ETF 3) गोल्ड म्यूचुअल फंड। भौतिक सोना खरीदने से बचें क्योंकि इसमें making charges ज्यादा लगते हैं।"
      },
      typing: "टाइप कर रहे हैं...",
      listening: "सुन रहे हैं...",
      speak: "बोलें"
    },
    english: {
      title: "Financial Assistant",
      subtitle: "Ask about money matters",
      placeholder: "Type your question here...",
      faqs: [
        "How can I save money?",
        "What is SIP?",
        "How to build emergency fund?",
        "Why is insurance important?",
        "How to invest in gold?"
      ],
      botResponses: {
        "How can I save money?": "To save money: 1) Set aside savings at the beginning of each month 2) Track small expenses 3) Differentiate between needs and wants 4) Maintain daily accounts. With your income of ₹" + userIncome.split('-')[0] + ", try to save at least ₹500-1000 per month.",
        "What is SIP?": "SIP means Systematic Investment Plan. It's a way to invest a fixed amount every month in mutual funds. You can start with as little as ₹100. It's a safe way to grow your money.",
        "How to build emergency fund?": "For emergency fund: 1) Keep aside money equal to 3-6 months of expenses 2) Keep this money in bank savings account or FD 3) Keep adding little by little every month 4) Use it only in genuine emergencies.",
        "Why is insurance important?": "Insurance provides financial security to you and your family. If there's an accident or illness, insurance covers your treatment costs. Health insurance and term life insurance are must-have.",
        "How to invest in gold?": "Ways to invest in gold: 1) Digital gold - buy from PhonePe, Paytm 2) Gold ETF 3) Gold mutual funds. Avoid buying physical gold as it has high making charges."
      },
      typing: "Typing...",
      listening: "Listening...",
      speak: "Speak"
    }
  };

  const t = content[userLanguage as keyof typeof content];

  useEffect(() => {
    // Initial greeting
    const greeting = userLanguage === 'hindi' 
      ? "नमस्ते! मैं आपका वित्तीय सहायक हूं। पैसे के बारे में कोई भी सवाल पूछ सकते हैं।"
      : "Hello! I'm your financial assistant. Ask me anything about money matters.";
    
    setMessages([{
      id: '1',
      content: greeting,
      isUser: false,
      timestamp: new Date()
    }]);
  }, [userLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (question: string): string => {
    // Simple keyword matching - in production, this would use actual AI
    const normalizedQuestion = question.toLowerCase();
    
    for (const [faq, response] of Object.entries(t.botResponses)) {
      if (normalizedQuestion.includes(faq.toLowerCase().substring(0, 10))) {
        return response;
      }
    }

    // Default responses
    if (normalizedQuestion.includes("save") || normalizedQuestion.includes("बचत")) {
      return t.botResponses[Object.keys(t.botResponses)[0]];
    }
    
    return userLanguage === 'hindi' 
      ? "माफ करें, मैं इस सवाल का जवाब नहीं दे पा रहा। कृपया दूसरा सवाल पूछें या ऊपर दिए गए सुझावों में से कोई चुनें।"
      : "Sorry, I couldn't understand that question. Please try asking differently or choose from the suggested questions above.";
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = userLanguage === 'hindi' ? 'hi-IN' : 'en-IN';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
        toast({
          title: "Error",
          description: "Could not access microphone. Please try again.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = userLanguage === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* FAQ Quick Actions */}
      <div className="p-4 border-b">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {t.faqs.map((faq, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendMessage(faq)}
              className="whitespace-nowrap"
            >
              {faq}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${
              message.isUser ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`p-2 rounded-full ${
                message.isUser ? 'bg-primary' : 'bg-secondary'
              }`}>
                {message.isUser ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-secondary-foreground" />
                )}
              </div>
              
              <div className={`rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.content}</p>
                {!message.isUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(message.content)}
                    className="mt-2 p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-secondary">
                <Bot className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Badge variant="secondary">{t.typing}</Badge>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.placeholder}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            />
          </div>
          
          <Button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={startVoiceInput}
            variant="outline"
            size="sm"
            disabled={isRecording}
          >
            <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive' : ''}`} />
          </Button>
        </div>
        
        {isRecording && (
          <div className="mt-2 text-center">
            <Badge variant="secondary">{t.listening}</Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;