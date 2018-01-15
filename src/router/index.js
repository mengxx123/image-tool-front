import Vue from 'vue'
import Router from 'vue-router'

const About = resolve => require(['@/views/About'], resolve)
const Compress = resolve => require(['@/views/Compress'], resolve)
const Size = resolve => require(['@/views/Size'], resolve)
const Color = resolve => require(['@/views/Color'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const WaterMark = resolve => require(['@/views/WaterMark'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Compress
    },
    {
        path: '/size',
        component: Size
    },
    {
        path: '/watermark',
        component: WaterMark
    },
    {
        path: '/color',
        component: Color
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
