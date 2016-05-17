from sqlalchemy import Column, ForeignKey, Integer, Text, Date, Enum, Numeric

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import relationship

from sqlalchemy import create_engine

Base = declarative_base()


class Gender(Enum):
    male = 'male'
    female = 'female'


class Shelter(Base):
    __tablename__ = 'shelter'
    name = Column(Text, nullable=False)
    address = Column(Text, nullable=False)
    city = Column(Text, nullable=False)
    state = Column(Text, nullable=False)
    zipCode = Column(Integer, nullable=False)
    website = Column(Text)
    id = Column(Integer, primary_key=True)


class Puppy(Base):
    __tablename__ = 'puppy'
    name = Column(Text, nullable=False)
    birth_date = Column(Date)
    gender = Column(Gender)
    weight = Column(Numeric)
    shelter_id = Column(Integer, ForeignKey('shelter.id'))
    shelter = relationship(Shelter)


# EOF statements

engine = create_engine('sqlite:///shelter.db')

Base.metadata.create_all(engine)
