# apps/user/utils_image.py
"""
Utilidades para procesamiento de imágenes con Pillow
"""
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


def optimize_profile_picture(image_field, max_size=(800, 800), quality=85):
    """
    Optimiza una imagen de perfil:
    - Redimensiona si es más grande que max_size manteniendo aspecto
    - Convierte a RGB si es necesario
    - Comprime a la calidad especificada
    - Retorna un nuevo InMemoryUploadedFile
    
    Args:
        image_field: ImageField o archivo de imagen
        max_size: tupla (width, height) tamaño máximo
        quality: calidad JPEG (1-100)
    
    Returns:
        InMemoryUploadedFile optimizado o None si hay error
    """
    try:
        # Abrir la imagen
        img = Image.open(image_field)
        
        # Convertir a RGB si es necesario (para PNGs con transparencia)
        if img.mode != 'RGB':
            # Crear un fondo blanco para imágenes con transparencia
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Redimensionar manteniendo el aspecto si excede max_size
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Guardar en BytesIO
        output = BytesIO()
        img.save(output, format='JPEG', quality=quality, optimize=True)
        output.seek(0)
        
        # Crear nuevo InMemoryUploadedFile
        optimized_file = InMemoryUploadedFile(
            output,
            'ImageField',
            f"{image_field.name.split('.')[0]}.jpg",
            'image/jpeg',
            sys.getsizeof(output),
            None
        )
        
        return optimized_file
        
    except Exception as e:
        print(f"Error optimizando imagen: {str(e)}")
        return None


def create_thumbnail(image_field, size=(200, 200)):
    """
    Crea un thumbnail cuadrado de la imagen
    
    Args:
        image_field: ImageField o archivo de imagen
        size: tupla (width, height) para el thumbnail
    
    Returns:
        InMemoryUploadedFile con el thumbnail o None
    """
    try:
        img = Image.open(image_field)
        
        # Convertir a RGB si es necesario
        if img.mode != 'RGB':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Calcular el crop para hacer la imagen cuadrada
        width, height = img.size
        if width > height:
            left = (width - height) / 2
            top = 0
            right = (width + height) / 2
            bottom = height
        else:
            left = 0
            top = (height - width) / 2
            right = width
            bottom = (height + width) / 2
        
        # Crop y resize
        img = img.crop((left, top, right, bottom))
        img.thumbnail(size, Image.Resampling.LANCZOS)
        
        # Guardar
        output = BytesIO()
        img.save(output, format='JPEG', quality=90, optimize=True)
        output.seek(0)
        
        thumbnail_file = InMemoryUploadedFile(
            output,
            'ImageField',
            f"{image_field.name.split('.')[0]}_thumb.jpg",
            'image/jpeg',
            sys.getsizeof(output),
            None
        )
        
        return thumbnail_file
        
    except Exception as e:
        print(f"Error creando thumbnail: {str(e)}")
        return None


def validate_image(image_field, max_size_mb=5):
    """
    Valida que una imagen cumpla los requisitos
    
    Args:
        image_field: archivo de imagen
        max_size_mb: tamaño máximo en MB
    
    Returns:
        tuple (bool, str): (es_valida, mensaje_error)
    """
    # Validar tamaño
    max_size_bytes = max_size_mb * 1024 * 1024
    if image_field.size > max_size_bytes:
        return False, f"La imagen no debe superar {max_size_mb}MB"
    
    # Validar formato
    try:
        img = Image.open(image_field)
        img.verify()  # Verifica que sea una imagen válida
        
        # Formatos permitidos
        allowed_formats = ['JPEG', 'JPG', 'PNG', 'GIF', 'WEBP']
        if img.format not in allowed_formats:
            return False, f"Formato no permitido. Use: {', '.join(allowed_formats)}"
        
        # Reset del puntero después de verify()
        image_field.seek(0)
        
        return True, ""
        
    except Exception as e:
        return False, f"Archivo de imagen inválido: {str(e)}"
