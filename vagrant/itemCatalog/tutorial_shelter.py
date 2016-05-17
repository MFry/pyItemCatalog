from sqlalchemy import Column, ForeignKey, Integer, Text, Date, Enum, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class Shelter(Base):
    __tablename__ = 'shelter'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    address = Column(Text, nullable=False)
    city = Column(Text, nullable=False)
    state = Column(Text, nullable=False)
    zipCode = Column(Integer, nullable=False)
    website = Column(Text)


class Puppy(Base):
    __tablename__ = 'puppy'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    dateOfBirth = Column(Date)
    gender = Column(Enum('male', 'female'))
    weight = Column(Numeric)
    picture = Column(Text)
    shelter_id = Column(Integer, ForeignKey('shelter.id'))
    shelter = relationship(Shelter)


# EOF statements

engine = create_engine('sqlite:///puppyshelter.db')

Base.metadata.create_all(engine)
