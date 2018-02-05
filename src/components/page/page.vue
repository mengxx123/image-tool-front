<template>
    <ui-page :title="title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <ui-appbar title=""></ui-appbar>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="图片压缩" to="/">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="修改图片大小" to="/size">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="图片加水印" to="/watermark">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="身份证水印" to="/watermark/idCard">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="图片取色" to="/color">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="格式转换" to="/format">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="帮助" to="/help">
                    <ui-icon slot="left" value="send"/>
                </ui-list-item>
                <ui-list-item title="关于" to="/about">
                    <ui-icon slot="left" value="send"/>
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
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
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            document.title = this.title || this.page.title
        },
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
