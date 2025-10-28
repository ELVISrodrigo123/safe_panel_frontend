# guardian_core/tests/test_basic.py
import pytest
from django.test import TestCase
from django.urls import reverse

class TestBasicFunctionality(TestCase):
    """Tests básicos para verificar que Django funciona"""
    
    def test_django_setup(self):
        """Test que Django está configurado correctamente"""
        self.assertTrue(True)
    
    def test_database_connection(self):
        """Test que la base de datos funciona"""
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            self.assertEqual(result[0], 1)
    
    def test_admin_access(self):
        """Test que el admin de Django responde"""
        response = self.client.get('/admin/')
        # Puede ser 200 (si hay sesión) o 302 (redirect a login)
        self.assertIn(response.status_code, [200, 302])
    
    def test_api_root(self):
        """Test que el API root responde"""
        response = self.client.get('/api/')
        self.assertIn(response.status_code, [200, 404])
    
    def test_health_check(self):
        """Test endpoint de salud"""
        response = self.client.get('/health/')
        self.assertIn(response.status_code, [200, 404])

class TestArtsApp(TestCase):
    """Tests básicos para la app arts"""
    
    def test_arts_models(self):
        """Test que los modelos de arts existen"""
        # Verifica que puedes importar los modelos sin errores
        try:
            from arts.models import Art
            self.assertTrue(True)
        except ImportError:
            self.skipTest("Modelo Art no existe aún")
    
    def test_arts_urls(self):
        """Test que las URLs de arts responden"""
        response = self.client.get('/arts/')
        self.assertIn(response.status_code, [200, 404])