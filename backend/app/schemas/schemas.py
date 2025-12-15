from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from core.enums import UserRole, TaskStatus, TaskPriority

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[UserRole] = UserRole.USER

class UserCreate(UserBase):
    # password: str = Field(..., min_length=6, description="Password must be at least 6 characters long")
    password: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime



class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus
    priority: TaskPriority
    due_date: Optional[datetime] = None
    
class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    created_by: int
    
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskStatusUpdate(BaseModel):
    status: TaskStatus

# class UserUpdate(BaseModel):
#     username: Optional[str] = None
#     email: Optional[str] = None
#     password: Optional[str] = None
#     role: Optional[str] = None