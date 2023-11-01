import { UserModel } from '@app/domain/UserModel';
//const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';

const testUser = {
  id: 1,
  firstName: 'Jan',
  lastName: 'Nowak',
  userName: 'jnowak',
  email: {
    name: 'chris.johnson@altence.com',
    verified: true,
  },
  phone: {
    number: '+81800300456',
    verified: true,
  },
  sex: 'male',
  birthday: '01/26/2022',
  lang: 'en',
  facility: 'Software Engineering and Database Systems',
};

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem('user');

  return userStr ? JSON.parse(userStr) : testUser;
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
