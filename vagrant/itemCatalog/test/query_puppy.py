from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///puppyshelter.db')
from test.tutorial_shelter import Base, Puppy
from datetime import datetime, timedelta

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()

puppies = session.query(Puppy).order_by(Puppy.name.asc())
for pup in puppies:
    print(pup.name)
print()
young_puppies = session.query(Puppy).filter(datetime.now() - timedelta(weeks=6*4) <= Puppy.dateOfBirth).order_by(Puppy.dateOfBirth.asc())
for pup in young_puppies:
    print(pup.name, pup.dateOfBirth)
print()
weight_puppies = session.query(Puppy).order_by(Puppy.weight.asc())
for pup in weight_puppies:
    print(pup.name, pup.weight)
print()
shelters = session.query(func.count(Puppy.shelter_id), Puppy.shelter_id).group_by(Puppy.shelter_id).all()
print(shelters)
for shelter in shelters:
    print(shelter.shelter_id, shelter[0])
