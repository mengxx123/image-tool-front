<template>
    <ui-page name="todo" title="图片压缩">
        <div>
            <!--<div class="setting">
                <h2 class="setting-title">设置</h2>
                小于<input v-model.number="minSize">K的图片不压缩
            </div>-->
            <input class="file-select" id="file" type="file" accept="image/*">
            <div v-if="result">
                <div class="row">
                    <div class="col-sm-6">
                        <h3>原图片</h3>
                        <img class="display-image" :src="originSrc">
                        <div>{{ result.originSize }}</div>
                    </div>
                    <div class="col-sm-6">
                        <h3>压缩后的图片</h3>
                        <img class="display-image" :src="newSrc">
                        <div>{{ result.newSize }}</div>
                    </div>
                </div>
                <div>图片大小缩减了 <span class="percent">{{ result.percent }}%</span></div>
            </div>
        </div>

        <article class="article">
            <h2>工具介绍</h2>
            <p>这是一个图片在线压缩工具。</p>
            <!--<p>这是一个免费的在线图片压缩小工具, 可以非常方便得将PNG/GIF/JPG图片大小优化到极限，为移动设备（如：手机平版）访问节约数据流量，提高访问速度。
                简洁又漂亮的界面响应处理速度极快，并且支持多个文件批量上传。
                依赖专业专业算法支持，在图片体积大大减小后, 仍能让清晰度保持和原版一样。
                如果觉得不错，千万不要不收藏！(快捷键Ctrl+D)</p>-->
        </article>
    </ui-page>
</template>

<script>
    const lrz = window.lrz

    export default {
        data () {
            return {
                originSrc: null,
                newSrc: null,
                minSize: 0,
                result: null
            }
        },
        computed: {
            routeUrl: function () {
                return '/' + this.$route.params.lang + '/home'
            }
        },
        mounted() {
            var _this = this
            document.querySelector('#file').addEventListener('change', function () {
                var file = this.files[0]

                if (file.size / 100 < _this.minSize) {
                    console.log('不压缩')
                    console.log(file.size)
                    return
                }

                _this.result = {}

                var reader = new FileReader()
                reader.onloadend = function () {
                    _this.originSrc = reader.result
                }
                reader.readAsDataURL(file)
                _this.result.originSize = _this.sizeStr(file.size)

                lrz(file)
                        .then(function (rst) {
                            // 处理成功会执行
                            console.log(rst)
                            console.log(file)
                            console.log('压缩后文件')
                            console.log(rst.file)
                            _this.result.newSize = _this.sizeStr(rst.file.size)
//                        console.log(rst.base64)
                            console.log(rst.formData)

                            _this.newSrc = rst.base64

                            _this.result.percent = Math.floor((file.size - rst.file.size) / file.size * 100)
                        })
                        .catch(function (err) {
                            console.log('失败', err)

                            // 处理失败会执行
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        })
            })
        },
        methods: {
            // 初始化
            init() {
            },
            sizeStr: function (size) {
                var originSize = size / 1024
                if (originSize < 1024) {
                    originSize = Math.floor(originSize) + ' KB'
                } else {
                    originSize = Math.floor(originSize / 1024) + ' MB'
                }
                return originSize
            }
        }
    }
</script>

<style scoped>
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
