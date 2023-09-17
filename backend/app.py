from flask import Flask
from flask_smorest import Api

from resources.user import blp as UserBlueprint

app = Flask(__name__)

# Update config for production use
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "Seamless Shift API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

api = Api(app)


api.register_blueprint(UserBlueprint)


# if __name__ == '__main__':
#    app.run()
