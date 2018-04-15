<template>
    <my-page title="修改图片大小">
        <!-- <ui-stepper :activeStep="activeStep" orientation="vertical">
            <ui-step>
                <ui-step-label>上传图片</ui-step-label>
                <ui-step-content>
                    <ui-raised-button class="file-select-btn" label="选择图片" primary>
                        <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
                    </ui-raised-button>
                    <ui-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                </ui-step-content>
            </ui-step>
            <ui-step>
                <ui-step-label>
                    创建一个群组
                </ui-step-label>
                <ui-step-content>
                    <p>
                    创建群组，50人左右，以18-25单身青年为主。。。。。
                    </p>
                    <ui-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                    <ui-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
                </ui-step-content>
            </ui-step>
            <ui-step>
                <ui-step-label>
                    宣传活动
                </ui-step-label>
                <ui-step-content>
                    <p>
                    多在群里发消息宣传宣传，有事没事多在群里唠唠嗑，确定的话就ok拉
                    </p>
                    <ui-raised-button label="完成" class="demo-step-button" @click="handleNext" primary/>
                    <ui-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
                </ui-step-content>
            </ui-step>
        </ui-stepper>
        <p v-if="finished">
            都完成啦!<a href="javascript:;" @click="reset">点这里</a>可以重置
        </p> -->
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
                    <ui-checkbox class="checkbox" v-model="constraintRatio" label="约束长宽比"/>
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
                result: false,
                activeStep: 0,
                constraintRatio: true
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
        },
        methods: {
            init() {
                this.initWebIntents()
            },
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                console.log(window.intent.data)
                let data = window.intent.data
                if (data instanceof Array) {
                    // TODO
                    this.resultSrc = data[0].url
                } else {
                    this.resultSrc = data
                }
            },
            fileChange(e) {
                let _this = this
                let files = e.target.files
                if (files.length > 0) {
                    console.log('啦啦')
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        console.log('啦啦2212')
                        _this.resultSrc = e.target.result
                        let img = new Image()
                        img.onload = function () {
                            _this.originWidth = img.width
                            _this.originHeight = img.height
                            _this.newWidth = img.width
                            _this.newHeight = img.height
                            _this.result = false
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
            },
            make() {
                let canvas = document.getElementById('canvas')
                canvas.width = this.newWidth
                canvas.height = this.newHeight
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
            },
            handleNext () {
                this.activeStep++
            },
            handlePrev () {
                this.activeStep--
            },
            reset () {
                this.activeStep = 0
            }
        },
        watch: {
            newWidth() {
                if (this.constraintRatio) {
                    this.newHeight = this.newWidth * this.originHeight / this.originWidth
                }
            },
            newHeight() {
                if (this.constraintRatio) {
                    this.newWidth = this.newHeight * this.originWidth / this.originHeight
                }
            },
            constraintRatio() {
                if (this.constraintRatio) {
                    this.newWidth = this.originWidth
                    this.newHeight = this.originHeight
                }
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 300px;
    }
    canvas {
        max-width: 100%;
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