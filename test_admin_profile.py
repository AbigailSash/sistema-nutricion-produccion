import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.user.models import UserAccount, Administrador

# Verificar perfil de administrador
admin_user = UserAccount.objects.filter(dni='44464273').first()

if admin_user:
    print(f"\n✅ Usuario encontrado:")
    print(f"   DNI: {admin_user.dni}")
    print(f"   Email: {admin_user.email}")
    print(f"   is_staff: {admin_user.is_staff}")
    print(f"   is_superuser: {admin_user.is_superuser}")
    
    # Verificar perfil de administrador
    if hasattr(admin_user, 'administrador'):
        admin_profile = admin_user.administrador
        print(f"\n✅ Perfil de Administrador encontrado:")
        print(f"   Nombre: {admin_profile.nombre}")
        print(f"   Apellido: {admin_profile.apellido}")
        print(f"   Nombre completo: {admin_profile.full_name}")
        print(f"   Teléfono: {admin_profile.telefono or 'No especificado'}")
        print(f"   Foto de perfil: {admin_profile.foto_perfil or 'No tiene'}")
    else:
        print("\n❌ No tiene perfil de Administrador asociado")
else:
    print("\n❌ Usuario no encontrado")
