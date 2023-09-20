import uuid
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import UserModel
from schemas import UserSchema, UserUpdateSchema

blp = Blueprint("Users", __name__, description="Operations on users")


@blp.route("/user")
class UserList(MethodView):
    @blp.response(200, UserSchema(many=True))
    def get(self):
        return UserModel.query.all()

    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        user = UserModel(**user_data)
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            abort(
                400, message="The phone number or email address you provided already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the user")
        return user, 201

# Bad data exception?
@blp.route("/user/<string:user_id>")
class User(MethodView):
    @blp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user

    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get_or_404(user_id)
        for key, value in user_data.items():
            setattr(user, key, value)
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            abort(
                400, message="The phone number or email address you provided already exists.")
        return user

    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted"}
