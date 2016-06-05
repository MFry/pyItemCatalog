from flask import Flask, render_template, url_for
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import connection_str

app = Flask(__name__)

engine = create_engine(connection_str)
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
@app.route('/restaurants/')
def home():
    restaurants = session.query().all()
    return render_template('restaurants_list.html', restaurants=restaurants)


def new_restaurant():
    return None


def edit_restaurant(restaurant_id):
    return None


def delete_restaurant(restaurant_id):
    return None


@app.route('/restaurants/<int:restaurant_id>/menu/')
def menu(restaurant_id):
    return render_template('menu_list.html')


def new_menu(restaurant_id):
    return None


def update_menu(restaurant_id, menu_id):
    return None


def delete_menu_item(restaurant_id, menu_id):
    return None


if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)
