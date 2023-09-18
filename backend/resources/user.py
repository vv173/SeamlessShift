import uuid
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import users
from schemas import UserSchema, UserUpdateSchema

blp = Blueprint("Users", __name__, description="Operations on users")


@blp.route("/user")
class UserList(MethodView):
    def get(self):
        return {"users": list(users.values())}

    @blp.arguments(UserSchema)
    def post(self, user_data):
        for user in users.values():
            if user_data["phone"] == user["phone"]:
                abort(
                    400,
                    message="Bad request. The phone number is already in use."
                )
            elif user_data["email"] == user["email"]:
                abort(
                    400,
                    message="Bad request. The e-mail address is already in use."
                )
        user_id = uuid.uuid4().hex
        new_user = {**user_data, "id": user_id}
        users[user_id] = new_user
        return new_user, 201


@blp.route("/user/<string:user_id>")
class User(MethodView):
    def get(self, user_id):
        try:
            return users[user_id], 201
        except KeyError:
            abort(404, message="User not found")

    @blp.arguments(UserUpdateSchema)
    def put(self, user_data, user_id):
        try:
            user = users[user_id]
            if 'phone' or 'email' in user_data:
                for user in users.values():
                    if user_data["phone"] == user["phone"]:
                        abort(
                            400,
                            message="Bad request. The phone number is already in use."
                        )
                    elif user_data["email"] == user["email"]:
                        abort(
                            400,
                            message="Bad request. The e-mail address is already in use."
                        )
            user |= user_data
            return user
        except KeyError:
            abort(404, message="User not found")

    def delete(self, user_id):
        try:
            del users[user_id]
            return {"message": "User deleted"}
        except KeyError:
            abort(404, message="User not found")
