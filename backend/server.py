from flask import Flask
from flask_restful import Api, Resource, reqparse #ModuleNotFoundError: No module named 'flask_restful' = pip install flask-restful
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from api.ApiHandler import ApiHandler
 
app = Flask(__name__)
 
CORS(app)
api = Api(app)
 
api.add_resource(ApiHandler, '/flask')
 
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
 
if __name__ == '__main__':
    app.run(debug=True)