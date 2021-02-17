from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required



from heqtor.controllers import (get_all_users)

class Users(Resource):
  @jwt_required
  def get(self):
    return get_all_users()