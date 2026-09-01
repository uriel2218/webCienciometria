from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.content import Member
from app.schemas.content import MemberCreate, MemberResponse
from app.api.dependencies import get_current_user, require_admin

router = APIRouter()

@router.get("/", response_model=List[MemberResponse])
def get_all_members(db: Session = Depends(get_db)):
    """Ruta PÚBLICA para leer miembros (consumida por el sitio web y el dashboard)."""
    return db.query(Member).filter(Member.is_active == True).all()

@router.post("/", response_model=MemberResponse, status_code=status.HTTP_201_CREATED)
def create_member(
    member_in: MemberCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin) # Solo un ADMIN puede crear
):
    """Ruta PRIVADA para agregar un nuevo miembro."""
    new_member = Member(**member_in.model_dump())
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member

@router.put("/{member_id}", response_model=MemberResponse)
def update_member(
    member_id: int, 
    member_in: MemberCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para editar un miembro."""
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Miembro no encontrado")
    
    for key, value in member_in.model_dump().items():
        setattr(member, key, value)
        
    db.commit()
    db.refresh(member)
    return member

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_member(
    member_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """Ruta PRIVADA para eliminar (o desactivar) un miembro."""
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Miembro no encontrado")
    
    db.delete(member)
    db.commit()
    return None

