<template>
    <header class="page-header">
        <ui-appbar :title="title">
            <ui-icon-button icon="menu" slot="left"/>
            <ui-flat-button label="更多工具" href="http://tool.yunser.com/" target="_blank" slot="right"/>
        </ui-appbar>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
