export interface UserModel {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  deleted: boolean;
  password_change_required: boolean;
  facility_id: number;
  role_id: number;
}
