from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required



from heqtor.controllers import (get_all_user)

class Users(Resource):
  @jwt_required
  def get(self):
    user_id = get_jwt_identity()["id"]
    user = get_user(user_id)
    return get_all_user(user_id)