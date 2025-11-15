import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.user.models import UserAccount, Administrador

# Buscar usuario admin
u = UserAccount.objects.filter(dni='44464273').first()

if u:
    # Crear perfil de administrador
    admin_profile, created = Administrador.objects.get_or_create(
        user=u,
        defaults={
            'nombre': 'Benjamin',
            'apellido': 'Benitez',
            'telefono': ''
        }
    )
    
    if created:
        print("✅ Perfil de Administrador creado exitosamente")
    else:
        print("ℹ️  El perfil de Administrador ya existía")
    
    print(f"\nDatos del administrador:")
    print(f"  Nombre: {admin_profile.nombre}")
    print(f"  Apellido: {admin_profile.apellido}")
    print(f"  Email: {admin_profile.user.email}")
    print(f"  DNI: {admin_profile.user.dni}")
else:
    print("❌ Usuario no encontrado")
