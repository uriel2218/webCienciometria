from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.content import Event
from app.schemas.content import EventCreate, EventResponse
from app.api.dependencies import get_current_user, require_admin

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
def get_all_events(db: Session = Depends(get_db)):
    """Ruta PÚBLICA para leer eventos."""
    return db.query(Event).order_by(Event.event_date.desc()).all()

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event_in: EventCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para agregar un evento."""
    new_event = Event(**event_in.model_dump())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para eliminar un evento."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    db.delete(event)
    db.commit()
    return None

