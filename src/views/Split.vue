<template>
    <my-page title="图片分割" :page="page">
        <div class="common-container container">
            <ui-row>
                <ui-raised-button class="file-select-btn" label="选择图片" primary>
                    <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
                </ui-raised-button>
            </ui-row>
            <div v-if="resultSrc">
                <ui-row>
                    <div class="img-box">
                        <img id="img" :src="resultSrc">
                        <canvas></canvas>
                    </div>
                </ui-row>
                <ui-row>
                    <div>
                        <ui-text-field v-model.number="row" label="行"/>
                    </div>
                    <div>
                        <ui-text-field v-model.number="column" label="列"/>
                    </div>
                    <div>
                        <ui-raised-button label="生成图片" secondary
                                        @click="make"/>
                    </div>
                </ui-row>
                <ui-row>
                    <canvas id="canvas" style="display: none"></canvas>
                    <canvas id="canvas2" style="display: none"></canvas>
                    <ui-raised-button label="下载图片(.zip)" @click="download" v-if="results.length" />
                    <ul class="result-list">
                        <li class="item" v-for="img in results">
                            <img :src="img">
                        </li>
                    </ul>
                </ui-row>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
//    const FileSaver = require('file-saver')
//    const FileSaver = window.FileSaver
    import simpleZip from '@/util/zip'

    export default {
        data () {
            return {
                row: 3,
                column: 3,
                resultSrc: null,
                newWidth: null,
                newHeight: null,
                result: false,
                results: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/cec25f700d1511e9be41f39928385642',
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
            // this.debug()
        },
        methods: {
            init() {
            },
            debug() {
                this.resultSrc = '/static/img/compress.jpg'
                this.$nextTick(() => {
                    let img = document.getElementById('img')
                    img.onload = () => {
                        this.originWidth = img.width
                        this.originHeight = img.height
                        this.make()
                    }
                })
            },
            fileChange(e) {
                let _this = this
                let files = e.target.files
                if (files.length > 0) {
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        _this.resultSrc = this.result
                        let img = new Image()
                        img.onload = function () {
                            _this.originWidth = img.width
                            _this.originHeight = img.height
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
            },
            make() {
                let canvas = document.getElementById('canvas')
                let img = document.getElementById('img')

                canvas.width = this.originWidth
                canvas.height = this.originHeight
                let ctx = canvas.getContext('2d')
                ctx.width = this.originWidth
                ctx.height = this.originHeight

                let canvas2 = document.getElementById('canvas2')
                let ctx2 = canvas2.getContext('2d')
                let gridWidth = this.originWidth / this.column
                let gridHeight = this.originHeight / this.row
                canvas2.width = gridWidth
                canvas2.height = gridHeight
                ctx2.width = gridWidth
                ctx2.height = gridHeight

                ctx.drawImage(img, 0, 0, ctx.width, ctx.height, 0, 0, this.originWidth, this.originHeight)

                this.results = []
                for (let x = 0; x < this.column; x++) {
                    for (let y = 0; y < this.row; y++) {
                        let startX = x * gridWidth
                        let startY = y * gridHeight
                        if (x === 2 && y === 0) {
                        }
                        ctx2.clearRect(0, 0, gridWidth, gridHeight)
                        ctx2.drawImage(img, startX, startY, gridWidth, gridHeight, 0, 0, gridWidth, gridHeight)
                        this.results.push(canvas2.toDataURL())
                        // cxt.beginpath
                    }
                }
            },
            sizeStr: function (size) {
                var originSize = size / 1024
                if (originSize < 1024) {
                    originSize = Math.floor(originSize) + ' KB'
                } else {
                    originSize = Math.floor(originSize / 1024) + ' MB'
                }
                return originSize
            },
            download() {
                let f = async () => {
                    await simpleZip.init()
                    for (let idx in this.results) {
                        await simpleZip.addDataUrl(this.results[idx], idx + '.png')
                    }
                    simpleZip.download('云设图片分割工具.zip')
                }
                f()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-box {
        position: relative;
    }
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
    .result-list {
        overflow: hidden;
        .item {
            float: left;
            margin-right: 16px;
            margin-bottom: 16px;
        }
        img {
            border: 1px solid #eee;
        }
    }
    .tip {
        color: #999;
        margin-bottom: 16px;
    }
</style>