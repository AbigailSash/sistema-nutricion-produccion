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
    
    # Intentar varias contraseñas comunes
    passwords_to_test = [
        dni,  # Solo el DNI
        f"{dni}salud",  # DNI + salud
        "admin123",
        "admin",
        "password",
        "12345678",
        f"{dni}admin",
        "nutrisalud",
        "nutrisalud123",
    ]
    
    print("\n🔍 Probando contraseñas comunes...")
    print("=" * 60)
    
    for pwd in passwords_to_test:
        if u.check_password(pwd):
            print(f"\n✅ ¡CONTRASEÑA ENCONTRADA!")
            print("🔑" * 30)
            print(f"   CONTRASEÑA: {pwd}")
            print("🔑" * 30)
            break
    else:
        print("\n❌ No se encontró la contraseña entre las opciones comunes")
        print("\nℹ️  Hash de la contraseña almacenado:")
        print(f"   {u.password[:50]}...")
