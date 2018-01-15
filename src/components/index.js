import page from './page'
import row from './row'
import formItem from './formItem'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ui-row', row)
        Vue.component('my-form-item', formItem)
    }
}
