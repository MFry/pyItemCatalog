import sys

from sqlalchemy import Column, ForeignKey, Integer, String

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import relationships

from sqlalchemy import create_engine

Base = declarative_base()


class Restaurant(Base):
    pass


class MenuItem(Base):
    pass


# EOF statements

engine = create_engine('sqlite:///restaurantmenu.db')

Base.metadata.create_all(engine)