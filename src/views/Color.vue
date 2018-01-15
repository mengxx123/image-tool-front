<template>
    <my-page title="图片取色器">
        <div class="form">
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
            <ui-raised-button label="列出所有颜色" class="demo-raised-button" secondary
                              v-if="resultSrc"
                              @click="getColor"/>
            <ui-checkbox class="checkbox" v-model="checkbox"
                         v-if="resultSrc"
                         label="是否省略相近颜色" />
        </div>
        <div v-if="resultSrc">
            <ui-row>
                <img id="pic" :src="resultSrc" @click="getClickColor($event)">
            </ui-row>
            <ui-row>
                <ul class="color-list" v-if="colors.length">
                    <li class="item clipboard-btn" v-for="color in colors" :data-clipboard-text="color">
                        <span class="color" :style="{'background-color': color}">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        {{ color }}
                        <!--<button class="clipboard-btn" >-->
                            <!---->
                        <!--</button>-->
                    </li>
                </ul>
            </ui-row>

        </div>
        <article class="article">
            <h2>说明</h2>
            <p>1. 直接点击图片进行取色。</p>
            <p>2. 点击“列出所有颜色”按钮，自动列出图片上的所有颜色（当图片比较大时，该操作会比较慢，请耐心等待）</p>
            <p>3. 点击颜色代码可直接将颜色代码复制到剪切板。</p>
        </article>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard

    function int2hex(num) {
        let r = parseInt(num).toString(16)
        if (r.length === 1) {
            return '0' + r
        }
        return r.toLowerCase()
    }
    function checkHasColor(arr, r, g, b) {
        for (let i = 0; i < arr.length; i++) {
            let n = equalsColor(arr[0], arr[1], arr[2], r, g, b)
            if (n >= 0.8) {
                return true
            }
        }
        return false
    }
    function equalsColor(r1, g1, b1, r2, g2, b2) {
        return (255 - Math.abs(r1 - r2) * 0.297 - Math.abs(g1 - g2) * 0.593 - Math.abs(b1 - b2) * 0.11) / 255
    }

    export default {
        data () {
            return {
                resultSrc: '',
                checkbox: true,
                colors: []
            }
        },
        mounted() {
            this.init()
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            init() {
                // drop
                document.addEventListener('dragenter', function(event) {
                    console.log(1)
                }, false)
                document.addEventListener('dragover', function(event) {
                    console.log(2)
                }, false)
                document.addEventListener('drop', function(e) {
                    e.preventDefault()
//                    let file = e.dataTransfer.files.item(0)
//                    console.log(file)
                    return false
                }, false)
                document.addEventListener('dragend', function(event) {
                    console.log(3)
                }, false)
                // copy to clipboard
                this.clipboard = new Clipboard('.clipboard-btn')
                this.clipboard.on('success', function(e) {
                    console.log('复制成功')
                    e.clearSelection()
                })

                this.clipboard.on('error', function(e) {
                    console.log('复制失败')
                })
            },
            fileChange(e) {
                let _this = this
                if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
                    alert('很遗憾，您浏览器版本太老了，无法使用我们的小工具 ！')
                    return
                }
                let files = e.target.files
                if (files.length > 0) {
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        _this.resultSrc = this.result
                    }
                    reader.readAsDataURL(files[0])
                }
            },
            getClickColor(e) {
                let _this = this
                e = e || window.event
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                let img = document.getElementById('pic')
                let w = img.width
                let h = img.height
                let newImg = new Image()
                newImg.onload = function () {
                    canvas.width = newImg.width
                    canvas.height = newImg.height
                    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height, 0, 0, newImg.width, newImg.height)

                    let size = {}
                    if (e['offsetX']) {
                        size.x = e.offsetX
                        size.y = e.offsetY
                    } else {
                        // TODO 这几句先注释掉，有空再说
//                        let offset = img.getBoundingClientRect()
//                        size.x = touch.clientX - offset.left
//                        size.y = touch.clientY - offset.top
                    }
                    let x = newImg.width * size.x / w
                    let y = newImg.height * size.y / h
                    let imgData = ctx.getImageData(x, y, 1, 1)
                    let color = '#' + int2hex(imgData.data[0]) + int2hex(imgData.data[1]) + int2hex(imgData.data[2])
                    _this.colors = [color]
                }
                newImg.src = img.src
            },
            getColor() {
                let _this = this
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')

                let img = new Image()
                img.onload = function () {
                    let w = img.width
                    let h = img.height
                    canvas.width = w
                    canvas.height = h
                    ctx.drawImage(img, 0, 0)
                    let omitted = false
                    let n
                    if (_this.checkbox) {
                        omitted = true
                        n = 10
                    } else {
                        n = 1
                    }
                    _this.colors = []
                    let check = []
                    for (let i = 0; i < w; i += n) {
                        for (let j = 0; j < h; j += n) {
                            let imgData = ctx.getImageData(i, j, n, n)
                            let color = '#' + int2hex(imgData.data[0]) + int2hex(imgData.data[1]) + int2hex(imgData.data[2])
                            if (omitted) {
                                if (!checkHasColor(check, imgData.data[0], imgData.data[1], imgData.data[2]) && _this.colors.indexOf(color) === -1) {
                                    _this.colors.push(color)
                                    check.push([imgData.data[0], imgData.data[1], imgData.data[2]])
                                }
                            } else {
                                if (_this.colors.indexOf(color) === -1) {
                                    _this.colors.push(color)
                                }
                            }
                        }
                    }
                }
                img.src = this.resultSrc
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color-list {
        .item {
            display: inline-block;
            width: 120px;
            margin-bottom: 8px;
            cursor: pointer;
        }
        /*.clipboard-btn {*/
            /*display: block;*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*background: none;*/
            /*border: none;*/
            /*outline: none;*/
        /*}*/
        .color {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 1px solid #999999;
        }
    }
    .form {
        padding: 1px;
        margin-bottom: 16px;
    }
    .file-select-btn {
        margin-right: 8px;
    }
    .checkbox {
        margin-top: 8px;
    }
</style>
