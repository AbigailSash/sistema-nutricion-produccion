import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sección final de reserva - CTA potente para convertir visitantes en pacientes
function NutriBookingSection({ nutricionista, nutricionistaId }) {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* CTA principal */}
        <div 
          className="max-w-4xl mx-auto rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #9575cd 0%, #7e57c2 100%)' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar tu transformación?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Reservá tu turno online ahora y comenzá tu camino hacia una vida más saludable
          </p>
          
          <button
            onClick={() => navigate(`/nutricionista/${nutricionistaId}/turno`)}
            className="bg-white px-10 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg shadow-xl"
            style={{ color: '#9575cd' }}
          >
            📅 Reservar mi turno ahora
          </button>

          {/* Info adicional */}
          <div className="mt-8 pt-8 border-t border-white border-opacity-30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-sm opacity-90">Pasos simples</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Reservá cuando quieras</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">✓</div>
                <div className="text-sm opacity-90">Confirmación inmediata</div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de contacto adicional */}
        {nutricionista.telefono && (
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <p className="text-gray-600 mb-2">¿Preferís consultar antes de reservar?</p>
            <a 
              href={`https://wa.me/${nutricionista.telefono.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactame por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default NutriBookingSection;
