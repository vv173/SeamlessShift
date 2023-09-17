from db import db


class FacilityModel(db.Model):
    __tablename__ = "role"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), unique=True, nullable=False)
