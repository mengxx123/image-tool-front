<template>
    <my-page title="图片工具" :page="page">
        <div class="common-container container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '图片编辑',
                        apps: [
                            {
                                name: '图片压缩',
                                desc: '',
                                icon: '/static/img/image_compress.svg',
                                to: '/compress'
                            },
                            {
                                name: '修改图片大小',
                                desc: '',
                                icon: '/static/img/image_resize.svg',
                                to: '/size'
                            },
                            {
                                name: '图片圆角',
                                desc: '',
                                icon: '/static/img/image_rounded_corner.svg',
                                to: '/round'
                            },
                            {
                                name: '图片加水印',
                                desc: '',
                                icon: '/static/img/image_watermark.svg',
                                to: '/watermark'
                            },
                            {
                                name: '身份证水印',
                                desc: '',
                                icon: '/static/img/id_card_watermark.svg',
                                to: '/watermark/idCard'
                            },
                            {
                                name: '图片取色',
                                desc: '',
                                icon: '/static/img/image_pick_up_color.svg',
                                to: '/color'
                            },
                            {
                                name: '格式转换',
                                desc: '',
                                icon: '/static/img/image_convert.svg',
                                to: '/format'
                            },
                            {
                                name: '图片分割',
                                desc: '',
                                icon: '/static/img/image_split.svg',
                                to: '/split'
                            },
                            {
                                name: '图片拼接',
                                desc: '',
                                icon: '/static/img/app-join.svg',
                                to: '/join'
                            },
                            {
                                name: '马赛克',
                                desc: '',
                                icon: '/static/img/app-mosaic.svg',
                                to: '/mosaic'
                            },
                            {
                                name: '图像融合',
                                desc: '可以把两张图片融合在一起',
                                icon: '/static/img/image_blending.svg',
                                to: '/blending'
                            },
                            {
                                name: '图像加边框',
                                desc: '',
                                icon: '/static/img/image_border.svg',
                                to: '/border'
                            },
                            {
                                name: '带壳截图',
                                desc: '给截图加上漂亮的壳',
                                icon: '/static/img/screenshot.svg',
                                to: 'xxx',
                                href: 'https://screenshot.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: 'SVG',
                                desc: '',
                                icon: '/static/img/svg.svg',
                                to: 'xxx',
                                href: 'https://svgtool.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '图片拼接',
                                desc: '',
                                icon: '/static/img/imgae_subtitle.svg',
                                to: 'xxx',
                                href: 'https://join.yunser.com/',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        name: '图片制作',
                        apps: [
                            {
                                name: '画板',
                                desc: '在线 PS',
                                icon: '/static/img/draw.svg',
                                to: 'xxx',
                                href: 'https://draw.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: 'GIF',
                                desc: '',
                                icon: '/static/img/gif.svg',
                                to: 'xxx',
                                href: 'https://gif.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '像素图',
                                desc: '',
                                icon: '/static/img/pixel.svg',
                                to: 'xxx',
                                href: 'https://pixel.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '证件照',
                                desc: '证件照片排版生成',
                                icon: '/static/img/photo.svg',
                                to: 'xxx',
                                href: 'https://photo.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: 'Favicon 图标制作',
                                desc: '',
                                icon: '/static/img/favicon.svg',
                                to: 'xxx',
                                href: 'https://favicon.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '占位图片',
                                desc: '',
                                icon: '/static/img/image_placeholder.svg',
                                to: '/temp'
                            },
                            {
                                name: '故障风格文字',
                                desc: '抖音风格的文字生成器',
                                icon: '/static/img/glitch.svg',
                                to: '/glitch'
                            },
                            {
                                name: '印章',
                                desc: '印章制作',
                                icon: '/static/img/seal.svg',
                                to: 'xxx',
                                href: 'https://seal.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '图标制作',
                                desc: '',
                                icon: '/static/img/icon.svg',
                                to: 'xxx',
                                href: 'https://icongenerator.yunser.com/',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        name: '下载',
                        apps: [
                            {
                                name: '图标下载',
                                desc: '',
                                icon: '/static/img/icon.svg',
                                to: 'xxx',
                                href: 'https://icon.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '纹理图片下载',
                                desc: '',
                                icon: '/static/img/texture.svg',
                                to: 'xxx',
                                href: 'https://download.yunser.com/pattern/',
                                target: '_blank'
                            },
                            {
                                name: '矢量 LOGO 下载',
                                desc: '',
                                icon: '/static/img/logo.svg',
                                to: 'xxx',
                                href: 'https://logo.yunser.com/',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        name: '其他',
                        apps: [
                            {
                                name: '图片浏览器',
                                desc: '',
                                icon: '/static/img/image.svg',
                                to: 'xxx',
                                href: 'https://imageviewer.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '图片⇆Base64',
                                desc: 'Base64图片编码解码',
                                icon: '/static/img/base64.svg',
                                to: '/base64'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=imagetool',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=imagetool',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

.tool-list {
    max-width: 840px;
    margin: 0 auto;
    @include clearfix;
    .list-item {
        position: relative;
        float: left;
        width: 260px;
        height: 96px;
        padding: 8px;
        margin: 2px 16px 16px 2px;
        background-color: #fff;
        //border: 1px solid #ccc;
        &:hover {
            background-color: #f9f9f9;
            // box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
            //border-color: #09c;
            .icon {
                display: block;
            }
        }
        &.active {
            border: 1px solid #f00;
        }
    }
    a {
        display: block;
        height: 100%;
        color: #666;
    }
    .img {
        float: left;
        width: 72px;
        height: 72px;
        margin-right: 16px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
    }
    .info {
        float: left;
    }
    .text {
        font-size: 18px;
        color: #000;
    }
    .header {
        overflow: hidden;
    }
    .desc {
        max-width: 150px;
        margin-top: 8px;
    }
    .icon-heart {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 32px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
}
@media all and (max-width: 400px){
    .tool-list {
        .list-item {
            width: 100%;
            margin-right: 0;
        }
    }
}
</style>
