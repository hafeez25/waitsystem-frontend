// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Analytics',
    path: '/404',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Health Tracker',
    path: '/404',
    icon: getIcon('healthicons:health-worker-form'),
  },
  {
    title: 'Realtime Map',
    path: '/dashboard/realtimemap',
    icon: getIcon('charm:map-pin'),
  },
  {
    title: 'Manage Devices',
    path: '/dashboard/manage-devices',
    icon: getIcon('ic:round-manage-accounts'),
  },
  {
    title: 'View Profile',
    path: '/view-profile',
    icon: getIcon('icomoon-free:profile'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: getIcon('clarity:settings-solid'),
  },
  // {
  //   title: 'add product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
