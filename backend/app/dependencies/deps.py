from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from models.models import User
from core.security import verify_access_token
from sqlalchemy.orm import Session
from database.db import get_session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    
    user_id = verify_access_token(token)
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user

def check_admin_role(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="You are not authorized to access this resource",
        )
    return current_user