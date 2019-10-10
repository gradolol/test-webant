import * as links from '@/utils/links'

export default {
  install: Vue => {
    Vue.prototype.$links = links
  },
}