export type CategoryType = 'forms' | 'charts' | 'auth' | 'data tables' | 'maps';

interface Category {
  name: CategoryType;
  title: string;
}

export const categoriesList: Category[] = [
  {
    name: 'auth',
    title: 'common.auth',
  },
  {
    name: 'forms',
    title: 'common.forms',
  },
  {
    name: 'data tables',
    title: 'common.dataTables',
  },
  {
    name: 'charts',
    title: 'Raports',
  },
  {
    name: 'maps',
    title: 'common.maps',
  },
];
