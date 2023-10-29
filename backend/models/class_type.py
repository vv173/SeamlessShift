from db import db


class ClassTypeModel(db.Model):
    __tablename__ = "class_type"

    id = db.Column('id', db.Integer, primary_key=True)
    type = db.Column('type', db.String(45), unique=True, nullable=False)

    # Relationships
    classes = db.relationship(
        "ClassModel", back_populates="class_type", lazy='dynamic')
