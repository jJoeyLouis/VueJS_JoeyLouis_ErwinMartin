import { createRouter, createWebHistory } from 'vue-router'
import RoomsList from './components/RoomsList.vue';
import WindowsList from './components/WindowsList.vue';
const routes = [
    { path: '/rooms', component: RoomsList, name: 'rooms' },
    { path: '/windows', component: WindowsList, name: 'windows' },
    { path: '/', redirect: '/rooms'}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;