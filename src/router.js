import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "Main",
        props: true,
        component: () => import('./views/main.vue')
    },
    {
        path: "/play",
        name: "Game",
        props: true,
        component: () => import('./views/play.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router