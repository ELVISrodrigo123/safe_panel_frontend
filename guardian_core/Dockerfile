# guardian_core/Dockerfile
FROM python:3.11-slim AS development

WORKDIR /guardian_core

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM python:3.11-slim AS production

WORKDIR /guardian_core

RUN apt-get update && apt-get install -y \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

RUN groupadd -r -g 1001 appuser && \
    useradd -r -u 1001 -g 1001 -d /guardian_core appuser

RUN mkdir -p /guardian_core/staticfiles /guardian_core/media /guardian_core/logs && \
    chown -R 1001:1001 /guardian_core

COPY --chown=1001:1001 requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=1001:1001 . .

USER root

USER 1001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "guardian_core.wsgi:application"]
