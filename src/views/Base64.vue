<template>
    <my-page title="图片⇆Base64" :page="page">
        <ui-row>
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </ui-row>
        <ui-row>
            <section class="bezier-box">
                <img class="preview-img" :src="src" v-if="src">
                <div>{{ size }}</div>
            </section>
        </ui-row>
        <ui-row>
            <ui-text-field class="textarea" v-model="code" hintText="可以在这里输入base64，转换成图片" multiLine :rows="6" :rowsMax="6"/>
            <br>
            <ui-raised-button label="转换为图片" @click="toImage" />
        </ui-row>
    </my-page>
</template>

<script>
    /* eslint-disable */
//    const FileSaver = require('file-saver')
//    const FileSaver = window.FileSaver

    export default {
        data () {
            return {
                src: '',
                code: '',
                size: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/3f3111600d1711e9be41f39928385642',
                            target: '_blank'
                        }
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
            },
            fileChange(event) {
                let files = event.target.files
                if (!files.length) {
                    alert('请选择图片')
                    return
                }

                let file = files[0]
                if (!/image\/\w+/.test(file.type)) {
                    alert('请上传正确格式的图片文件')
                    return
                }
                let reader = new FileReader()
                reader.onload = e => {
                    this.code = e.target.result
                    this.size = '图片大小：' + Math.ceil(file.size / 1024) + 'KB'
                    this.src = e.target.result
                }
                reader.readAsDataURL(file)
            },
            toImage: function () {
                this.src = this.code;
            }
        }
    }
</script>

<style scoped>
.file-select {
    margin-bottom: 16px;
}
.preview-img {
    max-width: 300px;
    max-height: 300px;
    margin-bottom: 16px;
}
.textarea {
    width: 320px;
    margin-bottom: 16px;
}
</style>