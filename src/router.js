import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import CoalMineHeritage from './components/pages/CoalMineHeritage.vue';
import QuizGame from './components/pages/QuizGame.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    // Lazy-loaded component
    component: () => import('./components/pages/About.vue')
  },
  {
    path: '/heritage/coal-mine',
    name: 'CoalMineHeritage',
    component: CoalMineHeritage
  },
  {
    path: '/heritage/railway',
    name: 'RailwayHeritage',
    // Lazy-loaded component
    component: () => import('./components/pages/RailwayHeritage.vue')
  },
  {
    path: '/heritage/textile',
    name: 'TextileHeritage',
    // Lazy-loaded component
    component: () => import('./components/pages/TextileHeritage.vue')
  },
  {
    path: '/heritage/others',
    name: 'OtherHeritage',
    // Lazy-loaded component
    component: () => import('./components/pages/OtherHeritage.vue')
  },
  {
    path: '/spirit/coal-mine',
    name: 'CoalMineSpirit',
    // Lazy-loaded component
    component: () => import('./components/pages/CoalMineSpirit.vue')
  },
  {
    path: '/spirit/railway',
    name: 'RailwaySpirit',
    // Lazy-loaded component
    component: () => import('./components/pages/RailwaySpirit.vue')
  },
  {
    path: '/spirit/model-worker',
    name: 'ModelWorkerSpirit',
    // Lazy-loaded component
    component: () => import('./components/pages/ModelWorkerSpirit.vue')
  },
  {
    path: '/quiz',
    name: 'QuizGame',
    component: QuizGame
  },
  {
    path: '/panorama',
    name: 'Panorama',
    // Lazy-loaded component
    component: () => import('./components/pages/Panorama.vue')
  },
  {
    path: '/culture',
    name: 'Culture',
    // Lazy-loaded component
    component: () => import('./components/pages/Culture.vue')
  },
  {
    path: '/culture/creative',
    name: 'CultureCreative',
    // Lazy-loaded component
    component: () => import('./components/pages/CultureCreative.vue')
  },
  {
    path: '/culture/digital-preservation',
    name: 'DigitalPreservation',
    // Lazy-loaded component
    component: () => import('./components/pages/DigitalPreservation.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    // Lazy-loaded component
    component: () => import('./components/pages/Guide.vue')
  },
  {
    path: '/ai-agent',
    name: 'AiAgent',
    // Lazy-loaded component
    component: () => import('./components/pages/AiAgent.vue')
  },
  {
    path: '/ai-chat',
    name: 'AiChat',
    // Lazy-loaded component
    component: () => import('./components/pages/AiChat.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router; 