from sqlalchemy import Integer, String, Column, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from core.enums import UserRole, TaskStatus, TaskPriority
from database.db import Base

class User(Base):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  name = Column(String(50), nullable=False)
  email = Column(String(100), unique=True, nullable=False)
  password = Column(String(100), nullable=False)
  role = Column(Enum(UserRole), nullable=False, default=UserRole.USER)
  created_at = Column(DateTime, default=datetime.utcnow)

  tasks = relationship("Task", back_populates="creator")

class Task(Base):
  __tablename__ = 'tasks'

  id = Column(Integer, primary_key=True)
  title = Column(String(100), nullable=False)
  description = Column(String(255))
  status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.PENDING)
  priority = Column(Enum(TaskPriority), nullable=False, default=TaskPriority.LOW)
  due_date = Column(DateTime)
  created_at = Column(DateTime, default=datetime.utcnow)
  created_by = Column(Integer, ForeignKey('users.id'))

  creator = relationship("User", back_populates="tasks")

