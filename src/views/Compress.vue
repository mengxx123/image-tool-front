<template>
    <my-page title="图片压缩">
        <div>
            <!--<div class="setting">
                <h2 class="setting-title">设置</h2>
                小于<input v-model.number="minSize">K的图片不压缩
            </div>-->
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
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
    </my-page>
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
        },
        methods: {
            init() {
            },
            fileChange(e) {
                let _this = this
                var file = e.target.files[0]

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
    .file-select-btn {
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
