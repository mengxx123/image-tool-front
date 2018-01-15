<template>
    <my-page title="修改图片大小">
        <ui-row>
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </ui-row>
        <div v-if="resultSrc">
            <ui-row>
                <img id="img" :src="resultSrc">
            </ui-row>
            <ui-row>
                <div>
                    <ui-text-field v-model.number="newWidth" hintText="宽"/>
                </div>
                <div>
                    <ui-text-field v-model.number="newHeight" hintText="高"/>
                </div>
                <div>
                    <ui-raised-button label="生成图片" secondary
                                      @click="make"/>
                </div>
            </ui-row>
            <ui-row>
                <canvas id="canvas"></canvas>
            </ui-row>
        </div>
    </my-page>
</template>

<script>
//    const FileSaver = require('file-saver')
//    const FileSaver = window.FileSaver

    export default {
        data () {
            return {
                resultSrc: null,
                newWidth: null,
                newHeight: null,
                result: false
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
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
            },
            make() {
                let canvas = document.getElementById('canvas')
                canvas.width = this.newWidth
                canvas.height = this.newWidth
                let ctx = canvas.getContext('2d')
                ctx.width = this.originWidth
                ctx.height = this.originHeight

                let img = document.getElementById('img')
                ctx.drawImage(img, 0, 0, ctx.width, ctx.height, 0, 0, this.newWidth, this.newHeight)
            },
            sizeStr: function (size) {
                var originSize = size / 1024
                if (originSize < 1024) {
                    originSize = Math.floor(originSize) + ' KB'
                } else {
                    originSize = Math.floor(originSize / 1024) + ' MB'
                }
                return originSize
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
</style>