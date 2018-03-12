<template>
    <my-page title="马赛克">
        <ui-row>
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </ui-row>

        <!--<div class="thumb">-->
            <!--<img src="/static/img/2.jpg" id="dolly1" />-->
        <!--</div>-->


        <div v-if="resultSrc">
            <ui-slider v-model="grid" :min="4" :max="100" :step="2" />
            <ui-row>
                <img id="img" :src="resultSrc">
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
                grid: 20
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
//                setTimeout(() => {
//                    let dolly1 = document.getElementById('dolly1')
//                    this.pixelDolly = dolly1.closePixelate([
//                        {
//                            resolution: this.grid
//                        }
//                    ])
//                }, 200)
            },
            fileChange(e) {
                let files = e.target.files
                if (files.length > 0) {
                    let reader = new FileReader()
                    reader.onload = e => {
                        this.resultSrc = e.target.result
                        setTimeout(() => {
                            let dolly1 = document.getElementById('img')
                            this.pixelDolly = dolly1.closePixelate([
                                {
                                    resolution: this.grid
                                }
                            ])
                            this.mosaic()
                        }, 500)
                    }
                    reader.readAsDataURL(files[0])
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
            handleNext () {
                this.activeStep++
            },
            handlePrev () {
                this.activeStep--
            },
            reset () {
                this.activeStep = 0
            },
            mosaic() {
            }
        },
        watch: {
            grid() {
                this.pixelDolly.render([
                    {
                        resolution: this.grid
                    }
                ])
            }
        }
    }
</script>

<style lang="scss" scoped>
    img {
        max-width: 300px;
    }
    .thumb {
        img {
            max-width: 100%;
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