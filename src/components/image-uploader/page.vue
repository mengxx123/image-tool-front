<template>
    <div>
        <ui-float-button class="float-button" icon="file_upload" @click="uploadFile" title="上传图片"/>
    </div>
</template>

<script>
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
            uploadFile() {
                let input = document.createElement('INPUT')
                input.setAttribute('type', 'file')
                input.setAttribute('accept', 'image/*')
                input.addEventListener('change', e => {
                    let file = e.target.files[0]
                    let reader = new FileReader()
                    reader.onloadend = e => {
                        this.$emit('data', e.target.result)
                        this.onData && this.onData(e.target.result)
                    }
                    reader.readAsDataURL(file)
                }, false)
                input.click()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
