import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.user.models import UserAccount, Nutricionista, Paciente

print("=" * 60)
print("MODELO USERACCOUN T (Usuario base)")
print("=" * 60)
u = UserAccount.objects.first()
if u:
    print("Campos disponibles:")
    print([f.name for f in u._meta.fields])

print("\n" + "=" * 60)
print("MODELO NUTRICIONISTA")
print("=" * 60)
n = Nutricionista.objects.first()
if n:
    print("Campos disponibles:")
    print([f.name for f in n._meta.fields])
    print(f"\nEjemplo de nutricionista:")
    print(f"  nombre: {n.nombre}")
    print(f"  apellido: {n.apellido}")
    print(f"  foto_perfil: {n.foto_perfil}")
    print(f"  user.email: {n.user.email}")

print("\n" + "=" * 60)
print("MODELO PACIENTE")
print("=" * 60)
p = Paciente.objects.first()
if p:
    print("Campos disponibles:")
    print([f.name for f in p._meta.fields])
    print(f"\nEjemplo de paciente:")
    print(f"  nombre: {p.nombre}")
    print(f"  apellido: {p.apellido}")
    print(f"  foto_perfil: {p.foto_perfil if hasattr(p, 'foto_perfil') else 'NO TIENE'}")
    print(f"  user.email: {p.user.email}")
