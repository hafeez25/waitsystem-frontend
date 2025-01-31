// component
import Iconify from '../../components/Iconify';
import DashboardIcon from '../../theme/icons/DashboardIcon';  
import LocationAnalysisIcon from '../../theme/icons/LoacationAnalyticsIcon'; 
import PoleAnalyticsIcon from '../../theme/icons/PoleAnalyticsIcon';
import RealTimeMapIcon from '../../theme/icons/RealTimeMapIcon';
import ManageDevicesIcon from '../../theme/icons/ManageDevicesIcon';
import ViewProfileIcon from '../../theme/icons/ViewProfileIcon';
import SettingIcon from '../../theme/icons/SettingIcon';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon/>,
  },
  {
    title: 'Location Analytics',
    path: '/dashboard/location/62a1d9a2d7f4e5a9a2a26755',
    icon: <LocationAnalysisIcon/>,
  },
  {
    title: 'Pole Analytics',
    path: '/dashboard/pole/62c711c92a4c755a9a91d1fc',
    icon: <PoleAnalyticsIcon/>,
  },
  {
    title: 'Realtime Map',
    path: '/dashboard/realtimemap',
    icon: <RealTimeMapIcon/>,
  },
  {
    title: 'Manage Devices',
    path: '/dashboard/manage-devices',
    icon: <ManageDevicesIcon/>,
  },
  {
    title: 'View Profile',
    path: '/view-profile',
    icon: <ViewProfileIcon/>,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <SettingIcon/>,
  },
];

export default navConfig;
