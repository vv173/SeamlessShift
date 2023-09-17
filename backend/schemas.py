from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Str(dump_only=True)
    password = fields.Str(required=True)
    name = fields.Str(required=True)
    surname = fields.Str(required=True)
    email = fields.Str(required=True)
    phone = fields.Str(required=True)
    facility_id = fields.Int(required=True)
    role_id = fields.Int(required=True)
    deleted = fields.Bool(required=True)
    password_change_required = fields.Bool(required=True)


class UserUpdateSchema(Schema):
    password = fields.Str()
    name = fields.Str()
    surname = fields.Str()
    email = fields.Str()
    phone = fields.Str()
    facility_id = fields.Int()
    role_id = fields.Int()
    deleted = fields.Bool()
    password_change_required = fields.Bool()
