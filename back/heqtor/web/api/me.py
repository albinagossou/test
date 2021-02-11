from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

from heqtor.controllers import get_user, get_company_byId, update_user_data, update_company_data, create_company


class Me(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()["id"]
        return get_user(user_id)

    @jwt_required
    #route to update user profile
    def post(self):
        try:
            user_id = get_jwt_identity()["id"]
            phone = request.json["phone"]
            return update_user_data(user_id, phone)
        except :
            return False
        # TODO
        # hint : data from post request is located in flask object request.json
        # pass

# TODO
    # get, post, delete
    # pass

class MeCompany(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        return get_company_byId(user.get("company_id"))

    @jwt_required
    def post(self):
        made_by_id = get_jwt_identity()["id"]
        name = request.json["name"]
        siren = request.json["siren"]
        email = request.json["email"]
        phone = request.json["phone"]
        return create_company(name, siren, email, phone, made_by_id)

    @jwt_required
    def put(self):
        company_id = get_jwt_identity()["company_id"]
        phone = request.json["phone"]
        return update_company_data(company_id, phone)

    @jwt_required
    def delete(self):
        try : 
            company_id = get_jwt_identity()["id"]
            return delete_company(company_id)
        except :
            return False
  
    