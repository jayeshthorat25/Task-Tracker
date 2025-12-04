from fastapi import APIRouter, HTTPException, Depends
from database.db import get_session
from sqlalchemy.orm import Session
from models.models import Task, User
from schemas.schemas import TaskResponse, TaskCreate, TaskStatusUpdate
from typing import List
from dependencies.deps import get_current_user

router = APIRouter()

@router.get("/tasks")
async def get_user_tasks(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
  user_tasks = session.query(Task).filter(Task.created_by == current_user.id).all()
  return user_tasks

@router.get("/tasks/{task_id}")
async def get_task_by_id(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> TaskResponse:
  task = session.query(Task).filter(Task.id == task_id).first()
  if not task:
    raise HTTPException(status_code=404, detail="Task not found")
  return task

@router.post("/tasks")
async def create_user_task(task: TaskCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> TaskResponse:
  new_task = Task(
    title=task.title,
    description=task.description,
    status=task.status,
    priority=task.priority,
    due_date=task.due_date,
    created_by=current_user.id
  )
  session.add(new_task)
  session.commit()
  session.refresh(new_task)
  return new_task

@router.put("/tasks/{task_id}")
async def update_user_task(task_id: int, task_update: TaskCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> TaskResponse:
  task = session.query(Task).filter(Task.id == task_id, Task.created_by == current_user.id).first()
  if not task:
    raise HTTPException(status_code=404, detail="Task not found")
  task.title = task_update.title
  task.description = task_update.description
  task.status = task_update.status
  task.priority = task_update.priority
  task.due_date = task_update.due_date
  session.commit()
  session.refresh(task)
  return task

@router.delete("/tasks/{task_id}")
async def delete_user_task(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
  task = session.query(Task).filter(Task.id == task_id, Task.created_by == current_user.id).first()
  if not task:
    raise HTTPException(status_code=404, detail="Task not found")
  session.delete(task)
  session.commit()
  return {"message": "Task deleted successfully"}

@router.patch("/tasks/{task_id}")
async def update_task_status(task_id: int, status: TaskStatusUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> TaskResponse:
  task = session.query(Task).filter(Task.id == task_id, Task.created_by == current_user.id).first()
  if not task:
    raise HTTPException(status_code=404, detail="Task not found")
  task.status = status.status
  session.commit()
  session.refresh(task)
  return task