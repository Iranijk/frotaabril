import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Settings,
    Calculator as CalculatorIcon,
    ArrowLeft,
    Info,
    Droplets,
    Disc,
    Wrench,
    TrendingUp,
    AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface WearData {
    // Pneus
    precoPneu: number;
    quantidadePneus: number;
    vidaUtilPneu: number;
    // Óleo
    precoTrocaOleo: number;
    intervaloTrocaOleo: number;
    // Manutenção
    custoManutencaoKm: number;
    mediaKmRodadoMensal: number;
}

const CalculadoraDesgaste = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userCpf = localStorage.getItem('user_cpf');
        if (!userCpf) {
            toast.error("Acesso Restrito", {
                description: "Por favor, faça login para acessar a calculadora de desgaste.",
            });
            navigate('/login');
        }
    }, [navigate]);

    const [data, setData] = useState<WearData>(() => {
        const saved = localStorage.getItem("afb_wear_data");
        if (saved) return JSON.parse(saved);
        return {
            precoPneu: 2500,
            quantidadePneus: 10,
            vidaUtilPneu: 80000,
            precoTrocaOleo: 1200,
            intervaloTrocaOleo: 20000,
            custoManutencaoKm: 0.30,
            mediaKmRodadoMensal: 10000
        };
    });

    useEffect(() => {
        localStorage.setItem("afb_wear_data", JSON.stringify(data));
    }, [data]);

    // Cálculos
    const custoPneuKm = (data.precoPneu * data.quantidadePneus) / (data.vidaUtilPneu || 1);
    const custoOleoKm = data.precoTrocaOleo / (data.intervaloTrocaOleo || 1);
    const custoTotalKm = custoPneuKm + custoOleoKm + data.custoManutencaoKm;
    
    const custoMensalTotal = custoTotalKm * data.mediaKmRodadoMensal;
    const custoAnualTotal = custoMensalTotal * 12;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const parseCurrency = (value: string) => {
        const cleanValue = value.replace(/\D/g, "");
        return Number(cleanValue) / 100;
    };

    const handleCurrencyChange = (field: keyof WearData, value: string) => {
        const numericValue = parseCurrency(value);
        setData({ ...data, [field]: numericValue });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-muted/20 pt-24 pb-12">
                <div className="container-custom">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/ferramentas")}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Calculadora de Desgaste</h1>
                            <p className="text-muted-foreground">Estime o custo real de manutenção por quilômetro</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Disc className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>Pneus</CardTitle>
                                        <CardDescription>Custo de reposição de rodagem</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Preço do Pneu (Unidade)</Label>
                                        <Input 
                                            value={formatCurrency(data.precoPneu)} 
                                            onChange={e => handleCurrencyChange('precoPneu', e.target.value)} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Quantidade de Pneus</Label>
                                        <Input 
                                            type="number" 
                                            value={data.quantidadePneus} 
                                            onChange={e => setData({ ...data, quantidadePneus: Number(e.target.value) })} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Vida Útil Estimada (KM)</Label>
                                        <Input 
                                            type="number" 
                                            value={data.vidaUtilPneu} 
                                            onChange={e => setData({ ...data, vidaUtilPneu: Number(e.target.value) })} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                        <Droplets className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>Lubrificação</CardTitle>
                                        <CardDescription>Óleo e filtros do motor</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Preço da Troca (Completa)</Label>
                                        <Input 
                                            value={formatCurrency(data.precoTrocaOleo)} 
                                            onChange={e => handleCurrencyChange('precoTrocaOleo', e.target.value)} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Intervalo de Troca (KM)</Label>
                                        <Input 
                                            type="number" 
                                            value={data.intervaloTrocaOleo} 
                                            onChange={e => setData({ ...data, intervaloTrocaOleo: Number(e.target.value) })} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <Wrench className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>Manutenção e KM</CardTitle>
                                        <CardDescription>Outros reparos e estimativa de rodagem</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Manutenção Geral (R$ por KM)</Label>
                                        <Input 
                                            value={formatCurrency(data.custoManutencaoKm)} 
                                            onChange={e => handleCurrencyChange('custoManutencaoKm', e.target.value)} 
                                            placeholder="Ex: 0,30"
                                        />
                                        <p className="text-xs text-muted-foreground italic">Inclui freios, suspensão, elétrica, etc.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Média de KM Mensal</Label>
                                        <Input 
                                            type="number" 
                                            value={data.mediaKmRodadoMensal} 
                                            onChange={e => setData({ ...data, mediaKmRodadoMensal: Number(e.target.value) })} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="bg-primary text-white sticky top-24 shadow-2xl overflow-hidden border-none">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CalculatorIcon className="h-24 w-24" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" /> Resultado Final
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 relative">
                                    <div className="border-b border-white/20 pb-4">
                                        <p className="text-white/70 text-sm">Custo de Desgaste por KM</p>
                                        <p className="text-4xl font-bold">R$ {custoTotalKm.toFixed(2)}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/70">Pneus:</span>
                                            <span className="font-semibold">R$ {custoPneuKm.toFixed(2)} / km</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/70">Óleo:</span>
                                            <span className="font-semibold">R$ {custoOleoKm.toFixed(2)} / km</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/70">Manut. Geral:</span>
                                            <span className="font-semibold">R$ {data.custoManutencaoKm.toFixed(2)} / km</span>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 p-4 rounded-lg space-y-2">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider opacity-70">Impacto Mensal</p>
                                            <p className="text-xl font-bold">{formatCurrency(custoMensalTotal)}</p>
                                        </div>
                                        <div className="pt-2 border-t border-white/10">
                                            <p className="text-xs uppercase tracking-wider opacity-70">Impacto Anual</p>
                                            <p className="text-xl font-bold">{formatCurrency(custoAnualTotal)}</p>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-start gap-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-50">
                                            Lembre-se: Estes valores são provisionamentos. Você deve guardar esse valor por KM rodado para não ser pego de surpresa.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800">
                                    <strong>Dica:</strong> Conhecer seu custo de desgaste é fundamental para cobrar um frete justo e manter sua margem de lucro real.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CalculadoraDesgaste;
