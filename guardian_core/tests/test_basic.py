# guardian_core/tests/test_basic.py
import pytest
from django.test import TestCase

# ✅ Tests simples que NO requieren base de datos
def test_basic_math():
    """Test matemático básico - siempre funciona"""
    assert 1 + 1 == 2

def test_django_installed():
    """Test que Django está instalado"""
    try:
        import django
        assert django.VERSION
    except ImportError:
        pytest.fail("Django no está instalado")

def test_settings_loaded():
    """Test que los settings de Django se cargan"""
    try:
        from django.conf import settings
        assert settings.SECRET_KEY is not None
        assert hasattr(settings, 'DATABASES')
    except Exception as e:
        pytest.fail(f"Settings no se cargan: {e}")

# ✅ Tests con database (más simples)
class TestDatabase(TestCase):
    """Tests que requieren base de datos"""
    
    def test_database_connection(self):
        """Test que la base de datos funciona"""
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            assert result[0] == 1
    
    def test_admin_accessible(self):
        """Test que el admin responde"""
        response = self.client.get('/admin/')
        # 302 = redirect to login, 200 = already logged in
        assert response.status_code in [200, 302]