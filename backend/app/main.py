from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api import api_router
from database.db import engine, Base
import uvicorn

app = FastAPI()

def create_tables():
  Base.metadata.create_all(bind=engine)
  # print("Tables created successfully")

create_tables()

origins = [
    "http://localhost:5173"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials= True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def greet():
  return {"message": "Hello, World!"}

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
  uvicorn.run("main:app", host="localhost", port=8000, reload=True)