from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///puppyshelter.db')
from tutorial_shelter import Base, Shelter, Puppy

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()

puppies = session.query(Puppy).order_by(Puppy.name.asc())

for pup in puppies:
    print(pup.name)
