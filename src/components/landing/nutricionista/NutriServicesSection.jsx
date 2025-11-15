import React from 'react';
import { FaUserAlt, FaUtensils } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';

// Sección de Servicios personalizable
// TODO FASE FUTURA: El nutricionista podrá personalizar estos servicios desde su panel
function NutriServicesSection({ nutricionista }) {
  // Servicios por defecto (personalizables en el futuro)
  const defaultServices = [
    {
      icon: FaUserAlt,
      title: "Evaluación Nutricional",
      description: "Mediciones antropométricas completas y análisis personalizado de tu estado nutricional."
    },
    {
      icon: FaUtensils,
      title: "Plan Alimentario Personalizado",
      description: "Diseño de un plan nutricional adaptado a tus objetivos, preferencias y estilo de vida."
    },
    {
      icon: FiTrendingUp,
      title: "Seguimiento Continuo",
      description: "Control y ajuste de tu progreso con seguimientos periódicos y apoyo constante."
    }
  ];

  // TODO: En el futuro, obtener servicios personalizados del nutricionista
  // const services = nutricionista.servicios_personalizados || defaultServices;
  const services = defaultServices;

  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Servicios que ofrezco
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Atención profesional y personalizada para ayudarte a alcanzar tus objetivos de salud
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div
                  className="mb-4 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: '#F3E8FF', width: '5rem', height: '5rem' }}
                  aria-hidden="true"
                >
                  <Icon size={28} style={{ color: '#9575CD' }} aria-hidden="true" />
                </div>
                <h5 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h5>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NutriServicesSection;
