import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faFilter, faUser } from '@fortawesome/free-solid-svg-icons'
import { faVine } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlay, faFilter, faUser, faVine)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default FontAwesomeIcon