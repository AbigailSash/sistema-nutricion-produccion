import React from 'react';

// Sección de Testimonios personalizable
// TODO FASE FUTURA: El nutricionista podrá agregar sus propios testimonios desde su panel
function NutriTestimonialsSection({ nutricionista }) {
  // Testimonios por defecto (personalizables en el futuro)
  const defaultTestimonials = [
    {
      name: "María G.",
      comment: "Excelente profesional, muy atenta y comprometida con mi salud. Los resultados son increíbles.",
      rating: 5
    },
    {
      name: "Juan P.",
      comment: "El seguimiento es constante y los planes son fáciles de seguir. Totalmente recomendable.",
      rating: 5
    },
    {
      name: "Laura M.",
      comment: "Cambió mi forma de ver la alimentación. Profesional, empática y con mucho conocimiento.",
      rating: 5
    }
  ];

  // TODO: En el futuro, obtener testimonios reales del nutricionista
  // const testimonials = nutricionista.testimonios || defaultTestimonials;
  const testimonials = defaultTestimonials;

  if (!testimonials || testimonials.length === 0) {
    return null; // No mostrar la sección si no hay testimonios
  }

  return (
    <section id="testimonios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Lo que dicen mis pacientes
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          La satisfacción de mis pacientes es mi mayor motivación
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Estrellas */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" style={{color: '#9575cd'}} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Comentario */}
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              
              {/* Nombre */}
              <p className="text-gray-900 font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NutriTestimonialsSection;
