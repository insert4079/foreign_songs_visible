import { createRouter, createWebHistory } from 'vue-router';

import Main from './views/Main.vue'
import Track from './views/Track.vue'
import Library from './views/Library.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/track/:trackId', component: Track },
    { path: '/library', component: Library },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
