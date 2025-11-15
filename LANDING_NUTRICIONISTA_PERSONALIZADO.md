# Landing Personalizado por Nutricionista

## 📋 Resumen

Cada nutricionista tiene su propio landing page personalizado accesible mediante la URL:
```
/nutricionista/:nutricionistaId
```

Este landing replica la estructura del Home principal (`/landing`) pero personalizado con la información de cada profesional.

## 🏗️ Estructura Actual

### Componente Principal
**Ubicación:** `src/containers/pages/public/LandingNutricionista.jsx`

### Secciones del Landing (en orden)

1. **Navbar** - Navegación general (compartida)
2. **NutriHeroSection** - Hero personalizado con foto, nombre, especialidades
3. **NutriServicesSection** - Servicios que ofrece el nutricionista
4. **NutriBenefitsSection** - Beneficios de trabajar con el profesional
5. **NutriTestimonialsSection** - Testimonios de pacientes
6. **NutriFAQSection** - Preguntas frecuentes
7. **NutriBookingSection** - CTA final para reservar turno
8. **Footer** - Pie de página (compartido)
9. **WhatsAppButton** - Botón flotante de WhatsApp con el teléfono del nutricionista

### Componentes Específicos
**Ubicación:** `src/components/landing/nutricionista/`

- `NutriHeroSection.jsx` - Hero personalizado
- `NutriServicesSection.jsx` - Servicios
- `NutriBenefitsSection.jsx` - Beneficios
- `NutriTestimonialsSection.jsx` - Testimonios
- `NutriFAQSection.jsx` - Preguntas frecuentes
- `NutriBookingSection.jsx` - Sección final de reserva

## 🎨 Información Actual Mostrada

### Datos del Nutricionista (desde la API)
- ✅ Nombre completo
- ✅ Foto de perfil
- ✅ Especialidades
- ✅ Matrícula profesional
- ✅ Descripción/Bio
- ✅ Teléfono (para WhatsApp)

### Contenido por Defecto (hardcoded)
- Servicios (3 servicios estándar)
- Beneficios (6 beneficios estándar)
- Testimonios (3 testimonios de ejemplo)
- FAQs (5 preguntas frecuentes)

## 🚀 FASE FUTURA - Panel de Personalización

### Backend Necesario

#### 1. Modelo de Configuración de Landing
```python
# apps/user/models.py (o crear nueva app 'landing')

class LandingConfig(models.Model):
    """Configuración personalizable del landing del nutricionista"""
    nutricionista = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,
        related_name='landing_config'
    )
    
    # Personalización de Hero
    titulo_hero = models.CharField(max_length=200, blank=True)
    subtitulo_hero = models.TextField(blank=True)
    
    # Colores personalizados
    color_primario = models.CharField(max_length=7, default='#9575cd')
    color_secundario = models.CharField(max_length=7, default='#b39ddb')
    
    # Activar/desactivar secciones
    mostrar_servicios = models.BooleanField(default=True)
    mostrar_beneficios = models.BooleanField(default=True)
    mostrar_testimonios = models.BooleanField(default=True)
    mostrar_faq = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ServicioPersonalizado(models.Model):
    """Servicios personalizados del nutricionista"""
    landing_config = models.ForeignKey(
        LandingConfig,
        on_delete=models.CASCADE,
        related_name='servicios'
    )
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    icono = models.CharField(max_length=50, default='FaUserAlt')  # Nombre del icono
    orden = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)

class BeneficioPersonalizado(models.Model):
    """Beneficios personalizados"""
    landing_config = models.ForeignKey(
        LandingConfig,
        on_delete=models.CASCADE,
        related_name='beneficios'
    )
    texto = models.CharField(max_length=200)
    orden = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)

class TestimonioPersonalizado(models.Model):
    """Testimonios de pacientes"""
    landing_config = models.ForeignKey(
        LandingConfig,
        on_delete=models.CASCADE,
        related_name='testimonios'
    )
    nombre_paciente = models.CharField(max_length=100)
    comentario = models.TextField()
    rating = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    fecha = models.DateField(auto_now_add=True)
    orden = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)

class FAQPersonalizada(models.Model):
    """Preguntas frecuentes personalizadas"""
    landing_config = models.ForeignKey(
        LandingConfig,
        on_delete=models.CASCADE,
        related_name='faqs'
    )
    pregunta = models.CharField(max_length=200)
    respuesta = models.TextField()
    orden = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)
```

#### 2. Serializers
```python
# apps/user/serializers.py

class ServicioPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioPersonalizado
        fields = ['id', 'titulo', 'descripcion', 'icono', 'orden', 'activo']

class BeneficioPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeneficioPersonalizado
        fields = ['id', 'texto', 'orden', 'activo']

class TestimonioPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonioPersonalizado
        fields = ['id', 'nombre_paciente', 'comentario', 'rating', 'orden', 'activo']

class FAQPersonalizadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQPersonalizada
        fields = ['id', 'pregunta', 'respuesta', 'orden', 'activo']

class LandingConfigSerializer(serializers.ModelSerializer):
    servicios = ServicioPersonalizadoSerializer(many=True, read_only=True)
    beneficios = BeneficioPersonalizadoSerializer(many=True, read_only=True)
    testimonios = TestimonioPersonalizadoSerializer(many=True, read_only=True)
    faqs = FAQPersonalizadaSerializer(many=True, read_only=True)
    
    class Meta:
        model = LandingConfig
        fields = [
            'id', 'titulo_hero', 'subtitulo_hero',
            'color_primario', 'color_secundario',
            'mostrar_servicios', 'mostrar_beneficios',
            'mostrar_testimonios', 'mostrar_faq',
            'servicios', 'beneficios', 'testimonios', 'faqs'
        ]
```

#### 3. Endpoints API

```python
# apps/user/urls.py (rutas protegidas del nutricionista)

urlpatterns = [
    # Configuración del landing
    path('landing-config/', LandingConfigViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update'
    })),
    
    # CRUD Servicios
    path('landing-config/servicios/', ServicioViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('landing-config/servicios/<int:pk>/', ServicioViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    
    # CRUD Beneficios
    path('landing-config/beneficios/', BeneficioViewSet.as_view({...})),
    
    # CRUD Testimonios
    path('landing-config/testimonios/', TestimonioViewSet.as_view({...})),
    
    # CRUD FAQs
    path('landing-config/faqs/', FAQViewSet.as_view({...})),
]

# apps/user/public_urls.py (ruta pública)
urlpatterns = [
    # Obtener configuración pública del landing
    path('nutricionistas/<int:id>/landing/', NutricionistaLandingPublicView.as_view()),
]
```

### Frontend - Panel del Nutricionista

#### Nueva Página: Personalizar Landing
**Ubicación:** `src/containers/pages/nutricionista/LandingConfigPage.jsx`

Secciones del panel:
1. **Vista Previa en Vivo** - Preview del landing en tiempo real
2. **Configuración General**
   - Título y subtítulo del hero
   - Colores personalizados (color picker)
   - Activar/desactivar secciones
3. **Gestión de Servicios**
   - Agregar/editar/eliminar servicios
   - Elegir iconos
   - Reordenar (drag & drop)
4. **Gestión de Beneficios**
   - Agregar/editar/eliminar beneficios
   - Reordenar
5. **Gestión de Testimonios**
   - Agregar/editar/eliminar testimonios
   - Sistema de rating
6. **Gestión de FAQs**
   - Agregar/editar/eliminar preguntas
   - Reordenar

#### Actualizar Rutas
```jsx
// src/Routes.jsx
<Route path="/panel/nutri">
  ...
  <Route path="landing/personalizar" element={<LandingConfigPage />} />
</Route>
```

#### Actualizar Componentes del Landing
Los componentes en `src/components/landing/nutricionista/` deberán:
1. Verificar si existe configuración personalizada
2. Si existe, usar datos personalizados
3. Si no existe, usar valores por defecto

```jsx
// Ejemplo en NutriServicesSection.jsx
function NutriServicesSection({ nutricionista }) {
  const [servicios, setServicios] = useState([]);
  
  useEffect(() => {
    // Intentar obtener servicios personalizados
    if (nutricionista.landing_config?.servicios) {
      setServicios(nutricionista.landing_config.servicios);
    } else {
      // Usar servicios por defecto
      setServicios(DEFAULT_SERVICES);
    }
  }, [nutricionista]);
  
  // ... resto del componente
}
```

## 📝 Tareas para Implementar Panel de Personalización

### Backend
- [ ] Crear modelos en `apps/user/models.py`
- [ ] Crear serializers
- [ ] Crear ViewSets para CRUD
- [ ] Configurar URLs protegidas y públicas
- [ ] Migraciones de base de datos
- [ ] Tests unitarios

### Frontend
- [ ] Crear `LandingConfigPage.jsx`
- [ ] Componente de vista previa en vivo
- [ ] Formularios para cada sección
- [ ] Sistema de drag & drop para reordenar
- [ ] Color picker para personalización de colores
- [ ] Integrar con API
- [ ] Actualizar componentes del landing para usar datos dinámicos
- [ ] Agregar ruta en el sidebar del nutricionista

### UX/UI
- [ ] Diseñar interfaz del panel de personalización
- [ ] Sistema de guardado automático
- [ ] Confirmaciones y mensajes de éxito/error
- [ ] Validaciones de formularios
- [ ] Límites (ej: máximo 5 servicios, 10 testimonios, etc.)

## 🎯 Beneficios del Sistema de Personalización

1. **Para el Nutricionista:**
   - Diferenciación profesional
   - Control sobre su marca personal
   - Destacar servicios específicos
   - Mostrar casos de éxito reales

2. **Para el Paciente:**
   - Información más relevante y específica
   - Mayor confianza al ver testimonios reales
   - Mejor comprensión de los servicios ofrecidos

3. **Para el Sistema:**
   - Mayor valor agregado a la plataforma
   - Nutricionistas más comprometidos
   - Diferenciador competitivo

## 🔄 Migración Gradual

1. **Fase 1 (ACTUAL):** Landing con datos por defecto
2. **Fase 2:** Backend con modelos y API
3. **Fase 3:** Panel de administración del landing
4. **Fase 4:** Features avanzadas (estadísticas, A/B testing, etc.)

## 📚 Referencias

- Componente Home: `src/containers/pages/Home.jsx`
- Componentes del landing general: `src/components/landing/`
- API pública de nutricionistas: `/api/public/nutricionistas/:id/`
