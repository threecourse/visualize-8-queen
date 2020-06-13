import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'

import * as Toastr from 'toastr'
import './/../node_modules/toastr/build/toastr.css'

const option = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
}

export default ({ app }, inject) => {
  inject('notifySuccess', (message) => {
    Toastr.options = { option }
    const re = /\n/g
    const escapedMessage = message.replace(re, '<br>')
    Toastr.success(escapedMessage)
  })

  inject('notifyInfo', (message) => {
    Toastr.options = { option }
    const re = /\n/g
    const escapedMessage = message.replace(re, '<br>')
    Toastr.info(escapedMessage)
  })
}
