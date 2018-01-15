<template>
    <my-page title="关于">
        <div class="about-box">
            <img class="logo" src="/static/img/logo.svg">
            <div class="version">图片处理工具 v1.1.0</div>
            <div class="copyright">© 2018 <a href="https://yunser.com">云设</a></div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about-box {
        text-align: center;
    }
    .logo {
        display: block;
        width: 64px;
        margin: 80px auto 16px auto;
    }
    .version {
        color: #999;
    }
    .copyright {
        position: absolute;
        bottom: 16px;
        width: 100%;
        text-align: center;
        a {
            color: inherit;
        }
    }
</style>
