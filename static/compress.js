/**
 * Created by cjh1 on 2017/7/22.
 */

var app = new Vue({
    el: '#app',
    data: function () {
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
    mounted: function () {
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
})