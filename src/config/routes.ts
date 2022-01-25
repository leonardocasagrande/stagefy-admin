import { IRoute, ProfileRoleEnum } from 'types/index.d';

const routes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    component: 'Home',
    permissions: [],
  },
  {
    name: 'adminQuery',
    path: '/consulta',
    component: 'AdminQuery',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminEvents',
    path: '/eventos',
    component: 'AdminEvents',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminStreamers',
    path: '/streamers',
    component: 'AdminStreamers',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminCarousel',
    path: '/carrossel',
    component: 'AdminCarousel',
    permissions: [ProfileRoleEnum.Admin],
  },
];

export default routes;
