import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Dashboard from "@/components/Dashboard";
import VoiceInput from "@/components/VoiceInput";
import ChatBot from "@/components/ChatBot";

type AppState = 'login' | 'dashboard' | 'voice' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [userInfo, setUserInfo] = useState({
    phoneNumber: '',
    language: 'hindi' as 'hindi' | 'english' | 'marathi' | 'telugu' | 'tamil' | 'punjabi',
    income: '10000-15000'
  });
  const [expenses, setExpenses] = useState<any[]>([]);

  const handleLogin = (phoneNumber: string, language: string, income: string) => {
    setUserInfo({ phoneNumber, language: language as 'hindi' | 'english' | 'marathi' | 'telugu' | 'tamil' | 'punjabi', income });
    setCurrentState('dashboard');
  };

  const handleVoiceInput = () => {
    setCurrentState('voice');
  };

  const handleChatBot = () => {
    setCurrentState('chat');
  };

  const handleExpenseAdded = (expense: any) => {
    setExpenses(prev => [...prev, expense]);
    setCurrentState('dashboard');
  };

  const handleBack = () => {
    setCurrentState('dashboard');
  };

  switch (currentState) {
    case 'login':
      return <LoginPage onLogin={handleLogin} />;
    
    case 'voice':
      return (
        <VoiceInput 
          userLanguage={userInfo.language}
          onBack={handleBack}
          onExpenseAdded={handleExpenseAdded}
        />
      );
    
    case 'chat':
      return (
        <ChatBot 
          userLanguage={userInfo.language}
          userIncome={userInfo.income}
          onBack={handleBack}
        />
      );
    
    default:
      return (
        <Dashboard 
          userLanguage={userInfo.language}
          userIncome={userInfo.income}
          onVoiceInput={handleVoiceInput}
          onChatBot={handleChatBot}
        />
      );
  }
};

export default Index;
