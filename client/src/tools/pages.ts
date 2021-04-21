import Chat from '../pages/Chat';
import Images from '../pages/Images';
import Initial from '../pages/Initial';
import Map from '../pages/Map';

export const ROUTES = [
  {
    page: '/',
    title: 'To Dos',
    component: Initial
  },
  {
    page: '/chat',
    title: 'Chat',
    component: Chat
  },
  {
    page: '/map',
    title: 'Map',
    component: Map
  },
  {
    page: '/images',
    title: 'Images',
    component: Images
  }
];
