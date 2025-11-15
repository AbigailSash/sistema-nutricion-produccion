import React from 'react';

// Sección de Beneficios personalizable
// TODO FASE FUTURA: El nutricionista podrá personalizar estos beneficios desde su panel
function NutriBenefitsSection({ nutricionista }) {
  // Beneficios por defecto (personalizables en el futuro)
  const defaultBenefits = [
    "Atención personalizada según tus necesidades",
    "Turnos online con confirmación inmediata",
    "Seguimiento continuo de tu progreso",
    "Planes alimentarios adaptados a tu estilo de vida",
    "Acceso a tu historial clínico siempre disponible",
    "Consultas presenciales y virtuales"
  ];

  // TODO: En el futuro, obtener beneficios personalizados del nutricionista
  // const benefits = nutricionista.beneficios_personalizados || defaultBenefits;
  const benefits = defaultBenefits;

  return (
    <section id="beneficios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          ¿Por qué elegirme?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Compromiso con tu salud y bienestar integral
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="mr-3 mt-1 flex-shrink-0" style={{color: '#9575cd', fontSize: '1.5rem'}}>✓</span>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NutriBenefitsSection;
