from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, Menu, connection_str

engine = create_engine(connection_str)

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

session.add(Restaurant(name="Humpy's Great Alaskan Alehouse"))
session.add(Menu(name='Old Fashioned Cheeseburger',
                 course='lunch',
                 description='All beef classic burgers are topped with cheddar cheese,'
                             ' lettuce, tomato, mayo and sliced red onion. Or add a little'
                             ' extra as follows…',
                 price='$9.99',
                 restaurant_id=1
                 ))
session.add(Menu(name='Humpy Burger',
                 course='lunch',
                 description='Topped with melting cheddar,'
                             ' grilled onions and peppers, on a toasted bun '
                             'with guacamole and salsa.',
                 price='$11.99',
                 restaurant_id=1
                 ))
session.add(Menu(name="Humpy's Wings",
                 course='lunch',
                 description='Meaty chicken drumettes tossed in your choice'
                             ' of our three succulent sauces. Served with celery'
                             ' carrot sticks and blue cheese.',
                 price='$11.99',
                 restaurant_id=1
                 ))
session.add(Menu(name="Humpy's Cobb Salad",
                 course='lunch',
                 description='Crisp romaine lettuce, topped with diced chicken breast,'
                             ' avocado, diced tomatoes, bleu cheese crumbles, crumbled'
                             ' bacon and hard boiled egg. Served with ranch style'
                             ' dressing on the side.',
                 price='$12.99',
                 restaurant_id=1
                 ))
session.add(Restaurant(name="McGinley's Pub"))
session.add(Restaurant(name="Bear Tooth Theatrepub"))
session.add(Restaurant(name="49th State Brewing Company"))
session.add(Restaurant(name="Muse Cafe"))
session.add(Restaurant(name="Glacier Brewhouse"))
session.add(Restaurant(name="Orso"))

session.commit()
