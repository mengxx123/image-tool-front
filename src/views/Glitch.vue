<template>
    <my-page title="抖音风格的文字生成器" :page="page">
        <div class="tip">建议先下载站酷高端黑字体安装到电脑再使用，电脑右键另存为保存图片。</div>
        <div class="preview" id="preview"></div>
            <div id="edit">
            <div class="option">
                <ui-text-field v-model="options.text" label="文字" />
            </div>
            <div class="option">
                <div class="title">字体大小</div>
                <ui-slider class="slider" v-model="options.fontSize" :step="2" :min="20" :max="200" label="121" />
            </div>
            <div class="option">
                <div class="title">抖动幅度</div>
                <ui-slider class="slider" v-model="options.speed" :step="2" :min="1" :max="100"/>
            </div>
            <div class="option">
                <ui-checkbox v-model="options.divider" label="切割线" class="demo-checkbox"/> 
            </div>
            <div class="option">
                <br>
                <div class="title">图片格式</div>
                <ui-radio v-model="options.type" label="PNG" name="group" nativeValue="png" class="demo-radio"/>
                <br>
                <ui-radio v-model="options.type" label="GIF" name="group" nativeValue="gif"  class="demo-radio"/>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
   const Intent = window.Intent

    export default {
        data () {
            return {
                embed: false,
                options: {
                    text: 'HELLO WORLD',
                    type: 'png',
                    divider: false,
                    speed: 50,
                    fontSize: 110
                },
                resultSrc: null,
                newWidth: null,
                newHeight: null,
                result: false,
                activeStep: 0,
                constraintRatio: true,
                isWebIntent: false,
                resultImage: null,
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'all_inclusive',
                        //     click: this.link,
                        //     title: '用其他应用打开'
                        // }
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
        },
        methods: {
            init() {
                let isInFrame = window.self !== window.top
                this.embed = this.$route.query.embed === 'true' && isInFrame
                this.embed = true

                let _this = this

                var dytext;
                dytext=new DYText({
                    word: '2121',
                    color:'white',
                    colorBg:'#fff',
                    // colorBg:'#1F0D1C',
                    colorLeft:'#00F5EB',
                    colorRight:'#FF0050',
                    dev: false,
                    seed: 50 * 0.03,
                    fontSize: 110
                });
                
                updatePreview();

                function createImg(){
                    var canvasTarget = document.createElement('canvas')
                    let ctxTarget = canvasTarget.getContext('2d');
                    canvasTarget.width = window.innerWidth;
                    dytext.start();
                    dytext.toCanvas(ctxTarget);
                    var previewElement=document.querySelector('#preview');
                    previewElement.innerHTML='';
                    previewElement.appendChild(canvasTarget);
                };

                function createGif(){
                    dytext.createGif(function(gif){

                    var img=document.createElement('img');
                        img.src=gif;
                        var previewElement=document.querySelector('#preview');
                        previewElement.innerHTML='';
                        previewElement.appendChild(img);
                    })
                };

                function updatePreview(){
                    dytext.dev = _this.options.divider
                    dytext.word = _this.options.text
                    dytext.setFontSize(_this.options.fontSize)
                    dytext.seed= 0.03 * _this.options.speed

                    if (_this.options.type === 'png') {
                        createImg();
                    }else{
                        createGif();
                    };
                };
                _this.updatePreview = updatePreview
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
                let intent = new Intent({
                    action: 'http://webintent.yunser.com/?',
                    type: 'image/*',
                    data: this.resultImage
                })
                navigator.startActivity(intent, data => {
                    console.log('成功')
                    this.loadDataUrl(data)
                }, data => {
                    console.log('失败')
                })
            }
        },
        watch: {
            options: {
                deep: true,
                handler() {
                    this.updatePreview()
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
    .slider {
        width: 256px;
    }
    .preview {
        background-color: #1F0D1C;
    }
    .tip {
        margin-bottom: 16px;
        color: #999;
    }
</style>