from flask import Blueprint
from flask_restful import Api

from heqtor.core import db, Session
from heqtor.web import app

from .me import Me, MeCompany, MeCompanyUsers
from .companies import Companies
from .users import Users

api_bp = Blueprint("api", __name__)
api = Api(api_bp)

api.add_resource(Me, "/me")
api.add_resource(MeCompany, "/me/company")
api.add_resource(Users, "/users")
api.add_resource(Companies, "/companies")
api.add_resource(Companies, "/me/company/users")



app.register_blueprint(api_bp, url_prefix="/api")