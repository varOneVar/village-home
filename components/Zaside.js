const Zaside = {
  data() {
    return {
      asideList: [
        {
          index: '1',
          url: './images/applets.png',
        }, {
          index: '2',
          url: './images/public_1@2x.png',
        }, {
          index: '3',
          url: './images/app_1@2x.png',
        }, {
          index: '4',
          url: './images/top@2x.png',
        }
      ]
    }
  },
  methods: {
    scrollToTop() {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      if (sTop > 0) {
          window.requestAnimationFrame(this.scrollToTop)
          window.scrollTo(0, sTop - sTop / 8)
      }
    },
    handleSelect(e) {
      const item = JSON.parse(e.target.dataset.item)
      console.log(item)
      switch(item.index) {
        case '1': {
          break;
        }
        case '2': {
          break;
        }
        case '3': {
          break;
        }
        case '4': {
          this.scrollToTop()
          break;
        }
        default:
          throw Error('出错了')
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: ['aside-wrapper', 'flex-column']
      },
      this.asideList.map(v => (h(
        'el-image',
        {
          class: ['aside-icon', 'pointer'],
          style: {
            width: '60px',
            height: '60px'
          },
          attrs: {
            'data-item': JSON.stringify(v)
          },
          props: {
              src: v.url,
              fit: 'cover'
          },
          nativeOn: {
            click: this.handleSelect
          },
        }
      )))
    )
  }
}

Vue.component('z-aside', Zaside)
