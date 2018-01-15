<template>
    <div class="form-item">
        <div class="form-item-left">{{ label }}</div>
        <div class="form-item-right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            label: {
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

<style lang="scss">
    .form-item {
        overflow: hidden;
        margin-bottom: 8px;
    }
    .form-item-left {
        float: left;
        width: 100px;
        height: 2px;
        line-height: 40px;
    }
    .form-item-right {
        float: left;
        width: 100px;
    }
</style>
