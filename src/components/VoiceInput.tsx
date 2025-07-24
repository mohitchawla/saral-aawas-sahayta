import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, ArrowLeft, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  userLanguage: string;
  onBack: () => void;
  onExpenseAdded: (expense: any) => void;
}

const VoiceInput = ({ userLanguage, onBack, onExpenseAdded }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const content = {
    hindi: {
      title: "आवाज़ से खर्च जोड़ें",
      subtitle: "बोलकर अपना खर्च दर्ज करें",
      startRecording: "रिकॉर्डिंग शुरू करें",
      stopRecording: "रिकॉर्डिंग बंद करें",
      processing: "समझ रहे हैं...",
      youSaid: "आपने कहा:",
      amount: "रकम",
      category: "श्रेणी",
      description: "विवरण",
      confirm: "पुष्टि करें",
      cancel: "रद्द करें",
      examples: [
        "आज 200 रुपये सब्जी में खर्च किया",
        "50 रुपये ऑटो का किराया दिया",
        "500 रुपये दवाई में लगे"
      ],
      categories: {
        groceries: "राशन/सब्जी",
        transport: "यात्रा",
        food: "खाना",
        medical: "दवाई",
        bills: "बिल",
        other: "अन्य"
      },
      tryAgain: "दोबारा कोशिश करें",
      added: "खर्च जोड़ा गया!"
    },
    english: {
      title: "Voice Expense Input",
      subtitle: "Speak to add your expense",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      processing: "Processing...",
      youSaid: "You said:",
      amount: "Amount",
      category: "Category",
      description: "Description",
      confirm: "Confirm",
      cancel: "Cancel",
      examples: [
        "Spent 200 rupees on vegetables today",
        "Paid 50 rupees for auto fare",
        "500 rupees for medicine"
      ],
      categories: {
        groceries: "Groceries",
        transport: "Transport",
        food: "Food",
        medical: "Medical",
        bills: "Bills",
        other: "Other"
      },
      tryAgain: "Try Again",
      added: "Expense Added!"
    }
  };

  const t = content[userLanguage as keyof typeof content];

  const startRecording = () => {
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
        setTranscription(transcript);
        processTranscription(transcript);
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

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const extractExpenseFromText = (text: string) => {
    // Enhanced regex patterns for amount extraction with better NLP
    const patterns = [
      // Direct amount patterns
      /(\d+)\s*(?:rupaye|rupees|रुपये|रुपए|rupaiya)/i,
      /(?:rupaye|rupees|रुपये|रुपए|rupaiya)\s*(\d+)/i,
      /(\d+)\s*(?:rs|₹|taka|टका)/i,
      /(?:rs|₹|taka|टका)\s*(\d+)/i,
      
      // Expense context patterns
      /(?:kharch|खर्च|spend|spent|expenditure|expense|cost|price|diya|दिया|किया|kiya)\s*.*?(\d+)/i,
      /(\d+)\s*(?:mein|में|for|ke liye|के लिए|ka|का|ki|की)/i,
      /(?:paisa|पैसा|money|amount|राशि|रकम)\s*.*?(\d+)/i,
      
      // Specific expense categories with amounts
      /(?:sabzi|सब्जी|vegetables|grocery|groceries|किराना|kirana)\s*.*?(\d+)/i,
      /(?:petrol|diesel|fuel|पेट्रोल|डीजल|ईंधन)\s*.*?(\d+)/i,
      /(?:travel|यात्रा|ticket|टिकट|bus|बस|auto|ऑटो)\s*.*?(\d+)/i,
      /(?:food|खाना|meal|भोजन|lunch|dinner|breakfast)\s*.*?(\d+)/i,
      /(?:medicine|दवा|medical|doctor|डॉक्टर|hospital|अस्पताल)\s*.*?(\d+)/i,
      
      // Action-based patterns
      /(?:bought|buy|kharida|खरीदा|liya|लिया|purchase)\s*.*?(\d+)/i,
      /(?:paid|pay|payment|दिया|भुगतान|paid)\s*.*?(\d+)/i,
      
      // Fallback numeric pattern
      /(\d+)/
    ];

    let extractedAmount = null;
    let confidence = 0;

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const match = text.match(pattern);
      if (match && match[1]) {
        const amount = parseInt(match[1]);
        // Higher confidence for earlier, more specific patterns
        const currentConfidence = (patterns.length - i) / patterns.length;
        
        if (currentConfidence > confidence && amount > 0 && amount < 100000) {
          extractedAmount = amount;
          confidence = currentConfidence;
        }
      }
    }
    
    return extractedAmount;
  };

  const categorizeExpense = (text: string) => {
    const lowerText = text.toLowerCase();
    
    const categories = {
      groceries: ['sabzi', 'सब्जी', 'grocery', 'groceries', 'किराना', 'kirana', 'vegetables', 'fruits', 'milk', 'दूध', 'ration', 'राशन'],
      transport: ['petrol', 'diesel', 'fuel', 'पेट्रोल', 'डीजल', 'bus', 'बस', 'auto', 'ऑटो', 'taxi', 'टैक्सी', 'travel', 'यात्रा', 'ticket', 'टिकट'],
      food: ['khana', 'खाना', 'food', 'meal', 'भोजन', 'lunch', 'dinner', 'breakfast', 'restaurant', 'रेस्तराँ', 'tea', 'चाय', 'coffee', 'कॉफी'],
      medical: ['medicine', 'दवा', 'medical', 'doctor', 'डॉक्टर', 'hospital', 'अस्पताल'],
      bills: ['mobile', 'मोबाइल', 'phone', 'फोन', 'recharge', 'रिचार्ज', 'data', 'डेटा', 'internet', 'इंटरनेट', 'rent', 'किराया', 'house', 'घर', 'room', 'कमरा', 'electricity', 'बिजली', 'water', 'पानी'],
      other: ['clothes', 'कपड़े', 'gift', 'उपहार', 'other', 'अन्य', 'miscellaneous']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category;
      }
    }
    
    return 'other';
  };

  const processTranscription = (text: string) => {
    setIsProcessing(true);
    
    // Enhanced NLP parsing
    setTimeout(() => {
      const extractedAmount = extractExpenseFromText(text);
      const extractedCategory = categorizeExpense(text);
      
      setAmount(extractedAmount ? extractedAmount.toString() : "");
      setCategory(extractedCategory);
      setDescription(text);
      setIsProcessing(false);
    }, 1500);
  };

  const confirmExpense = () => {
    if (amount && category) {
      const expense = {
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toISOString(),
        type: 'voice'
      };
      
      onExpenseAdded(expense);
      
      toast({
        title: t.added,
        description: `₹${amount} in ${t.categories[category as keyof typeof t.categories]}`,
      });

      // Reset form
      setTranscription("");
      setAmount("");
      setCategory("");
      setDescription("");
    }
  };

  const resetForm = () => {
    setTranscription("");
    setAmount("");
    setCategory("");
    setDescription("");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Voice Recording */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${
                isRecording ? 'bg-destructive animate-pulse' : 'bg-primary'
              }`}>
                {isRecording ? (
                  <MicOff className="h-8 w-8 text-white" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
              </div>

              {isRecording ? (
                <Button onClick={stopRecording} variant="destructive" size="lg">
                  {t.stopRecording}
                </Button>
              ) : (
                <Button onClick={startRecording} size="lg">
                  {t.startRecording}
                </Button>
              )}

              {isProcessing && (
                <Badge variant="secondary">{t.processing}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transcription Results */}
        {transcription && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.youSaid}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="p-3 bg-muted rounded-lg text-sm">{transcription}</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t.amount} (₹)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">{t.category}</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.categories).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">{t.description}</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={confirmExpense} disabled={!amount || !category} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    {t.confirm}
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    {t.cancel}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        {!transcription && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Examples</CardTitle>
              <CardDescription>Try saying:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {t.examples.map((example, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                    "{example}"
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;