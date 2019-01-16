<template>
    <my-page title="格式转化" :page="page">
        <div class="empty-box" v-if="!resultSrc">
            <div class="text">请选择图片进行编辑</div>
        </div>
        <div v-if="resultSrc">
            <ui-row>
                <img id="img" :src="resultSrc" style="display: none">
                <canvas class="canvas" id="canvas"></canvas>
            </ui-row>
            <ui-row>
                <div>
                    <ui-raised-button label="PNG 下载" secondary @click="downloadPng"/>
                    <ui-raised-button label="JPG 下载" secondary @click="downloadJpg"/>
                    <ui-raised-button label="WebP 下载" secondary @click="downloadWebP"/>
                </div>
            </ui-row>
        </div>
        <image-uploader @data="onData" />
    </my-page>
</template>

<script>
    const Intent = window.Intent
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                resultSrc: null,
                result: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'all_inclusive',
                            click: this.link,
                            title: '用其他应用打开'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/6dfdbdc00d1911e9be41f39928385642',
                            target: '_blank'
                        }
                    ]
                }
            }
        },
        computed: {
            routeUrl: function () {
                return '/' + this.$route.params.lang + '/home'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
            },
            link() {
                let intent = new Intent({
                    action: 'http://webintent.yunser.com/?',
                    type: 'image/*',
                    data: this.content
                })
                navigator.startActivity(intent, data => {
                    console.log('成功')
                    this.loadDataUrl(data)
                }, data => {
                    console.log('失败')
                })
            },
            onData(data) {
                this.loadDataUrl(data[0].data)
            },
            loadDataUrl(dataUrl) {
                this.resultSrc = dataUrl
                let img = new Image()
                img.onload = () => {
                    this.originWidth = img.width
                    this.originHeight = img.height
                    this.make()
                }
                img.src = this.resultSrc
            },
            make() {
                let canvas = document.getElementById('canvas')
                canvas.width = this.originWidth
                canvas.height = this.originHeight
                let ctx = canvas.getContext('2d')
                ctx.width = this.originWidth
                ctx.height = this.originHeight

                let img = document.getElementById('img')
                console.log(img)
                ctx.drawImage(img, 0, 0, ctx.width, ctx.height, 0, 0, this.originWidth, this.originHeight)
            },
            sizeStr(size) {
                var originSize = size / 1024
                if (originSize < 1024) {
                    originSize = Math.floor(originSize) + ' KB'
                } else {
                    originSize = Math.floor(originSize / 1024) + ' MB'
                }
                return originSize
            },
            downloadPng() {
                let canvas = document.getElementById('canvas')
                canvas.toBlob(function (blob) {
                    saveAs(blob, 'pretty image.png')
                })
            },
            downloadJpg() {
                let canvas = document.getElementById('canvas')
                let ctx = canvas.getContext('2d')
                let dataUrl = canvas.toDataURL('image/jpeg', 1)
                let img = new Image()
                img.onload = () => {
                    ctx.drawImage(img, 0, 0)
                    canvas.toBlob(function (blob) {
                        saveAs(blob, 'pretty image.jpg')
                    })
                }
                img.src = dataUrl
            },
            downloadWebP() {
                let canvas = document.getElementById('canvas')
                let ctx = canvas.getContext('2d')
                let dataUrl = canvas.toDataURL('image/webp', 1)
                let img = new Image()
                img.onload = () => {
                    ctx.drawImage(img, 0, 0)
                    canvas.toBlob(function (blob) {
                        saveAs(blob, 'pretty image.webp')
                    })
                }
                img.src = dataUrl
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 300px;
    }
    .setting {
        padding: 16px;
        border: 1px solid #ccc;
    }
    .display-image {
        max-width: 100%;
    }
    .percent {
        color: #f00;
    }
    .file-select {
        margin-bottom: 16px;
    }
    .canvas {
        max-width: 300px;
    }
</style>