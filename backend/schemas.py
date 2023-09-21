from marshmallow import Schema, fields


class PlainRoleSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)


class PlainFacilitySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)


class PlainUserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)  # load_only=True


class UserSchema(PlainUserSchema):
    name = fields.Str(required=True)
    surname = fields.Str(required=True)
    phone = fields.Str(required=True)
    deleted = fields.Bool(required=True)
    password_change_required = fields.Bool(required=True)
    facility_id = fields.Int(required=True)
    facility = fields.Nested(PlainFacilitySchema(), dump_only=True)
    role_id = fields.Int(required=True)
    role = fields.Nested(PlainRoleSchema(), dump_only=True)


class UserUpdateSchema(Schema):
    password = fields.Str()
    name = fields.Str()
    surname = fields.Str()
    email = fields.Str()
    phone = fields.Str()
    facility_id = fields.Int()  # Consider to remove this
    role_id = fields.Int()  # Consider to remove this
    deleted = fields.Bool()
    password_change_required = fields.Bool()


class RoleSchema(PlainRoleSchema):
    users = fields.List(fields.Nested(UserSchema()), dump_only=True)


class FacilitySchema(PlainFacilitySchema):
    users = fields.List(fields.Nested(UserSchema()), dump_only=True)
