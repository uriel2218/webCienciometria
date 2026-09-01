import os
import sys

# Añadir el path padre para poder importar app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal, engine, Base
from app.models.user import User, Role
from app.core.security import get_password_hash

def init_db():
    # Crear tablas
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Verificar si ya existe el usuario admin
        admin_email = "ricardo.arencibia@c3.unam.mx"
        user = db.query(User).filter(User.email == admin_email).first()
        
        if not user:
            print("Creando usuario ADMIN inicial...")
            admin_user = User(
                email=admin_email,
                hashed_password=get_password_hash("admin1234"), # Cambiar en primer inicio
                full_name="Ricardo Arencibia Jorge",
                role=Role.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print(f"Usuario creado exitosamente: {admin_email} | Pass: admin1234")
        else:
            print("El usuario ADMIN ya existe.")
            
    finally:
        db.close()

if __name__ == "__main__":
    init_db()

