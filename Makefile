# Makefile Minimalista para Guardian Core
.PHONY: help test lint deadcode quality deps

help:
	@echo "🚀 Comandos disponibles:"
	@echo "  make test      - Ejecutar tests con coverage"
	@echo "  make lint      - Encontrar imports no usados"
	@echo "  make deadcode  - Encontrar código muerto"
	@echo "  make quality   - Calidad completa"
	@echo "  make deps      - Instalar dependencias testing"

# 📦 DEPENDENCIAS
deps:
	@echo "📦 Instalando dependencias..."
	cd guardian_core && pip install -r requirements.txt

# 🧪 TESTING
test:
	@echo "🧪 Ejecutando tests..."
	cd guardian_core && python -m pytest apps/ --cov=apps --cov-report=term-missing -v

test-watch:
	@echo "👀 Tests en modo watch..."
	cd guardian_core && python -m pytest apps/ -v --lf

test-coverage:
	@echo "📊 Tests con reporte HTML..."
	cd guardian_core && python -m pytest apps/ --cov=apps --cov-report=html

# 🔍 CODE QUALITY
lint:
	@echo "🔍 Buscando imports no usados..."
	cd guardian_core && python -m flake8 apps/ guardian_core/ --select=F401 --exclude=migrations

deadcode:
	@echo "🧹 Buscando código muerto..."
	cd guardian_core && python -m vulture apps/ guardian_core/ --min-confidence=80 --exclude="*migrations*"

# 🎯 COMANDO COMPLETO
quality: lint deadcode test
	@echo "✅ Calidad completa verificada!"