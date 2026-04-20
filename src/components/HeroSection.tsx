import DonnerImage from '../assets/donner-de-souza.jpeg';
import HeroBg from '../assets/hero-bg.png';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Shield, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HeroBg} 
          alt="Estrada" 
          className="w-full h-full object-cover scale-110 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/95 backdrop-blur-[2px]"></div>
      </div>

      <div className="container-custom relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-400 font-bold text-sm uppercase tracking-widest">
              <Award className="h-4 w-4" />
              Associação de Peso no Trecho
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              FORÇA E UNIÃO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
                DO CAMINHONEIRO
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-xl leading-relaxed">
              A Frota Brasil nasceu para defender seus direitos e oferecer o suporte que você precisa no dia a dia da estrada.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/associacao" 
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-primary font-black rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl shadow-yellow-500/20"
              >
                QUERO ME ASSOCIAR <ChevronRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/beneficios" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all backdrop-blur-md border border-white/20"
              >
                VER BENEFÍCIOS
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-yellow-400">130k+</span>
                <span className="text-xs uppercase text-white/60 tracking-wider">Associados</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-yellow-400">24h</span>
                <span className="text-xs uppercase text-white/60 tracking-wider">Suporte</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-yellow-400">Brasil</span>
                <span className="text-xs uppercase text-white/60 tracking-wider">Cobertura</span>
              </div>
            </div>
          </div>

          {/* Right Side: Presidente Donner Image Card */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="relative z-10 bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 blur-3xl rounded-full group-hover:bg-yellow-500/40 transition-colors"></div>
              
              <Link to="/sobre#galeria" className="block relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
                <img 
                  src={DonnerImage} 
                  alt="Donner de Souza" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-black italic tracking-tighter">DONNER DE SOUZA</h2>
                  <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Presidente Frota Brasil
                  </p>
                </div>
              </Link>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-dark/30 rounded-full blur-2xl z-0"></div>
          </div>

        </div>
      </div>

      {/* Wave transition for the bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] fill-white pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.05,110.19,132,103.38,197,95.8,245.86,90.18,272.77,65.51,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;