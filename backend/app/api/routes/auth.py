from fastapi import APIRouter, HTTPException, Depends, Request,Response
from models.models import User
from schemas.schemas import UserCreate, UserResponse, UserLogin
from core.security import hash_password, verify_password , create_access_token, create_refresh_token
from jose import JWTError, jwt
from core.security import REFRESH_SECRET_KEY, ALGORITHM, verify_refresh_token, verify_access_token
from sqlalchemy.orm import Session
from database.db import get_session


router = APIRouter()

@router.post("/signup")
async def signup(registration_data: UserCreate, session: Session = Depends(get_session))-> UserResponse:
  existing_user = session.query(User).filter(User.email == registration_data.email).first()
  if existing_user:
    raise HTTPException(status_code=400, detail="Email already registered")
  new_user = User(
    name = registration_data.name,
    email = registration_data.email,
    role = registration_data.role,
    password = hash_password(registration_data.password)
  )
  try:
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user
  except Exception as e:
    session.rollback()
    raise HTTPException(status_code=500, detail="Registration failed")

@router.post("/login")
async def login(login_data: UserLogin, response: Response, session: Session = Depends(get_session)):
  user = session.query(User).filter(User.email == login_data.email).first()
  if not user or not verify_password(login_data.password, user.password):
    raise HTTPException(status_code=401, detail="Invalid email or password")
  access_token = create_access_token(data={"sub": str(user.id)})
  refresh_token = create_refresh_token(data={"sub": str(user.id)})
  
  response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="none", max_age=7*24*60*60)
  
  return {"accessToken": access_token, "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}}

@router.get("/me", response_model=UserResponse)
async def get_current_user(request: Request, session: Session = Depends(get_session)):
  auth_header = request.headers.get("Authorization")
  if not auth_header:
    raise HTTPException(status_code=401, detail="Authorization header missing")
  token = auth_header.split(" ")[1]
  user_id = verify_access_token(token)
  if user_id is None:
    raise HTTPException(status_code=401, detail="Invalid access token")
  
  user = session.query(User).filter(User.id == user_id).first()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  
  return user

@router.post("/refresh")
async def refresh_token(request: Request, response: Response):
  refresh_token = request.cookies.get("refresh_token")
  if not refresh_token:
    raise HTTPException(status_code=401, detail="Refresh token missing")
  user_id = verify_refresh_token(refresh_token)
  if user_id is None:
    raise HTTPException(status_code=401, detail="Invalid refresh token")
  
  new_access_token = create_access_token(data={"sub": str(user_id)})
  
  return {"accessToken": new_access_token}

@router.post("/logout")
async def logout(response: Response):
  response.delete_cookie(key="refresh_token")
  return {"message": "Logged out successfully"}