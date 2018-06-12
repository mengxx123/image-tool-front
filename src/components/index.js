import page from './page'
import saver from './saver'
import row from './row'
import formItem from './formItem'
import imageUploader from './image-uploader'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ui-row', row)
        Vue.component('my-form-item', formItem)
        Vue.component('saver', saver)
        Vue.component('image-uploader', imageUploader)
    }
}
