from fastapi import APIRouter, HTTPException , Depends
from database.db import get_session
from sqlalchemy.orm import Session
from models.models import Task
from schemas.schemas import TaskResponse
from typing import List
from models.models import User
from dependencies.deps import get_current_user, check_admin_role

router = APIRouter()

@router.get("/all_tasks")
async def get_all_tasks(id: int = None, status: str = None, current_user: User = Depends(check_admin_role), session: Session = Depends(get_session)):
  query = session.query(Task)
  if id is not None:
    query = query.filter(Task.created_by == id)
    if not query.first():
      raise HTTPException(status_code=404, detail="User not found")
  if status is not None:
    query = query.filter(Task.status == status)
    if not query.first():
      raise HTTPException(status_code=404, detail="No tasks found with the specified status")
  tasks = query.all()
  return tasks

@router.get("/all_users")
async def get_all_users(current_user: User = Depends(check_admin_role), session: Session = Depends(get_session)):
  users = session.query(User).all()
  return users

@router.get("/user/{user_id}")
async def get_user(user_id: int, current_user: User = Depends(check_admin_role), session: Session = Depends(get_session)):
  user = session.query(User).filter(User.id == user_id).first()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  return user

@router.get("/user/{user_id}/tasks")
async def get_user_tasks_as_admin(
    user_id: int,
    admin: User = Depends(check_admin_role),
    session: Session = Depends(get_session)
):
    tasks = session.query(Task).filter(Task.created_by == user_id).all()

    if not tasks:
      raise HTTPException(status_code=404, detail="No tasks found for this user")

    return tasks
