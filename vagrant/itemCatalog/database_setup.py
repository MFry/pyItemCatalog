from sqlalchemy import Column, Text, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()

connection_str = 'postgresql://vagrant:vagrant@locahost/restaurant_menu'


class Restaurant(Base):
    __tablename__ = 'restaurant'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)


engine = create_engine(connection_str)

Base.metadata.create_all(engine)
