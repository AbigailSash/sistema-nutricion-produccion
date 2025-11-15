# Guía de Prueba - Landing Nutricionista

## 🧪 Cómo Probar el Landing

### 1. Verificar que el servidor esté corriendo

```bash
# Backend Django
python manage.py runserver

# Frontend React (en otra terminal)
npm run dev
```

### 2. Acceder al landing de un nutricionista

Opción 1 - URL directa:
```
http://localhost:5173/nutricionista/1
```

Opción 2 - Desde la lista de nutricionistas:
```
http://localhost:5173/nutricionistas-disponibles
→ Click en algún nutricionista
```

### 3. Verificaciones

#### ✅ Hero Section
- [ ] Se muestra la foto del nutricionista (o iniciales si no tiene)
- [ ] Aparece el nombre completo
- [ ] Se muestran las especialidades como badges morados
- [ ] Aparece la matrícula
- [ ] Se muestra la descripción/bio
- [ ] Botón "Reservar turno online" funciona

#### ✅ Sección de Servicios
- [ ] Aparecen 3 servicios
- [ ] Cada uno tiene un ícono
- [ ] Los textos son legibles

#### ✅ Sección de Beneficios
- [ ] Aparecen 6 beneficios
- [ ] Tienen checkmarks morados
- [ ] Layout en grid responsive

#### ✅ Sección de Testimonios
- [ ] Aparecen 3 testimonios
- [ ] Cada uno tiene estrellas de rating
- [ ] Se muestra el nombre del paciente

#### ✅ Sección de FAQs
- [ ] Aparecen 5 preguntas
- [ ] Al hacer click se expanden/contraen
- [ ] Solo una puede estar abierta a la vez

#### ✅ Sección de Reserva Final
- [ ] CTA grande y destacado
- [ ] Botón navega al turnero
- [ ] Muestra las 3 estadísticas (3 pasos, 24/7, confirmación)
- [ ] Si hay teléfono, muestra link de WhatsApp

#### ✅ Elementos Generales
- [ ] Navbar arriba con el logo
- [ ] Footer abajo
- [ ] Botón flotante de WhatsApp en esquina inferior derecha
- [ ] Botón de WhatsApp usa el teléfono del nutricionista
- [ ] Todo es responsive (mobile, tablet, desktop)

### 4. Casos de Borde

#### Nutricionista sin foto
```
→ Debe mostrar iniciales en un círculo blanco
```

#### Nutricionista sin especialidades
```
→ No debe mostrar la sección de badges
```

#### Nutricionista sin matrícula
```
→ No debe mostrar el texto de matrícula
```

#### Nutricionista sin teléfono
```
→ No debe mostrar el botón de WhatsApp
→ No debe mostrar link de contacto en la sección final
```

#### Nutricionista no existe
```
URL: /nutricionista/9999
→ Debe mostrar pantalla de error
→ Botón para volver a la lista de nutricionistas
```

#### Nutricionista sin turnero público habilitado
```
→ API devuelve 404
→ Debe mostrar mensaje de error apropiado
```

### 5. Pruebas de Navegación

#### Desde la lista al landing
```
/nutricionistas-disponibles
→ Click en nutricionista
→ /nutricionista/:id
→ Debe cargar landing completo
```

#### Del landing al turnero
```
/nutricionista/:id
→ Click "Reservar turno"
→ /nutricionista/:id/turno
→ Debe abrir el turnero público
```

#### WhatsApp
```
Click en botón flotante
→ Debe abrir WhatsApp Web con número correcto
→ Mensaje pre-escrito
```

### 6. Pruebas Responsive

#### Desktop (1920px)
```
→ Layout horizontal en Hero
→ Grid de 3 columnas en servicios
→ Grid de 2 columnas en beneficios
→ Grid de 3 columnas en testimonios
```

#### Tablet (768px)
```
→ Layout vertical o 2 columnas
→ Todo sigue siendo legible
```

#### Mobile (375px)
```
→ Layout vertical en todo
→ Hero apilado
→ Una columna en servicios, beneficios, testimonios
→ Botones ocupan todo el ancho
```

## 🐛 Posibles Problemas y Soluciones

### Problema: No carga la información del nutricionista
**Causa:** API no responde
**Solución:** 
```bash
# Verificar que el backend esté corriendo
python manage.py runserver

# Verificar endpoint en el navegador
http://localhost:8000/api/public/nutricionistas/1/
```

### Problema: Iconos no aparecen
**Causa:** react-icons no instalado
**Solución:**
```bash
npm install react-icons
```

### Problema: Estilos rotos
**Causa:** Tailwind no compilando
**Solución:**
```bash
# Reinstalar dependencias
npm install

# Reconstruir
npm run dev
```

### Problema: Botón de WhatsApp no funciona
**Causa:** Número de teléfono mal formateado
**Solución:** Verificar que el nutricionista tenga un teléfono válido en la BD

### Problema: Ruta 404
**Causa:** Routes.jsx no configurado correctamente
**Solución:** Verificar que la ruta esté en Routes.jsx:
```jsx
<Route path="/nutricionista/:nutricionistaId" element={<LandingNutricionista />} />
```

## 📊 Datos de Prueba Sugeridos

### Crear nutricionista de prueba en la BD

```python
# manage.py shell
from apps.user.models import User

# Nutricionista con todos los datos
nutri = User.objects.create_user(
    email='dra.gonzalez@example.com',
    password='test1234',
    nombre='María',
    apellido='González',
    user_type='nutricionista'
)

# Agregar perfil de nutricionista
from apps.user.models import NutricionistaProfile
profile = NutricionistaProfile.objects.create(
    user=nutri,
    matricula='MN 12345',
    descripcion='Nutricionista especializada en nutrición deportiva y pediátrica. Con más de 10 años de experiencia ayudando a personas a transformar su salud.',
    telefono='5493704209675',
    turnero_publico_habilitado=True
)

# Agregar especialidades
profile.especialidades = ['Nutrición Deportiva', 'Nutrición Pediátrica', 'Diabetes']
profile.save()
```

## 🎯 Checklist Final

- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] Al menos 1 nutricionista con turnero público habilitado
- [ ] Nutricionista tiene foto, nombre, especialidades, matrícula, descripción
- [ ] Ruta `/nutricionista/:id` funciona
- [ ] Todas las secciones renderizan
- [ ] Botones de navegación funcionan
- [ ] WhatsApp funciona con el teléfono correcto
- [ ] Responsive en mobile/tablet/desktop
- [ ] Manejo de errores funciona (nutricionista inexistente)

## 🚀 Siguiente Paso

Una vez verificado que todo funciona:
1. Crear más nutricionistas de prueba
2. Probar con diferentes combinaciones de datos
3. Comenzar a planificar la FASE 2 (panel de personalización)

---

**Nota:** Este es el estado actual con datos por defecto. En la FASE 2 se implementará el panel de administración para que cada nutricionista pueda personalizar su landing.
