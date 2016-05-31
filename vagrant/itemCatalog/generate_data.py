from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, connection_str

engine = create_engine(connection_str)

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

