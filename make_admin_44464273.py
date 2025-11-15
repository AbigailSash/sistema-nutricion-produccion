import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.user.models import UserAccount

# Buscar usuario con DNI 44464273
dni = '44464273'
u = UserAccount.objects.filter(dni=dni).first()

if not u:
    print(f"❌ Usuario con DNI {dni} no encontrado")
else:
    print("=" * 60)
    print(f"✅ Usuario encontrado:")
    print(f"   DNI: {u.dni}")
    print(f"   Email: {u.email}")
    print(f"   Es staff: {u.is_staff}")
    print(f"   Es superuser: {u.is_superuser}")
    print(f"   Rol actual: {u.rol if hasattr(u, 'rol') else 'No definido'}")
    
    print("\n" + "=" * 60)
    print("🔧 Actualizando permisos a ADMINISTRADOR...")
    
    # Actualizar a administrador
    u.is_staff = True
    u.is_superuser = True
    if hasattr(u, 'rol'):
        u.rol = 'admin'
    u.save()
    
    print("✅ Usuario actualizado correctamente")
    print("\n" + "=" * 60)
    print(f"   DNI: {u.dni}")
    print(f"   Email: {u.email}")
    print(f"   Es staff: {u.is_staff}")
    print(f"   Es superuser: {u.is_superuser}")
    print(f"   Rol: {u.rol if hasattr(u, 'rol') else 'N/A'}")
    
    print("\n" + "🔑" * 30)
    print(f"   CREDENCIALES DE ACCESO:")
    print(f"   Email: {u.email}")
    print(f"   Contraseña: {dni}salud")
    print(f"   Panel: /panel/admin")
    print("🔑" * 30)
