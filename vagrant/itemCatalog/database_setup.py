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
    # Reference: http://stackoverflow.com/a/5034070/1771644
    menu = relationship('Menu', cascade='all, delete', backref='restaurant')


class Menu(Base):
    __tablename__ = 'menu'
    name = Column(Text, nullable=False)
    id = Column(Integer, primary_key=True)
    course = Column(Text)
    description = Column(Text)
    price = Column(String(7))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'course': self.course,
            'description': self.description,
            'price': self.price,
        }


engine = create_engine(connection_str)

Base.metadata.create_all(engine)
