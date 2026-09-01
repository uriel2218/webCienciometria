from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, members, events
from app.db.session import engine, Base

# Importar todos los modelos para que Base.metadata.create_all los detecte
from app.models.user import User
from app.models.api_key import ApiKey
from app.models.content import Member, Publication, Event

# Crea las tablas si no existen (en prod se usa Alembic para migraciones)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="C4 API",
    description="API de Administración de Cienciometría y Complejidad (C3)",
    version="1.0.0"
)

# Configuración estricta de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:80",
        "http://localhost:4200" # Frontend de Angular en modo dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(members.router, prefix="/api/v1/members", tags=["Miembros"])
app.include_router(events.router, prefix="/api/v1/events", tags=["Eventos"])

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "message": "C4 API is running"}

