from sqlalchemy import create_engine, MetaData
# from sqlalchemy.
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from core.config import conncention_string


class Base(DeclarativeBase):
  pass


engine = create_engine(conncention_string, echo=False)

Session = sessionmaker(bind=engine , autocommit=False, autoflush=False)


def get_session():
  session = Session()
  try:
    yield session
  finally:
    session.close()
    
# def get_db():
#   db = Session()
#   try:
#     yield db
#   finally:
#     db.close()