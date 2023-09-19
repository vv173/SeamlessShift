from flask import Flask
from flask_smorest import Api

from db import db
import models

from resources.user import blp as UserBlueprint


def create_app():
    app = Flask(__name__)

    # Update config for production use
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Seamless Shift API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:password@172.17.0.2/shift_db?charset=utf8mb4"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    api = Api(app)

    # move db creation to the __init__.py
    with app.app_context():
        db.create_all()

    api.register_blueprint(UserBlueprint)

    # if __name__ == '__main__':
    #    app.run()

    return app
