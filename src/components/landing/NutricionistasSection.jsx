import { Link } from 'react-router-dom';

function NutricionistasSection() {
    return (
        <section id="nutricionistas" className="py-16 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Nuestros Nutricionistas
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Conoce a los profesionales que forman parte de nuestro equipo
                    </p>
                </div>

                <div className="text-center">
                    <Link
                        to="/nutricionistas-disponibles"
                        className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Ver Nutricionistas Disponibles
                    </Link>
                    <p className="mt-4 text-gray-600">
                        Encuentra el profesional ideal para tu plan nutricional
                    </p>
                </div>

                {/* Decoración visual */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Profesionales Certificados</h3>
                        <p className="text-gray-600">Todos nuestros nutricionistas están certificados y especializados</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
                        <p className="text-gray-600">Planes nutricionales adaptados a tus necesidades específicas</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Agenda Fácil</h3>
                        <p className="text-gray-600">Sistema de turnos online para mayor comodidad</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NutricionistasSection;
