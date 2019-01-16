import page from './page'
import saver from './saver'
import row from './row'
import formItem from './formItem'
import imageUploader from './image-uploader'
// import colorPicker from './color-picker/dialog.vue'
import colorPicker from './color-picker'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ui-row', row)
        Vue.component('my-form-item', formItem)
        Vue.component('saver', saver)
        Vue.component('image-uploader', imageUploader)
        Vue.component('color-picker', colorPicker)
        Vue.component('app-list', appList)
    }
}
