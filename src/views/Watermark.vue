<template>
    <my-page title="添加水印">
        <div class="layout-left">
            <canvas id="canvas" width="300" height="200"   style="border:1px solid #ccc; background-color: #ccc"> 您的浏览器不支持Canvas，请升级浏览器到最新版本再尝试 </canvas>
            <div>

            </div>
            <p>
                <ui-radio class="radio" label="本地图片" name="group" nativeValue="local" v-model="imageType"/>
                <ui-radio class="radio" label="网络图片" name="group" nativeValue="network" v-model="imageType"/>
            </p>
            <p v-if="imageType === 'local'">
                <ui-raised-button class="file-select-btn" label="选择图片" primary>
                    <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
                </ui-raised-button>
            </p>
            <div v-if="imageType === 'network'">
                <ui-text-field v-model="url" hintText=""/>
                <p>
                    <ui-raised-button label="设置图片" @click="setImage" primary />
                </p>
            </div>

            <!--<p>
                <input type="radio" name="pic" value="localfile"/>
                <input type="file" id="j_file" value=""/>
            </p>-->

            <p>
                .水印内容
                <ui-text-field v-model="options.text" hintText=""/>
            </p>
            <p>
                <ui-raised-button label="设置水印" @click="setText" />
            </p>
            <br />
        </div>
        <ui-paper class="layout-right" zDepth="1" v-if="options.text.length">
            <h2>效果</h2>
            <div>
                <my-form-item label="字体大小(px)">
                    <ui-select-field v-model="options.fontSize">
                        <ui-menu-item :value="12" title="12px"/>
                        <ui-menu-item :value="13" title="13px"/>
                        <ui-menu-item :value="14" title="14px"/>
                        <ui-menu-item :value="15" title="15px"/>
                        <ui-menu-item :value="16" title="16px"/>
                        <ui-menu-item :value="18" title="18px"/>
                    </ui-select-field>
                </my-form-item>
                <my-form-item label="字体颜色">
                    <ui-select-field v-model="options.color">
                        <ui-menu-item value="#000000" title="黑色"/>
                        <ui-menu-item value="#AEAEAE" title="灰色"/>
                        <ui-menu-item value="#0000FF" title="蓝色"/>
                        <ui-menu-item value="#FFFF00" title="黄色"/>
                        <ui-menu-item value="#008000" title="绿色"/>
                        <ui-menu-item value="#871F78" title="紫色"/>
                    </ui-select-field>
                </my-form-item>
                <my-form-item label="字体名称">
                    <ui-select-field v-model="options.fontFamily">
                        <ui-menu-item value="微软雅黑" title="微软雅黑"/>
                        <ui-menu-item value="黑体" title="黑体"/>
                        <ui-menu-item value="宋体" title="宋体"/>
                        <ui-menu-item value="Arial" title="Arial"/>
                    </ui-select-field>
                </my-form-item>
                <my-form-item label="字体样式">
                    <ui-select-field v-model="options.fontStyle">
                        <ui-menu-item value="normal" title="正常"/>
                        <ui-menu-item value="bold" title="加粗"/>
                        <ui-menu-item value="italic" title="斜体"/>
                    </ui-select-field>
                </my-form-item>
                <my-form-item label="X 坐标">
                    <ui-text-field v-model.number="options.x" hintText=""/>
                    <div>
                        <ui-slider v-model.number="options.x" :max="maxX" :step="1"/>
                    </div>
                </my-form-item>
                <my-form-item label="Y 坐标">
                    <ui-text-field v-model.number="options.y" hintText=""/>
                    <div>
                        <ui-slider v-model.number="options.y" :max="maxY" :step="1"/>
                    </div>
                </my-form-item>
            </div>
            <p>
                <!--<label>加阴影 <input type="checkbox" id="j_shadow" /></label>-->
            </p>
            <p>
                <!--<input type="button" class="btn" id="j_reset" value="重　置" />-->
            </p>
        </ui-paper>
    </my-page>
</template>

<script>
    class Watermark {
        constructor(elem) {
            this.canvas = document.getElementById(elem)
            this.ctx = this.canvas.getContext('2d')
            this.img = new Image()
            this.text = '水印'
            this.onImageLoaded = null
        }

        setImage(img) {
            this.img = img
            this.canvas.width = this.img.width
            this.canvas.height = this.img.height
            this.ctx.drawImage(this.img, 0, 0)
            this.onImageLoaded && this.onImageLoaded(this.img)
        }

        setImageUrl(url) {
            this.img.onload = () => {
                this.canvas.width = this.img.width
                this.canvas.height = this.img.height
                setTimeout(() => {
                    this.ctx.drawImage(this.img, 0, 0)
                    this.onImageLoaded && this.onImageLoaded(this.img)
                }, 100)
            }
            this.img.src = url
        }

        draw(options) {
//            ctx.shadowOffsetX = shadowOffset
//            ctx.shadowOffsetY = shadowOffset
//            ctx.shadowColor = '#AEAEAE'
//            ctx.shdowBlur = 3
            this.ctx.font = `${options.fontStyle} ${options.fontSize}px ${options.fontFamily}`
            this.ctx.fillStyle = options.color
            this.ctx.drawImage(this.img, 0, 0)
            this.ctx.fillText(options.text, options.x, options.y)
        }
    }

    export default {
        data () {
            return {
                imageType: 'local',
                url: 'http://www.baidu.com/img/baidu_logo.gif',
                options: {
                    fontSize: 13,
                    color: '#000000',
                    fontFamily: '微软雅黑',
                    fontStyle: 'normal',
                    x: 10,
                    y: 20,
                    text: '云设工具'
                },
                maxX: 200,
                maxY: 100
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
                this.watermark = new Watermark('canvas')
                this.watermark.onImageLoaded = img => {
                    console.log('回到')
                    this.maxX = img.width
                    this.maxY = img.height
                    console.log(this.maxX)
                }
                this.watermark.setImageUrl('http://www.baidu.com/img/baidu_logo.gif')
            },
            setImage() {
                this.watermark.setImageUrl(this.url)
            },
            setText() {
                this.watermark.draw(this.options)
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
                            _this.watermark.setImage(img)
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
            },
            sizeStr: function (size) {
                let originSize = size / 1024
                if (originSize < 1024) {
                    originSize = Math.floor(originSize) + ' KB'
                } else {
                    originSize = Math.floor(originSize / 1024) + ' MB'
                }
                return originSize
            }
        },
        watch: {
            options: {
                handler(newValue, oldValue) {
                    this.watermark.draw(this.options)
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .layout-left {
        float: left;
        width: 500px;
        margin-right: 24px;
    }
    .layout-right {
        float: left;
        width: 300px;
        padding: 16px;
    }
</style>