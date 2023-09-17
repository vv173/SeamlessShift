import uuid
from flask import Flask, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import users, classes

blp = Blueprint("Users", __name__, description="Operations on users")


@blp.route("/user")
class UserList(MethodView):
    def get(self):
        return {"users": list(users.values())}

    def post(self):
        user_data = request.get_json()
        if "name" not in user_data:
            abort(
                400,
                message="Bad request. Ensure 'name' is included in the JSON payload."
            )
        for user in users:
            if user_data["name"] == user["name"]:
                abort(
                    400,
                    message="Bad request. User already exists."
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

    def delete(self, user_id):
        try:
            del users[user_id]
            return {"message": "User deleted"}
        except KeyError:
            abort(404, message="User not found")
