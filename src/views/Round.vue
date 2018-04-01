<template>
    <my-page title="图片圆角">
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
                    <ui-text-field v-model.number="radius" label="圆角尺寸"/>
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label="生成图片" secondary @click="make"/>
                    <ui-raised-button class="btn" label="下载" @click="download" v-if="result"/>
                </div>
            </ui-row>
            <ui-row>
                <canvas id="canvas"></canvas>
            </ui-row>
        </div>
        <saver @close="saverClose" v-if="saverVisible" :src="downloadSrc" />
    </my-page>
</template>

<script>
    /* eslint-disable */
//    const FileSaver = require('file-saver')
//    const FileSaver = window.FileSaver
    CanvasRenderingContext2D.prototype.roundRect =  
            function (x, y, width, height, radius, fill, stroke) {  
                if (typeof stroke == "undefined") {  
                    stroke = true;  
                }  
                if (typeof radius === "undefined") {  
                    radius = 5;  
                }  
                this.beginPath();  
                this.moveTo(x + radius, y);  
                this.lineTo(x + width - radius, y);  
                this.quadraticCurveTo(x + width, y, x + width, y + radius);  
                this.lineTo(x + width, y + height - radius);  
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);  
                this.lineTo(x + radius, y + height);  
                this.quadraticCurveTo(x, y + height, x, y + height - radius);  
                this.lineTo(x, y + radius);  
                this.quadraticCurveTo(x, y, x + radius, y);  
                this.closePath();  
                if (stroke) {  
                    this.stroke();  
                }  
                if (fill) {  
                    this.fill();  
                }  
            };  

    
    export default {
        data () {
            return {
                radius: 10,
                resultSrc: null,
                newWidth: null,
                newHeight: null,
                result: false,
                saverVisible: false,
                downloadSrc: ''
            }
        },
        computed: {
            routeUrl: function () {
                return '/' + this.$route.params.lang + '/home'
            }
        },
        mounted() {
            this.init()
            this.debug()
        },
        methods: {
            init() {
            },
            debug() {
                // this.resultSrc = '/static/img/compress.jpg'
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
                let img = document.getElementById('img')

                canvas.width = this.originWidth
                canvas.height = this.originHeight
                let ctx = canvas.getContext('2d')
                ctx.width = this.originWidth
                ctx.height = this.originHeight


                ctx.roundRect(0, 0, ctx.width, ctx.height, this.radius, true)  
                ctx.globalCompositeOperation='source-in';  

                ctx.drawImage(img, 0, 0, ctx.width, ctx.height, 0, 0, this.originWidth, this.originHeight)
                this.result = true
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
            saverClose() {
                this.saverVisible = false
            },
            download() {
                this.saverVisible = true
                let canvas = document.getElementById('canvas')
                this.downloadSrc = canvas.toDataURL('image/png', 1)
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
    .btns {
        .btn {
            margin-right: 8px;
        }
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