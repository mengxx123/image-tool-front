<template>
    <my-page title="马赛克" :page="page">
        <!--<div class="thumb">-->
            <!--<img src="/static/img/2.jpg" id="dolly1" />-->
        <!--</div>-->
        <div class="empty-box" v-if="!resultSrc">
            <div class="text">请选择图片进行编辑</div>
        </div>
        <div v-if="resultSrc">
            <ui-row>
                <ui-select-field v-model="shape" label="样式">
                    <ui-menu-item value="square" title="正方形"/>
                    <ui-menu-item value="circle" title="圆形"/>
                    <ui-menu-item value="diamond" title="方块"/>
                </ui-select-field>
            </ui-row>
            <ui-slider class="slider" v-model="grid" :min="4" :max="100" :step="2" />
            <ui-row>
                <img id="img" :src="resultSrc">
            </ui-row>
            <ui-raised-button class="btn" label="下载" @click="download" />
        </div>
        <saver @close="saverClose" v-if="saverVisible" :src="downloadSrc" />
        <image-uploader @data="onData" />
    </my-page>
</template>

<script>
    const Intent = window.Intent

    export default {
        data () {
            return {
                resultSrc: null,
                newWidth: null,
                newHeight: null,
                result: false,
                activeStep: 0,
                grid: 20,
                shape: 'square',
                saverVisible: false,
                downloadSrc: '',
                isWebIntent: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'all_inclusive',
                            click: this.link,
                            title: '用其他应用打开'
                        }
                    ]
                }
            }
        },
        computed: {
            routeUrl: function () {
                return '/' + this.$route.params.lang + '/home'
            },
            finished () {
                return this.activeStep > 2
            }
        },
        mounted() {
            this.init()
//            this.debug()
        },
        methods: {
            init() {
                this.initWebIntents()
                // this.loadDataUrl('data:image/jpeg;base64,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')
//                setTimeout(() => {
//                    let dolly1 = document.getElementById('dolly1')
//                    this.pixelDolly = dolly1.closePixelate([
//                        {
//                            resolution: this.grid
//                        }
//                    ])
//                }, 200)
            },
            debug() {
                this.downloadSrc = 'app-mosaic.png'
                this.saverVisible = true
            },
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                this.isWebIntent = true
                console.log(window.intent.data)
                let data = window.intent.data
                if (data instanceof Array) {
                    this.loadDataUrl(data[0].url)
                } else {
                    this.loadDataUrl(data)
                }
            },
            link() {
                let canvas = document.getElementById('img')
                let dataUrl
                if (canvas) {
                    dataUrl = canvas.toDataURL('image/png', 1)
                }

                let intent = new Intent({
                    action: 'http://webintent.yunser.com/?',
                    type: 'image/*',
                    data: dataUrl
                })
                navigator.startActivity(intent, data => {
                    console.log('成功')
                    this.loadDataUrl(data)
                }, data => {
                    console.log('失败')
                })
            },
            finish() {
                let canvas = document.getElementById('img')
                let dataUrl = canvas.toDataURL('image/png', 1)
                window.intent.postResult(dataUrl)
                setTimeout(() => {
                    let owner = window.opener || window.parent
                    owner.window.close()
                }, 100)
            },
            onData(data) {
                this.loadDataUrl(data)
            },
            loadDataUrl(dataUrl) {
                this.resultSrc = dataUrl
                setTimeout(() => {
                    let dolly1 = document.getElementById('img')
                    this.pixelDolly = dolly1.closePixelate([
                        {
                            resolution: this.grid,
                            shape: this.shape
                        }
                    ])
                    this.mosaic()

                    if (this.isWebIntent && !this.isMenuAdded) {
                        this.isMenuAdded = true
                        console.log('添加菜单')
                        this.page.menu.push({
                            type: 'icon',
                            icon: 'check',
                            click: this.finish,
                            title: '完成'
                        })
                    }
                }, 500)
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
            handleNext () {
                this.activeStep++
            },
            handlePrev() {
                this.activeStep--
            },
            reset() {
                this.activeStep = 0
            },
            mosaic() {
            },
            render() {
                this.pixelDolly.render([
                    {
                        resolution: this.grid,
                        shape: this.shape
                    }
                ])
            },
            saverClose() {
                this.saverVisible = false
            },
            download() {
                this.saverVisible = true
                let canvas = document.getElementById('img')
                this.downloadSrc = canvas.toDataURL('image/png', 1)
            }
        },
        watch: {
            grid() {
                this.render()
            },
            shape() {
                this.render()
            }
        }
    }
</script>

<style lang="scss" scoped>
    img {
        max-width: 300px;
    }
    canvas {
        max-width: 100%;
    }
    .thumb {
        img {
            max-width: 100%;
        }
    }
    .slider {
        max-width: 400px;
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
</style>