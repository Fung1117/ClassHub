#C:\flask_dev\flaskreact\api\ApiHandler.py
from flask_restful import Api, Resource
 
class ApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler ApiHandler.py"
      }