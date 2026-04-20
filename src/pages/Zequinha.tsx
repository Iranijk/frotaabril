import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Send, 
    Bot, 
    User, 
    ArrowLeft, 
    MoreVertical, 
    Phone, 
    Video,
    MessageSquare,
    Truck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
    id: string;
    text: string;
    sender: "user" | "zequinha";
    timestamp: Date;
}

const Zequinha = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "E aí, meu chapa! Sou o Zequinha, seu parceiro de estrada aqui na Frota Brasil. Como é que tá o trecho hoje? Em que posso te ajudar?",
            sender: "zequinha",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userCpf = localStorage.getItem('user_cpf');
        if (!userCpf) {
            toast.error("Acesso Restrito", {
                description: "Por favor, faça login para bater um papo com o Zequinha.",
            });
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulação de resposta da IA (Zequinha)
        // No futuro isso pode ser substituído por uma chamada à API / Edge Function
        setTimeout(() => {
            const zequinhaResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getZequinhaResponse(userMessage.text),
                sender: "zequinha",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, zequinhaResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getZequinhaResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes("frete") || lowerText.includes("calculadora")) {
            return "Opa! Se o assunto é frete, a gente tem uma calculadora de frete fera aqui no site. Mas se quiser saber algo específico de preço por km ou como cobrar, manda a dúvida que eu tento te dar uma luz!";
        }
        if (lowerText.includes("multa") || lowerText.includes("juridico")) {
            return "Multa é embaçado, né? Mas ó, a Frota Brasil tem um Assistente Jurídico aqui nas ferramentas que analisa a notificação pra você. Se for algo mais urgente, o pessoal do jurídico tá à disposição!";
        }
        if (lowerText.includes("beneficio") || lowerText.includes("associado")) {
            return "Ser associado da Frota Brasil é o caminho! Tem guincho, auxílio jurídico, descontos em postos e até curso de bica bruta. Você já conferiu sua carteirinha no perfil?";
        }
        if (lowerText.includes("bom dia") || lowerText.includes("boa tarde") || lowerText.includes("boa noite")) {
            return "Salve, meu chapa! Tudo na paz? Siga firme no trecho que Deus tá no comando!";
        }
        if (lowerText.includes("zequinha")) {
            return "Tô aqui, firme e forte! Pode perguntar qualquer coisa sobre a vida na estrada ou sobre a nossa associação. Tamo junto!";
        }
        
        const responses = [
            "Pode crer, entendi o que você disse. O trecho tá puxado, mas vamo que vamo!",
            "Essa é uma boa pergunta, patrão. Deixa eu ver se entendi: você tá querendo saber mais sobre a associação?",
            "Olha, no trecho a gente aprende de tudo, né? Mas sobre isso aí, o melhor é dar uma olhada nas nossas Ferramentas ou falar com o suporte pelo zap.",
            "Tamo junto e misturado! Qualquer coisa que precisar é só dar um grito aqui no chat.",
            "Puxa a cadeira (ou melhor, calça o banco do caminhão) e me conta mais sobre isso aí."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    };

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20 pt-24 pb-8 flex flex-col">
                <div className="container-custom flex-1 max-w-4xl flex flex-col">
                    {/* Header do Chat */}
                    <Card className="rounded-b-none border-b-0 shadow-none border-t-4 border-t-primary">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" onClick={() => navigate("/ferramentas")}>
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Bot className="h-7 w-7 text-purple-600" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Zequinha</h3>
                                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        Online no trecho
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-40">
                                <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Área de Mensagens */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 bg-white border-x p-4 space-y-4 overflow-y-auto max-h-[60vh] min-h-[400px] scroll-smooth"
                        style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    >
                        {messages.map((msg) => (
                            <div 
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}
                            >
                                <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                                    msg.sender === "user" 
                                    ? "bg-primary text-white rounded-tr-none" 
                                    : "bg-muted text-foreground rounded-tl-none border"
                                }`}>
                                    <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                                    <span className={`text-[10px] mt-1 block ${msg.sender === "user" ? "text-white/60 text-right" : "text-muted-foreground"}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-3 shadow-sm border">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input do Chat */}
                    <Card className="rounded-t-none border-t shadow-sm">
                        <CardContent className="p-4">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                className="flex items-center gap-2"
                            >
                                <Input 
                                    placeholder="Mande uma mensagem..."
                                    className="flex-1 h-12 bg-muted/50 focus-visible:ring-primary"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isTyping}
                                />
                                <Button 
                                    type="submit" 
                                    size="icon" 
                                    className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 flex-shrink-0"
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                            <p className="text-[10px] text-center text-muted-foreground mt-2">
                                Zequinha pode cometer erros. Verifique informações importantes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Dicas de Perguntas */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { label: "Quanto custa o frete?", icon: Truck },
                            { label: "Recebi uma multa", icon: MessageSquare },
                            { label: "Benefícios associado", icon: Bot }
                        ].map((chip, i) => (
                            <Button 
                                key={i}
                                variant="outline" 
                                size="sm" 
                                className="rounded-full bg-white whitespace-nowrap gap-2 text-xs h-8"
                                onClick={() => setInputValue(chip.label)}
                            >
                                <chip.icon className="h-3 w-3" />
                                {chip.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Zequinha;
