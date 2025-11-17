import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../common/Logo';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Cargar el modo oscuro guardado del localStorage
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    // Aplicar modo oscuro al cargar
    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        const isDark = saved === 'true';
        
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
        }
    }, []);
    
    // Actualizar cuando cambia el estado
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        
        if (newDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
        }
    };

    return(
        <nav className='w-full py-2 shadow-sm fixed top-0 z-50' style={{backgroundColor: '#e8ddf5'}}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Logo className="h-10 w-10" showText={false} />
                            <span className="ml-3 text-xl font-bold text-green-600">
                                NutriSalud
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#servicios" className="text-gray-700 transition-colors" style={{'--hover-color': '#10B981'}} onMouseEnter={e => e.target.style.color = '#10B981'} onMouseLeave={e => e.target.style.color = '#374151'}>
                            Servicios
                        </a>
                        <a href="#beneficios" className="text-gray-700 transition-colors" onMouseEnter={e => e.target.style.color = '#10B981'} onMouseLeave={e => e.target.style.color = '#374151'}>
                            Beneficios
                        </a>
                        <a href="#nutricionistas" className="text-gray-700 transition-colors" onMouseEnter={e => e.target.style.color = '#10B981'} onMouseLeave={e => e.target.style.color = '#374151'}>
                            Nutricionistas
                        </a>
                        <a href="#testimonios" className="text-gray-700 transition-colors" onMouseEnter={e => e.target.style.color = '#10B981'} onMouseLeave={e => e.target.style.color = '#374151'}>
                            Testimonios
                        </a>
                        <Link
                            to="/login"
                            className="text-white px-4 py-2 rounded font-medium transition-colors"
                            style={{backgroundColor: '#10B981'}}
                            onMouseEnter={e => e.target.style.backgroundColor = '#059669'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#10B981'}
                        >
                            Iniciar Sesión
                        </Link>
                        
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            onMouseEnter={e => e.target.style.color = '#9575cd'}
                            onMouseLeave={e => e.target.style.color = '#374151'}
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200" style={{backgroundColor: '#e8ddf5'}}>
                            <a
                                href="#servicios"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                onMouseEnter={e => e.target.style.color = '#9575cd'}
                                onMouseLeave={e => e.target.style.color = '#374151'}
                                onClick={() => setIsOpen(false)}
                            >
                                Servicios
                            </a>
                            <a
                                href="#beneficios"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                onMouseEnter={e => e.target.style.color = '#10B981'}
                                onMouseLeave={e => e.target.style.color = '#374151'}
                                onClick={() => setIsOpen(false)}
                            >
                                Beneficios
                            </a>
                            <a
                                href="#nutricionistas"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                onMouseEnter={e => e.target.style.color = '#10B981'}
                                onMouseLeave={e => e.target.style.color = '#374151'}
                                onClick={() => setIsOpen(false)}
                            >
                                Nutricionistas
                            </a>
                            <a
                                href="#testimonios"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                onMouseEnter={e => e.target.style.color = '#10B981'}
                                onMouseLeave={e => e.target.style.color = '#374151'}
                                onClick={() => setIsOpen(false)}
                            >
                                Testimonios
                            </a>
                            <Link
                                to="/login"
                                className="block w-full text-center text-white px-4 py-2 rounded font-semibold transition-colors mt-4"
                                style={{backgroundColor: '#10B981'}}
                                onMouseEnter={e => e.target.style.backgroundColor = '#059669'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#10B981'}
                                onClick={() => setIsOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>
                            {/* Dark mode toggle en móvil */}
                            <button
                                onClick={toggleDarkMode}
                                className="flex items-center justify-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors mt-4 border border-gray-300"
                                aria-label="Toggle dark mode"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                                {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
        )    
}

    const mapStateToProps = () => ({ });
    

    export default connect(mapStateToProps,{
    })(Navbar);