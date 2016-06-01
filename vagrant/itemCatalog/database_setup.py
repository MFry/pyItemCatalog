from sqlalchemy import Column, Text, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

connection_str = 'postgresql://vagrant:vagrant@localhost/restaurant_menu'


class Restaurant(Base):
    __tablename__ = 'restaurant'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)


class Menu(Base):
    __tablename__ = 'menu'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)
    course = Column(Text)
    description = Column(Text)
    price = Column(String(7))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant)


engine = create_engine(connection_str)

Base.metadata.create_all(engine)
