from flask import Flask

app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Restaurant, MenuItem

engine = create_engine('sqlite:///restaurantmenu.db')
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
@app.route('/hello')
def hello_world():
    restaurant = session.query(Restaurant).first()
    items = session.query(MenuItem).filter(MenuItem.restaurant_id == restaurant.id)
    output = ''
    for item in items:
        output += item.name
        output += '<br>'
        output += item.price
        output += '<br>'
        output += item.description
        output += '<br>'
        output += '<br>'
    return output


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
