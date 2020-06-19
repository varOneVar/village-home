const Zaside = {
  data() {
    return {
      status: 'login',
      asideList: [
        {
          index: '1',
          label: '首页',
          path: '/'
        }, {
          index: '2',
          label: '应用下载',
        }, {
          index: '3',
          label: '关于我们',
          path: '/path'
        }, {
          index: '3',
          label: '关于我们',
          path: '/path'
        }
      ]
    }
  },
  methods: {
    handleSelect(index) {
      console.log(index)
      // this.activeIndex = 
    }
  },
  template: `
    <ul class="zaside">

    </ul>
  `
}

Vue.component('z-aside', Zaside)
