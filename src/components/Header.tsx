import { useState, useEffect } from 'react';
import { Menu, X, Truck, User, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const userCpf = localStorage.getItem('user_cpf');
      if (userCpf) {
        const { data } = await supabase
          .from('associados')
          .select('foto_url')
          .eq('cpf', userCpf.replace(/\D/g, ''))
          .single();

        const profileData = data as any;
        if (profileData?.foto_url) {
          setProfilePic(profileData.foto_url);
        }
      }
    };
    fetchProfile();
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Benefícios', href: '/beneficios' },
    { name: 'Apoiadores', href: '/parceiros' },
    { name: 'Cursos EAD', href: '/cursos' },
    { name: 'Ferramentas', href: '/ferramentas' },
    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-2' 
          : isHomePage ? 'bg-transparent py-4' : 'bg-white shadow-md py-2'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
              scrolled || !isHomePage ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              <img
                src="/lovable-uploads/4a99fc5b-079b-4959-9043-f5f3c42c4848.png"
                alt="Logo Frota Brasil"
                className="h-10 md:h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none uppercase transition-colors ${
                scrolled || !isHomePage ? 'text-primary' : 'text-white'
              }`}>
                Frota Brasil
              </span>
              <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors ${
                scrolled || !isHomePage ? 'text-muted-foreground' : 'text-white/60'
              }`}>
                Nacional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive(item.href)
                    ? scrolled || !isHomePage ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white'
                    : scrolled || !isHomePage ? 'text-gray-600 hover:text-primary hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                scrolled || !isHomePage 
                  ? 'text-primary bg-gray-100 hover:bg-gray-200' 
                  : 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
              }`}
            >
              Entrar
            </Link>
            
            <Link
              to="/associacao"
              className="px-6 py-2.5 rounded-lg font-bold text-sm text-yellow-950 bg-yellow-400 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Associe-se
            </Link>

            {profilePic && (
              <Link
                to="/ferramentas/editar-perfil"
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-105 transition-transform shadow-md"
              >
                <img src={profilePic} alt="Meu Perfil" className="w-full h-full object-cover" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              scrolled || !isHomePage ? 'bg-primary text-white' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container-custom py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/5 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                <ChevronRight className={`h-4 w-4 ${isActive(item.href) ? 'opacity-100' : 'opacity-0 transition-opacity'}`} />
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3 px-2">
              <Link
                to="/login"
                className="w-full text-center py-4 rounded-xl font-bold bg-gray-100 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Área do Associado
              </Link>
              <Link
                to="/associacao"
                className="w-full text-center py-4 rounded-xl font-bold text-yellow-950 bg-yellow-400 shadow-lg shadow-yellow-500/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Associe-se Agora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;