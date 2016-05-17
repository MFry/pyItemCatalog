from sqlalchemy import Column, ForeignKey, Integer, String, Text

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import relationship

from sqlalchemy import create_engine

Base = declarative_base()


class Shelter(Base):
    name = Column(Text, nullable=False)
    address = Column(Text, nullable=False)
    city = Column(Text, nullable=False)
    state = Column(Text, nullable=False)
    zipCode = Column(Integer, nullable=False)
    website = Column(Text)
    id = Column(Integer, primary_key=True)


# EOF statements

engine = create_engine('sqlite:///shelter.db')

Base.metadata.create_all(engine)
