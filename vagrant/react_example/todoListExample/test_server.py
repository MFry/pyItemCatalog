from flask import Flask, render_template, url_for, jsonify, redirect, request, flash

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)