from enum import Enum

class UserRole(str, Enum):
  USER = "user"
  ADMIN = "admin"

class TaskStatus(str, Enum):
  PENDING = "pending"
  IN_PROGRESS = "in_progress"
  COMPLETED = "completed"
  
class TaskPriority(str, Enum):
  LOW = "low"
  MEDIUM = "medium"
  HIGH = "high"