from db import db


class UserModel(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(128), unique=False, nullable=False)
    name = db.Column(db.String(45), unique=False, nullable=False)
    surname = db.Column(db.String(45), unique=False, nullable=False)
    email = db.Column(db.String(90), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)

    # Foreign keys
    facility_id = db.Column(db.Integer, db.ForeignKey(
        "facility.id"), unique=False, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey(
        "role.id"), unique=False, primary_key=True)

    # Relationships
    facility = db.relationship("FacilityModel", back_populates="users")
    role = db.relationship("RoleModel", back_populates="users")
