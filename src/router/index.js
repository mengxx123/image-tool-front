import Vue from 'vue'
import Router from 'vue-router'

const About = resolve => require(['@/views/About'], resolve)
const Compress = resolve => require(['@/views/Compress'], resolve)
const CompressHelp = resolve => require(['@/views/CompressHelp'], resolve)
const Size = resolve => require(['@/views/Size'], resolve)
const Color = resolve => require(['@/views/Color'], resolve)
const ColorHelp = resolve => require(['@/views/ColorHelp'], resolve)
const Format = resolve => require(['@/views/Format'], resolve)
const FormatHelp = resolve => require(['@/views/FormatHelp'], resolve)
const WaterMark = resolve => require(['@/views/Watermark'], resolve)
const IDCardWaterMark = resolve => require(['@/views/IDCardWaterMark'], resolve)
const IDCardWaterMarkHelp = resolve => require(['@/views/IDCardWaterMarkHelp'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Compress
    },
    {
        path: '/compress/help',
        component: CompressHelp
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
        path: '/watermark/idCard',
        component: IDCardWaterMark
    },
    {
        path: '/watermark/idCard/help',
        component: IDCardWaterMarkHelp
    },
    {
        path: '/format',
        component: Format
    },
    {
        path: '/format/help',
        component: FormatHelp
    },
    {
        path: '/color',
        component: Color
    },
    {
        path: '/color/help',
        component: ColorHelp
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
