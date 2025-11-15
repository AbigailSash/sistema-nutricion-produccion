import React, { useState } from 'react';

// Sección de Preguntas Frecuentes personalizable
// TODO FASE FUTURA: El nutricionista podrá personalizar estas FAQs desde su panel
function NutriFAQSection({ nutricionista }) {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQs por defecto (personalizables en el futuro)
  const defaultFaqs = [
    {
      question: "¿Cómo funciona la reserva de turnos?",
      answer: "Podés reservar tu turno online seleccionando el día y horario que mejor te convenga. Recibirás una confirmación inmediata por email."
    },
    {
      question: "¿Qué incluye la consulta inicial?",
      answer: "La primera consulta incluye evaluación completa: mediciones antropométricas, análisis de hábitos alimentarios, objetivos y diseño del plan nutricional personalizado."
    },
    {
      question: "¿Realizás consultas virtuales?",
      answer: "Sí, ofrezco tanto consultas presenciales como videoconsultas. Podés elegir la modalidad que prefieras al reservar tu turno."
    },
    {
      question: "¿Cada cuánto tiempo son los seguimientos?",
      answer: "Los seguimientos suelen ser cada 15-30 días, dependiendo de tus objetivos y necesidades. Lo definimos juntos en la primera consulta."
    },
    {
      question: "¿Qué métodos de pago aceptás?",
      answer: "Acepto efectivo, transferencia bancaria y todos los medios de pago electrónicos. Los detalles se confirman al reservar el turno."
    }
  ];

  // TODO: En el futuro, obtener FAQs personalizadas del nutricionista
  // const faqs = nutricionista.faqs_personalizadas || defaultFaqs;
  const faqs = defaultFaqs;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Resolvé tus dudas antes de agendar tu consulta
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{color: '#9575cd'}}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NutriFAQSection;
