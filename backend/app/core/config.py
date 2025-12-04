import os
from dotenv import load_dotenv

load_dotenv()

user= os.getenv("DB_USERNAME")
host= os.getenv("DB_HOSTNAME")
password= os.getenv("DB_PASSWORD")
port= os.getenv("DB_PORT")
database = os.getenv("DB_DATABASE")

conncention_string = f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"