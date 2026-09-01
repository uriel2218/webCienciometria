from pydantic import BaseModel
from app.models.user import Role

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str | None
    role: Role
    is_active: bool

    class Config:
        from_attributes = True

