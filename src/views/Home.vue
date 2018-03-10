<template>
    <my-page title="图片工具">
        <div class="tool-list">
            <div class="mu-paper list-item mu-paper-round mu-paper-1" 
                v-for="app in apps">
                <router-link class="link" :to="app.to">
                    <img :src="app.icon" class="img">
                    <div class="info">
                        <h3 class="text">{{ app.name }}</h3>
                        <div class="desc">{{ app.desc }}</div>
                    </div>
                    <i class="icon icon-heart"></i>
                </router-link>
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                apps: [
                    {
                        name: '图片压缩',
                        desc: '',
                        icon: '/static/img/compress.jpg',
                        to: '/compress'
                    },
                    {
                        name: '修改图片大小',
                        desc: '',
                        icon: '/static/img/resize.svg',
                        to: '/size'
                    },
                    {
                        name: '图片圆角',
                        desc: '',
                        icon: '/static/img/round.svg',
                        to: '/round'
                    },
                    {
                        name: '图片加水印',
                        desc: '',
                        icon: '/static/img/watermark.svg',
                        to: '/watermark'
                    },
                    {
                        name: '身份证水印',
                        desc: '',
                        icon: '/static/img/watermark.svg',
                        to: '/watermark/idCard'
                    },
                    {
                        name: '图片取色',
                        desc: '',
                        icon: '/static/img/straw.svg',
                        to: '/color'
                    },
                    {
                        name: '格式转换',
                        desc: '',
                        icon: '/static/img/logo.svg',
                        to: '/format'
                    },
                    {
                        name: '图片分割',
                        desc: '',
                        icon: '/static/img/split.svg',
                        to: '/split'
                    },
                    {
                        name: '图片拼接',
                        desc: '',
                        icon: '/static/img/app-join.svg',
                        to: '/join'
                    }
                ]
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
