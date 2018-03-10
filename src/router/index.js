import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Compress = resolve => require(['@/views/Compress'], resolve)
const CompressHelp = resolve => require(['@/views/CompressHelp'], resolve)
const Size = resolve => require(['@/views/Size'], resolve)
const Round = resolve => require(['@/views/Round'], resolve)
const Color = resolve => require(['@/views/Color'], resolve)
const ColorHelp = resolve => require(['@/views/ColorHelp'], resolve)
const Format = resolve => require(['@/views/Format'], resolve)
const FormatHelp = resolve => require(['@/views/FormatHelp'], resolve)
const Watermark = resolve => require(['@/views/Watermark'], resolve)
const IdCardWatermark = resolve => require(['@/views/IdCardWatermark'], resolve)
const IdCardWatermarkHelp = resolve => require(['@/views/IdCardWatermarkHelp'], resolve)
const Split = resolve => require(['@/views/Split'], resolve)
const SplitHelp = resolve => require(['@/views/SplitHelp'], resolve)
const Join = resolve => require(['@/views/Join'], resolve)
const JoinHelp = resolve => require(['@/views/JoinHelp'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
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
        path: '/compress/help',
        component: CompressHelp
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
        path: '/watermark',
        component: Watermark
    },
    {
        path: '/watermark/idCard',
        component: IdCardWatermark
    },
    {
        path: '/watermark/idCard/help',
        component: IdCardWatermarkHelp
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
        path: '/split',
        component: Split
    },
    {
        path: '/split/help',
        component: SplitHelp
    },
    {
        path: '/join',
        component: Join
    },
    {
        path: '/join/help',
        component: JoinHelp
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
