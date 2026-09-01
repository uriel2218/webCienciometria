from pydantic import BaseModel
from typing import Optional
from datetime import date
from enum import Enum

class PublicationTypeEnum(str, Enum):
    ARTICULO = "Artículo"
    REPORTE = "Reporte"
    LIBRO = "Libro"
    CONFERENCIA = "Conferencia"

# --- Miembros ---
class MemberBase(BaseModel):
    full_name: str
    role: Optional[str] = None
    institution: Optional[str] = None
    bio: Optional[str] = None
    is_active: bool = True

class MemberCreate(MemberBase):
    pass

class MemberResponse(MemberBase):
    id: int

    class Config:
        from_attributes = True

# --- Eventos ---
class EventBase(BaseModel):
    name: str
    event_date: date
    location: Optional[str] = None
    link: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True

# --- Publicaciones ---
class PublicationBase(BaseModel):
    title: str
    pub_type: PublicationTypeEnum
    authors: Optional[str] = None
    year: Optional[int] = None
    doi_url: Optional[str] = None

class PublicationCreate(PublicationBase):
    pass

class PublicationResponse(PublicationBase):
    id: int

    class Config:
        from_attributes = True

