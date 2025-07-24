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

  const processTranscription = (text: string) => {
    setIsProcessing(true);
    
    // Simple NLP parsing - in production, this would use a proper NLP service
    setTimeout(() => {
      const amountMatch = text.match(/(\d+)\s*(?:रुपये|rupees?|rs)/i);
      const extractedAmount = amountMatch ? amountMatch[1] : "";
      
      let extractedCategory = "other";
      if (text.toLowerCase().includes("सब्जी") || text.toLowerCase().includes("vegetables") || text.toLowerCase().includes("groceries")) {
        extractedCategory = "groceries";
      } else if (text.toLowerCase().includes("ऑटो") || text.toLowerCase().includes("बस") || text.toLowerCase().includes("transport") || text.toLowerCase().includes("taxi")) {
        extractedCategory = "transport";
      } else if (text.toLowerCase().includes("खाना") || text.toLowerCase().includes("food") || text.toLowerCase().includes("restaurant")) {
        extractedCategory = "food";
      } else if (text.toLowerCase().includes("दवाई") || text.toLowerCase().includes("medicine") || text.toLowerCase().includes("medical")) {
        extractedCategory = "medical";
      }

      setAmount(extractedAmount);
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