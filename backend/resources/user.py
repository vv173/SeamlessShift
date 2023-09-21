import uuid
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from passlib.hash import pbkdf2_sha256

from db import db
from models import UserModel
from schemas import PlainUserSchema, UserSchema, UserUpdateSchema

blp = Blueprint("Users", __name__, description="Operations on users")


@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(PlainUserSchema)
    def post(self, user_data):
        user = UserModel.query.filter(
            UserModel.email == user_data["email"]
        ).first()

        if user and user.password == user_data["password"]:
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}

        abort(401, message="Invalid credentials")


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
@blp.route("/user/<int:user_id>")
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
