import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.user.models import UserAccount

u = UserAccount.objects.filter(dni='44464273').first()

if u:
    print("=" * 60)
    print(f"Usuario: {u.email}")
    print(f"first_name: '{u.first_name if hasattr(u, 'first_name') else 'NO EXISTE'}'")
    print(f"last_name: '{u.last_name if hasattr(u, 'last_name') else 'NO EXISTE'}'")
    print(f"foto_perfil: '{u.foto_perfil if hasattr(u, 'foto_perfil') else 'NO EXISTE'}'")
    print("\nTodos los campos del modelo:")
    print([f.name for f in u._meta.fields])
