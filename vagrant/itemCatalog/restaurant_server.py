from flask import Flask, render_template, url_for, jsonify, redirect, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Restaurant, Menu, connection_str

app = Flask(__name__)

engine = create_engine(connection_str)
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
@app.route('/restaurants/')
def home():
    restaurants = session.query(Restaurant).all()
    return render_template('restaurants_list.html',
                           restaurants=restaurants,
                           edit_func=edit_restaurant)


def new_restaurant():
    return None


@app.route('/restaurants/<int:restaurant_id>/edit/')
def edit_restaurant(restaurant_id):
    return None


@app.route('/restaurants/<int:restaurant_id>/menu/<int:menu_id>/json/')
def restaurant_menu_item_JSON(restaurant_id, menu_id):
    item = session.query(Menu).filter_by(restaurant_id=restaurant_id, id=menu_id).one()
    return jsonify(MenuItem=item.serialize)


def delete_restaurant(restaurant_id):
    return None


@app.route('/restaurants/<int:restaurant_id>/menu/', methods=['POST', 'GET'])
def menu(restaurant_id):
    menu_items = session.query(Menu).filter_by(restaurant_id=restaurant_id).all()
    restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
    return render_template('menu_list.html', menu=menu_items, restaurant=restaurant)


@app.route('/restaurants/<int:restaurant_id>/menu/add/', methods=['POST'])
def new_menu_item(restaurant_id):
    if request.method == 'POST':
        m = Menu(name=request.form['name'],
                 description=request.form['desc'],
                 course=request.form['course'],
                 price=request.form['price'],
                 restaurant_id=restaurant_id)
        session.add(m)
        session.commit()
    return redirect(url_for('menu', restaurant_id=restaurant_id))


@app.route('/restaurants/<int:restaurant_id>/menu/edit/', methods=['POST'])
def edit_menu_item(restaurant_id):
    if request.method == 'POST':
        menu_id = request.form['menu_id']
        name = request.form['name']
        item = session.query(Menu).filter_by(id=menu_id, restaurant_id=restaurant_id).one()
        item.name = name
        session.add(item)
        session.commit()
    return redirect(url_for('menu', restaurant_id=restaurant_id))


@app.route('/restaurants/<int:restaurant_id>/menu/<int:menu_id>/delete/', methods=['GET', 'POST'])
def delete_menu_item(restaurant_id, menu_id):
    if request.method == 'POST' or request.method == 'GET':
        m = session.query(Menu).filter_by(restaurant_id=restaurant_id, id=menu_id).one()
        session.delete(m)
        session.commit()
    return redirect(url_for('menu', restaurant_id=restaurant_id))


if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)
