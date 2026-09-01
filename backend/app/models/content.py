from sqlalchemy import Column, Integer, String, Date, Text, Boolean, Enum
from app.db.session import Base
import enum

class PublicationType(str, enum.Enum):
    ARTICULO = "Artículo"
    REPORTE = "Reporte"
    LIBRO = "Libro"
    CONFERENCIA = "Conferencia"

class Member(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    role = Column(String(255))
    institution = Column(String(255))
    bio = Column(Text)
    is_active = Column(Boolean, default=True)

class Publication(Base):
    __tablename__ = "publications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    pub_type = Column(Enum(PublicationType), nullable=False)
    authors = Column(String(500))
    year = Column(Integer)
    doi_url = Column(String(500))

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False)
    event_date = Column(Date, nullable=False)
    location = Column(String(500))
    link = Column(String(500))

