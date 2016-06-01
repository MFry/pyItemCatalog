from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, connection_str

engine = create_engine(connection_str)

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

session.add(Restaurant(name="Humpy's Great Alaskan Alehouse"))
session.add(Restaurant(name="McGinley's Pub"))
session.add(Restaurant(name="Bear Tooth Theatrepub"))
session.add(Restaurant(name="49th State Brewing Company"))
session.add(Restaurant(name="Muse Cafe"))
session.add(Restaurant(name="Glacier Brewhouse"))
session.add(Restaurant(name="Orso"))
session.commit()
