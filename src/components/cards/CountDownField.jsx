const m = require('mithril')

import ConferenceField from './ConferenceField.jsx'

export default class CountDownField {
  constructor(vnode) {
    this.now =  new Date().getTime()
    this.deadline = vnode.attrs.fieldValue
    this.countDownDate = new Date(this.deadline).getTime()
    this.timeLeft = this.getTimeLeft()
    this.distance = this.countDownDate - this.now
  }

  getTimeLeft() {
    const now = new Date().getTime();
    this.distance = this.countDownDate - now;

    const days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

    return days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
  }


  countDown() {
    const countDownInterval = setInterval(()=> {
      this.timeLeft = this.getTimeLeft()
      m.redraw()
      if (this.distance < 0) {
        clearInterval(countDownInterval)
        this.timeLeft = 'EXPIRED'
      }
    }, 1000)
  }

  oninit(vnode) {
    this.countDown(vnode.attrs.fieldValue)
  }

  view() {
    return <ConferenceField fieldValue={this.timeLeft} />
  }
}
