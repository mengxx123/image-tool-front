<template>
    <ui-drawer class="drawer download-box" right :open="true" :docked="false" @close="toggle()">
        <ui-appbar title="下载">
            <ui-icon-button icon="close" @click="close" slot="left" />
        </ui-appbar>
        <div class="body">

        </div>
        <canvas class="canvas" id="canvas" ref="canvas"></canvas>
        <ui-row class="btns">
            <ui-raised-button class="btn" label="PNG 下载" secondary @click="downloadPng"/>
            <ui-raised-button class="btn" label="JPG 下载" secondary @click="downloadJpg"/>
        </ui-row>
        <ui-row class="btns">
            <ui-raised-button class="btn" label="WebP 下载" secondary @click="downloadWebP"/>
            <ui-raised-button class="btn" label="SVG 下载" secondary @click="downloadSvg"/>
        </ui-row>
    </ui-drawer>
</template>

<script>
    const saveAs = window.saveAs
    const FILE_NAME = 'yunser'

    export default {
        data() {
            return {
                open: true,
                docked: true
            }
        },
        props: {
            src: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let img = new Image()
                img.onload = () => {
                    let canvas = this.$refs.canvas
                    let ctx = canvas.getContext('2d')
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.width = img.width
                    ctx.height = img.height
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
                }
                img.src = this.src
            },
            toggle () {
                this.$emit('close')
            },
            close() {
                this.$emit('close')
            },
            downloadPng() {
                let canvas = this.$refs.canvas
                canvas.toBlob(function (blob) {
                    saveAs(blob, FILE_NAME + '.png')
                })
            },
            downloadJpg() {
                let canvas = this.$refs.canvas
                let ctx = canvas.getContext('2d')
                let dataUrl = canvas.toDataURL('image/png', 1)
                let img = new Image()
                img.onload = () => {
                    ctx.fillStyle = '#fff'
                    ctx.fillRect(0, 0, img.width, img.height)
                    ctx.drawImage(img, 0, 0)
                    canvas.toBlob(function (blob) {
                        saveAs(blob, FILE_NAME + '.jpg')
                    })
                }
                img.src = dataUrl
            },
            downloadWebP() {
                let canvas = this.$refs.canvas
                let ctx = canvas.getContext('2d')
                let dataUrl = canvas.toDataURL('image/webp', 1)
                let img = new Image()
                img.onload = () => {
                    ctx.drawImage(img, 0, 0)
                    canvas.toBlob(function (blob) {
                        saveAs(blob, FILE_NAME + '.webp')
                    })
                }
                img.src = dataUrl
            },
            downloadSvg() {
                let canvas = this.$refs.canvas
                let dataUrl = canvas.toDataURL('image/png', 1)
                let img = new Image()
                img.onload = () => {
                    let code = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="${img.width}px" height="${img.height}px" viewBox="0 0 ${img.width} ${img.height}" enable-background="new 0 0 ${img.width} ${img.height}" xml:space="preserve">
    <image width="${img.width}" height="${img.height}" x="0" y="0" xlink:href="${dataUrl}" />
</svg>
`
                    let file = new File([code], FILE_NAME + '.svg', {type: 'image/svg+xml;charset=utf-8'})
                    saveAs(file)
                }
                img.src = dataUrl
            }
        }
    }
</script>

<style lang="scss" scoped>
    .drawer {
        width: 100%;
        max-width: 400px;
    }
    .download-box {
    }
    .body {
        padding-top: 80px;
    }
    .canvas {
        display: block;
        max-width: 80%;
        margin: 0 auto 24px auto;
        /*margin-top: 80px;*/
        border: 1px solid #ddd;
    }
    .btns {
        text-align: center;
        .btn {
            margin-right: 8px;
        }
    }
</style>
