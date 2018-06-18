<template>
    <my-page title="图像加边框">
        <!-- <ui-row>
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </ui-row> -->
        <div class="empty-box" v-if="!resultSrc">
            <div class="text">请选择图片进行编辑</div>
        </div>
        <div v-if="resultSrc">
            <ui-row>
                <img id="img" :src="resultSrc">
            </ui-row>
            <ui-row>
                <div>
                    <ui-text-field v-model.number="options.borderWidth" type="number" label="边框宽度"/>
                </div>
                <div>
                    <!-- <ui-text-field v-model="options.borderColor" label="边框颜色"/> -->
                    <div>边框颜色</div>
                    <color-picker v-model="options.borderColor" />
                </div>
                <div class="btns">
                    <!-- <ui-raised-button class="btn" label="生成图片" secondary @click="make"/> -->
                    <ui-raised-button class="btn" label="下载" primary @click="download" v-if="result"/>
                    <!-- <ui-raised-button class="btn" label="边框样式" secondary @click="open = true" v-if="result"/> -->
                </div>
            </ui-row>
            <ui-row>
                <canvas id="canvas"></canvas>
            </ui-row>
        </div>
        <saver :show.sync="saverVisible" :src="downloadSrc" />
        <image-uploader v-if="embed" @data="onData" />
        <ui-drawer right :open="open" :docked="false" @close="toggle()">
            <ui-appbar title="边框样式">
                <ui-icon-button icon="close" slot="left" @click="open = false" />
            </ui-appbar>
            <ul class="style-list">
                <li class="item" v-for="style in styles">
                    <img class="preview" :src="style.image">
                    <div class="name">{{ style.name }}</div>
                </li>
            </ul>
        </ui-drawer>
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
                open: false,
                embed: true,
                options: {
                    borderColor: '#000000',
                    borderWidth: 8,
                },
                styles: [
                    {
                        id: '1',
                        name: '纯色',
                        image: '/static/img/border/style_1_preview.png'
                    }
                ],
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
            // this.debug()
        },
        methods: {
            toggle () {
                this.open = !this.open
            },
            init() {
                let isInFrame = window.self !== window.top
                this.embed = this.$route.query.embed === 'true' && isInFrame
                this.embed = true
            },
            debug() {
                this.dealData('/static/img/compress.jpg')
                // this.resultSrc = '/static/img/compress.jpg'
                // this.make()
            },
            onData(data) {
                this.dealData(data[0].data)
            },
            dealData(data) {
                this.resultSrc = data
                let img = new Image()
                img.onload = () => {
                    this.originWidth = img.width
                    this.originHeight = img.height
                    this.make()
                }
                img.src = this.resultSrc
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

                ctx.lineWidth = 0
                ctx.roundRect(0, 0, ctx.width, ctx.height, this.radius, true)  
                ctx.globalCompositeOperation = 'source-in'; 

                ctx.drawImage(img, 0, 0, ctx.width, ctx.height, 0, 0, this.originWidth, this.originHeight)

                ctx.globalCompositeOperation = 'source-over'

                // draw border
                ctx.strokeStyle = this.options.borderColor
                ctx.lineWidth = this.options.borderWidth
                ctx.rect(0, 0, ctx.width, ctx.height)
                ctx.stroke()

                this.result = true
            },
            download() {
                this.saverVisible = true
                let canvas = document.getElementById('canvas')
                this.downloadSrc = canvas.toDataURL('image/png', 1)
            }
        },
        watch: {
            options: {
                deep: true,
                handler() {
                    this.make()
                }
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
    .style-list {
        padding: 16px;
        .item {
            margin-bottom: 16px;
        }
        .preview {
            max-width: 100%;
            max-width: 80px;
        }
        .name {}
    }
</style>