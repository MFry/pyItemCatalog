from flask import Flask


app = Flask(__name__)

@app.route('/')
def home():
    return 'Home page'


if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)