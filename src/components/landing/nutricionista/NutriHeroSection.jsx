import React from 'react';
import { useNavigate } from 'react-router-dom';

// Hero Section personalizado del nutricionista
// Muestra foto, nombre, especialidades y CTA principal
function NutriHeroSection({ nutricionista, nutricionistaId }) {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-16" style={{ backgroundColor: '#e8ddf5' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Foto del nutricionista */}
              <div className="md:w-2/5 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center p-12">
                {nutricionista.foto_perfil ? (
                  <img
                    src={nutricionista.foto_perfil}
                    alt={nutricionista.full_name}
                    className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                ) : (
                  <div className="w-64 h-64 rounded-full bg-white border-4 border-white shadow-2xl flex items-center justify-center">
                    <span className="text-8xl font-bold" style={{ color: '#9575cd' }}>
                      {nutricionista.nombre?.[0]}{nutricionista.apellido?.[0]}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Información principal */}
              <div className="md:w-3/5 p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {nutricionista.full_name}
                </h1>
                
                {/* Especialidades */}
                {nutricionista.especialidades && nutricionista.especialidades.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {nutricionista.especialidades.map((esp, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 text-white rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#9575cd' }}
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                )}

                {/* Matrícula */}
                {nutricionista.matricula && (
                  <p className="text-gray-600 mb-4 text-lg">
                    Matrícula: <span className="font-semibold">{nutricionista.matricula}</span>
                  </p>
                )}

                {/* Descripción breve */}
                {nutricionista.descripcion && (
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {nutricionista.descripcion}
                  </p>
                )}
                
                {/* CTA Principal */}
                <button
                  onClick={() => navigate(`/nutricionista/${nutricionistaId}/turno`)}
                  className="w-full md:w-auto text-white px-10 py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: '#9575cd' }}
                >
                  📅 Reservar turno online
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de bienvenida */}
        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700">
            Bienvenido a mi consultorio virtual
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Transformá tu salud con un plan nutricional personalizado
          </p>
        </div>
      </div>
    </section>
  );
}

export default NutriHeroSection;
