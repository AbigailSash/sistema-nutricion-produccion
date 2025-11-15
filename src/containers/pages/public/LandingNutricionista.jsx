// src/containers/pages/public/LandingNutricionista.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Componentes del landing principal (reutilizables)
import Navbar from '../../../components/navigation/Navbar';
import Footer from '../../../components/navigation/Footer';
import WhatsAppButton from '../../../components/landing/WhatsAppButton';

// Componentes específicos del nutricionista
import NutriHeroSection from '../../../components/landing/nutricionista/NutriHeroSection';
import NutriServicesSection from '../../../components/landing/nutricionista/NutriServicesSection';
import NutriBenefitsSection from '../../../components/landing/nutricionista/NutriBenefitsSection';
import NutriTestimonialsSection from '../../../components/landing/nutricionista/NutriTestimonialsSection';
import NutriFAQSection from '../../../components/landing/nutricionista/NutriFAQSection';
import NutriBookingSection from '../../../components/landing/nutricionista/NutriBookingSection';

// Landing personalizado de cada nutricionista
// URL: /nutricionista/:nutricionistaId
// Este landing replica la estructura del Home pero personalizado para cada profesional
// TODO: En FASE futura, el nutricionista podrá personalizar secciones desde su panel

export default function LandingNutricionista() {
  const { nutricionistaId } = useParams();
  const navigate = useNavigate();

  const [nutricionista, setNutricionista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real del nutricionista
        const response = await fetch(`/api/public/nutricionistas/${nutricionistaId}/`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Nutricionista no encontrado o no tiene turnero público habilitado');
          } else {
            setError('Error al cargar información del nutricionista');
          }
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setNutricionista(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando nutricionista:', error);
        setError('Error al cargar información del nutricionista');
        setLoading(false);
      }
    };

    if (nutricionistaId) {
      fetchData();
    }
  }, [nutricionistaId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !nutricionista) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Nutricionista no encontrado'}</p>
          <button
            onClick={() => navigate('/nutricionistas-disponibles')}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Ver todos los nutricionistas
          </button>
        </div>
      </div>
    );
  }

  // Estructura del landing igual al Home principal
  return (
    <div>
      <Navbar />
      <NutriHeroSection nutricionista={nutricionista} nutricionistaId={nutricionistaId} />
      <NutriServicesSection nutricionista={nutricionista} />
      <NutriBenefitsSection nutricionista={nutricionista} />
      <NutriTestimonialsSection nutricionista={nutricionista} />
      <NutriFAQSection nutricionista={nutricionista} />
      <NutriBookingSection nutricionista={nutricionista} nutricionistaId={nutricionistaId} />
      <Footer />
      <WhatsAppButton phone={nutricionista.telefono} />
    </div>
  );
}
