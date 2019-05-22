<template>
    <my-page title="身份证水印" :page="page">
        <div class="common-container container">
            <div class="layout-left">
                <canvas id="canvas" width="300" height="200"   style="border:1px solid #ccc; background-color: #ccc"> 您的浏览器不支持Canvas，请升级浏览器到最新版本再尝试 </canvas>
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
                <p>
                    <ui-text-field v-model="options.text" label="水印内容" hintText=""/>
                </p>
                <div class="btns">
                    <ui-raised-button class="btn" label="设置水印" @click="setText" />
                    <ui-raised-button class="btn" label="下载" @click="download" />
                </div>
                <br />
            </div>
            <ui-paper class="layout-right" :zDepth="1" v-if="options.text.length">
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
                            <ui-menu-item :value="19" title="19px"/>
                            <ui-menu-item :value="20" title="20px"/>
                            <ui-menu-item :value="21" title="21px"/>
                            <ui-menu-item :value="22" title="22px"/>
                            <ui-menu-item :value="23" title="23px"/>
                            <ui-menu-item :value="24" title="24px"/>
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
                    <my-form-item label="水印透明度">
                        <ui-text-field v-model.number="options.opacity" hintText=""/>
                        <div>
                            <ui-slider v-model.number="options.opacity" :max="1" :step=".01"/>
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
        </div>
    </my-page>
</template>

<script>
    const saveAs = window.saveAs

    let Config = {
        rotate: 15,
        xSpace: 20,
        ySpace: 20,
        xStart: -50,
//        yStart: 20
        yStart: -120
    }

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

        setImageUrl(url, callback) {
            this.img.onload = () => {
                this.canvas.width = this.img.width
                this.canvas.height = this.img.height
                setTimeout(() => {
                    this.ctx.drawImage(this.img, 0, 0)
                    this.onImageLoaded && this.onImageLoaded(this.img)
                    callback && callback()
                }, 100)
            }
            this.img.src = url
        }

        draw(options) {
//            ctx.shadowOffsetX = shadowOffset
//            ctx.shadowOffsetY = shadowOffset
//            ctx.shadowColor = '#AEAEAE'
//            ctx.shdowBlur = 3

            this.ctx.fillStyle = '#fff'
            this.ctx.fillRect(0, 0, this.img.width, this.img.height)
            this.ctx.globalAlpha = 1
            this.ctx.drawImage(this.img, 0, 0)

            this.ctx.font = `${options.fontStyle} ${options.fontSize}px ${options.fontFamily}`
            let textWidth = this.ctx.measureText(options.text).width
            let textHeight = 22 // TODO 写死
            console.log('image', textWidth, textHeight)
            var xSpace = Config.xSpace
            let ySpace = Config.ySpace
            let overHeight = textHeight + ySpace
            let overWidth = textWidth + xSpace
            let squareWidth = 0.72 * (this.img.width + this.img.height)
            console.log('image', this.img.width, this.img.height)
            for (var y = Config.yStart; y < squareWidth + overHeight; y += ySpace + textHeight) {
                for (var x = Config.xStart; x < squareWidth + overWidth; x += xSpace + textWidth) {
                    console.log(x, y)
                    this.ctx.save()
                    this.ctx.font = `${options.fontStyle} ${options.fontSize}px ${options.fontFamily}`
                    this.ctx.fillStyle = options.color
                    this.ctx.zIndex = 1
                    this.ctx.globalAlpha = options.opacity
                    this.ctx.rotate(Math.PI / 180 * Config.rotate)
                    this.ctx.fillText(options.text, x, y)
                    this.ctx.restore()
                }
            }
        }
    }

    export default {
        data () {
            return {
                imageType: 'local',
                url: 'http://www.baidu.com/img/baidu_logo.gif',
                options: {
                    fontSize: 20,
                    color: '#000000',
                    fontFamily: '微软雅黑',
                    fontStyle: 'normal',
                    x: 10,
                    y: 20,
                    text: '此证件仅供办理XX业务使用，他用无效',
                    opacity: 0.2
                },
                maxX: 200,
                maxY: 100,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/dcfaacb00d1911e9be41f39928385642',
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
//                this.watermark.setImageUrl('http://www.baidu.com/img/baidu_logo.gif')
                this.watermark.setImageUrl('/static/img/id_card.jpg', () => {
                    this.setText()
                })
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
            download() {
                let canvas = document.getElementById('canvas')
                canvas.toBlob(blob => {
                    saveAs(blob, 'img.tool.yunser.com在线图片处理.png')
                })
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

<style lang="scss" scoped>
    .layout-left {
        float: left;
        width: 600px;
        margin-right: 24px;
    }
    .layout-right {
        float: left;
        width: 300px;
        padding: 16px;
    }
    .btns {
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
</style>