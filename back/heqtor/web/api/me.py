from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

from heqtor.controllers import (
    get_user,
    get_company_by_id,
    update_user_data,
    update_company_data,
    create_company,
    delete_company,
    get_all_users_from_company,
    add_user_to_company,
    
)


class Me(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()["id"]
        return get_user(user_id)

    @jwt_required
    def post(self):
        user_id = get_jwt_identity()["id"]
        phone = request.json.get("phone")
        return update_user_data(user_id, phone)


class MeCompany(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        return get_company_by_id(user.get("company_id"))

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
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        phone = request.json["phone"]
        return update_company_data(user.get("company_id"), phone)

    @jwt_required
    def delete(self):
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        return delete_company(user.get("company_id"))

class MeCompanyUsers(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        return get_all_users_from_company(user.get("company_id"))

    @jwt_required
    def post(self):
        user_id = get_jwt_identity()["id"]
        user = get_user(user_id)
        sec_user = request.json["id"]
        return add_user_to_company(sec_user, user.get("company_id"))        

