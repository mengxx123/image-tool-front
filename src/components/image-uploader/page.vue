<template>
    <div>
        <ui-float-button class="float-button" icon="file_upload" title="上传图片">
            <ui-icon value="file_upload" />
            <input type="file" class="ui-file-button" multiple="multiple" accept="image/*" @change="fileChange($event)">
        </ui-float-button>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            onData: {
                type: Function
            }
        },
        mounted() {
        },
        methods: {
            async fileChange(e) {
                let files = e.target.files
                if (!files.length) {
                    this.$message({
                        type: 'danger',
                        text: '请选择文件'
                    })
                    return
                }
                let results = []
                for (let i = 0; i < files.length; i++) {
                    results.push({
                        fileName: files[i].name,
                        data: await this.getDataUrl(files[i])
                    })
                }
                console.log('返回')
                this.$emit('data', results)
                this.onData && this.onData(results)
            },
            getDataUrl(file) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.onloadend = e => {
                        console.log('Promise返回了', e.target.result)
                        resolve(e.target.result)
                    }
                    reader.readAsDataURL(file)
                })
            },
            uploadFile() {
                let input = document.createElement('INPUT')
                input.setAttribute('type', 'file')
                input.setAttribute('accept', 'image/*')
                input.addEventListener('change', async e => {
                    let files = e.target.files
                    let results = []
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i]
                        results.push({
                            fileName: file.name,
                            data: await this.getDataUrl(file)
                        })
                    }
                    this.$emit('data', results)
                    this.onData && this.onData(results)
                }, false)
                input.click()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
