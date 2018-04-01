<template>
    <my-page title="占位图片" :page="page">
        <ui-row>
            <div>
                <ui-text-field v-model.number="width" label="宽"/>
            </div>
            <div>
                <ui-text-field v-model.number="height" label="高"/>
            </div>
            <div>
                <ui-text-field v-model="text" label="文字"/>
            </div>
            <div>
                <ui-text-field v-model="color" label="文字颜色"/>
            </div>
            <div>
                <ui-text-field v-model="bgColor" label="背景颜色"/>
            </div>
            
            <div>
                <ui-raised-button class="btn-copy" label="复制链接" :data-clipboard-text="imgSrc"/>
            </div>
        </ui-row>
        <ui-row>
            <div class="url">
                &lt;img src="{{ imgSrc }}"&gt;
            </div>
            <img :src="imgSrc">
        </ui-row>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard
//    const FileSaver = require('file-saver')
//    const FileSaver = window.FileSaver

    export default {
        data () {
            return {
                width: 160,
                height: 160,
                text: 'yunser',
                color: 'fff',
                bgColor: '09f',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/temp/help'
                        }
                    ]
                }
            }
        },
        computed: {
            imgSrc() {
                return `https://placehold.it/${this.width}x${this.height}/${this.bgColor}/${this.color}?text=${this.text}`
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
                this.clipboard = new Clipboard('.btn-copy')
                this.clipboard.on('success', function(e) {
                    console.log('复制成功')
                    e.clearSelection()
                })

                this.clipboard.on('error', function(e) {
                    console.log('复制失败')
                })
            },
            reset () {
                this.activeStep = 0
            }
        }
    }
</script>

<style scoped>
    .url {
        margin-bottom: 16px;
    }
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