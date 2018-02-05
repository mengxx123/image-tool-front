<template>
    <my-page title="格式转化" :page="page">
        <ui-row>
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </ui-row>
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
    </my-page>
</template>

<script>
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
                            icon: 'help',
                            to: '/format/help'
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
            fileChange(e) {
                let _this = this
                let files = e.target.files
                if (files.length > 0) {
                    console.log('啦啦')
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        console.log('啦啦2212')
                        _this.resultSrc = this.result
                        let img = new Image()
                        img.onload = function () {
                            _this.originWidth = img.width
                            _this.originHeight = img.height
                            _this.make()
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
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