from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
@app.route('/restaurants/')
def home():
    return render_template('restaurants_list.html')


@app.route('/restaurants/<int:restaurant_id>/menu/')
def menu(restaurant_id):
    return render_template('menu_list.html')


if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)
