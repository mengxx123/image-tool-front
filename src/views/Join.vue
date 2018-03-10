<template>
    <my-page title="图片拼接" :page="page">
        <ul class="template-list">
            <li class="item" v-for="template,index in templates" @click="selectTemplate(template,index)">
                <div class="text">
                    模板 {{ index + 1 }}
                </div>
                <!--<div class="elem" style="top: 0; left: 0; width: 100px;height: 300px;background-color: #e980b6" title="点击选择图片"></div>-->
                <!--<div class="elem" style="top: 0; left: 100px; width: 300px;height: 300px;background-color: #f7941d" title="点击选择图片"></div>-->
            </li>
        </ul>

        <input id="img-file" type="file" style="display: none">
        <div class="join-editor" id="editor" style="width: 400px;height: 300px">
            <div class="elem" style="top: 0; left: 0; width: 100px;height: 300px;background-color: #e980b6" title="点击选择图片"></div>
            <div class="elem" style="top: 0; left: 100px; width: 300px;height: 300px;background-color: #f7941d" title="点击选择图片"></div>
        </div>
        <!--<ui-row>-->
            <!--<ui-raised-button class="file-select-btn" label="选择图片" primary>-->
                <!--<input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">-->
            <!--</ui-raised-button>-->
        <!--</ui-row>-->
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
                colors: ['#e980b6', '#f7941d'],
                template: null,
                templates: [
                    {
                        type: 'fixed',
                        width: 400,
                        height: 300,
                        elems: [
                            {
                                top: 0,
                                left: 0,
                                width: 100,
                                height: 300,
                                'background-color': '#e980b6'
                            },
                            {
                                top: 0,
                                left: 100,
                                width: 300,
                                height: 300,
                                'background-color': '#f7941d'
                            }
                        ]
                    },
                    {
                        type: 'fixed',
                        width: 400,
                        height: 300,
                        elems: [
                            {
                                top: 0,
                                left: 0,
                                width: 200,
                                height: 300,
                                'background-color': '#e980b6'
                            },
                            {
                                top: 0,
                                left: 200,
                                width: 200,
                                height: 300,
                                'background-color': '#f7941d'
                            }
                        ]
                    }
                ],
                activeTemplateIndex: 0,
                dialogVisible: true,
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
                            to: '/join/help'
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
        destroyed() {
            this.$editor.off('click')
            document.getElementById('img-file').removeEventListener('change', this.onChange)
        },
        methods: {
            init() {
                this.template = this.templates[this.activeTemplateIndex]

                let _this = this
                // this.debug()
                this.$editor = $('#editor')
//            $('#editor').hide()
                this.renderTemplate()
                this.renderEditor()
                this.$editor.on('click', '.elem', function () {
//                $(this).hide()
                    _this.$curElem = $(this)
                    _this.dialogVisible = true
                    $('#img-file').click()
                })
                document.getElementById('img-file').addEventListener('change', this.onChange)
            },
            renderTemplate() {
            },
            renderEditor() {
                console.log('渲染')
                console.log(this.template)
                $(editor).empty()
                for (let idx in this.template.elems) {
                    let elem = this.template.elems[idx]
                    let $elem = $('<div class="elem" style="top: 0; left: 0; width: 100px;height: 300px;background-color: #e980b6" title="点击选择图片"></div>')
                    $elem.css({
                        top: elem.top + 'px',
                        left: elem.left + 'px',
                        width: elem.width + 'px',
                        height: elem.height + 'px',
                        'background-color': elem['background-color']
                    })
                    $(editor).append($elem)
                }
            },
            selectTemplate(template, index) {
                this.template = template
                this.activeTemplateIndex = index
            },
            onChange(e) {
                let _this = this
                let files = e.target.files
                if (files.length > 0) {
                    console.log('啦啦')
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        console.log('啦啦2212')
                        _this.$curElem.html(`<img src="${this.result}"/>`)
                        $('#img-file').val('')
                    }
                    reader.readAsDataURL(files[0])
                }
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
        },
        watch: {
            template() {
                this.renderEditor()
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