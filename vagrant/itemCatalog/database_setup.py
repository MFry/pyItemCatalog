import sys

from sqlalchemy import Column, ForeignKey, Integer, String, Text

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import relationship

from sqlalchemy import create_engine

Base = declarative_base()


class Restaurant(Base):
    __tablename__ = 'restaurant'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)


class MenuItem(Base):
    __tablename__ = 'menu_item'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)
    course = Column(Text)
    description = Column(Text)
    # TODO: Convert to a better type once its switched to postgreSQL
    price = Column(String(9))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant)


# EOF statements

engine = create_engine('sqlite:///restaurantmenu.db')

Base.metadata.create_all(engine)