from flask import Flask
# ModuleNotFoundError: No module named 'flask_restful' = pip install flask-restful
from flask_restful import Api, Resource, reqparse
# ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from flask_cors import CORS
from api.ApiHandler import ApiHandler

app = Flask(__name__)

CORS(app)
api = Api(app)

api.add_resource(ApiHandler, '/flask')

@app.route("/")
def hello_world():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler ApiHandler.py"
    }

@app.route('/getCourse')
def getCourse():
    sql = ''
    result = 0
    return {
        'resultStatus': 'SUCCESS',
        'message': result
    }

if __name__ == '__main__':
    app.run(debug=True)
