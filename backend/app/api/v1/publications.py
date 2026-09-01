from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.content import Publication
from app.schemas.content import PublicationCreate, PublicationResponse
from app.api.dependencies import get_current_user, require_admin

router = APIRouter()

@router.get("/", response_model=List[PublicationResponse])
def get_all_publications(db: Session = Depends(get_db)):
    """Ruta PÚBLICA para leer publicaciones científicas."""
    # Podríamos ordenar por año descendente
    return db.query(Publication).order_by(Publication.year.desc()).all()

@router.post("/", response_model=PublicationResponse, status_code=status.HTTP_201_CREATED)
def create_publication(
    pub_in: PublicationCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para agregar una publicación."""
    new_pub = Publication(**pub_in.model_dump())
    db.add(new_pub)
    db.commit()
    db.refresh(new_pub)
    return new_pub

@router.delete("/{pub_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_publication(
    pub_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para eliminar una publicación."""
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    db.delete(pub)
    db.commit()
    return None

