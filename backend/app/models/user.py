from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.session import Base
import enum

class Role(str, enum.Enum):
    ADMIN = "ADMIN"
    EDITOR = "EDITOR"
    LECTOR = "LECTOR"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(Enum(Role), default=Role.LECTOR, nullable=False)
    is_active = Column(Boolean, default=True)

