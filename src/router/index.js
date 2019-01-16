import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Compress = resolve => require(['@/views/Compress'], resolve)
const Size = resolve => require(['@/views/Size'], resolve)
const Round = resolve => require(['@/views/Round'], resolve)
const Border = resolve => require(['@/views/Border'], resolve)
const Color = resolve => require(['@/views/Color'], resolve)
const Format = resolve => require(['@/views/Format'], resolve)
const Watermark = resolve => require(['@/views/Watermark'], resolve)
const IdCardWatermark = resolve => require(['@/views/IdCardWatermark'], resolve)
const Split = resolve => require(['@/views/Split'], resolve)
const Join = resolve => require(['@/views/Join'], resolve)
const Temp = resolve => require(['@/views/Temp'], resolve)
const Mosaic = resolve => require(['@/views/Mosaic'], resolve)
const Base64 = resolve => require(['@/views/Base64'], resolve)
const Glitch = resolve => require(['@/views/Glitch'], resolve)
const Blending = resolve => require(['@/views/Blending'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/compress',
        component: Compress
    },
    {
        path: '/size',
        component: Size
    },
    {
        path: '/round',
        component: Round
    },
    {
        path: '/border',
        component: Border
    },
    {
        path: '/watermark',
        component: Watermark
    },
    {
        path: '/watermark/idCard',
        component: IdCardWatermark
    },
    {
        path: '/format',
        component: Format
    },
    {
        path: '/color',
        component: Color
    },
    {
        path: '/split',
        component: Split
    },
    {
        path: '/join',
        component: Join
    },
    {
        path: '/temp',
        component: Temp
    },
    {
        path: '/mosaic',
        component: Mosaic
    },
    {
        path: '/base64',
        component: Base64
    },
    {
        path: '/glitch',
        component: Glitch
    },
    {
        path: '/blending',
        component: Blending
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
