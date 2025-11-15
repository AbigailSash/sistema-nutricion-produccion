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
    # Resetear contraseña
    nueva_password = "admin123"
    u.set_password(nueva_password)
    u.save()
    
    print("=" * 60)
    print("✅ Contraseña reseteada exitosamente")
    print("\n🔑" * 30)
    print(f"   NUEVAS CREDENCIALES:")
    print(f"   Email: {u.email}")
    print(f"   Contraseña: {nueva_password}")
    print(f"   Panel: /panel/admin")
    print("🔑" * 30)
