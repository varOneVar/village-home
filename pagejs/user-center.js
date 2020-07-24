Vue.use(VueBaiduMap.default, {
  ak: '9yDUaKGksMcvbggD3gnoqsrDG3uzKEAZ'
})
const app = new Vue({
  el: '#app',
  data() {
    return {
      activeIndex: 0,
      isComponent: 'village-manager',
      flag: 'image',
      title: '乡村信息',
      navList: [],
    }
  },
  methods: {
    changeNav({ title, value, label, flag }, idx) {
      this.activeIndex = idx
      this.isComponent = value
      this.title = title
      flag && (this.flag = flag)
    },
  },
  created() {
    this.navList = [{
      label: '村务管理',
      value: 'village-manager',
      title: '乡村信息',
    }, {
      label: '发布照片',
      value: 'upload-item',
      title: '特色照片管理',
      flag: 'image'
    }, {
      label: '发布资讯',
      value: 'upload-item',
      title: '特色资讯管理',
      flag: 'article'
    }, {
      label: '发布视频',
      value: 'upload-item',
      title: '特色视频管理',
      flag: 'video'
    }, {
      label: '个人资料',
      value: 'person-info',
      border: true,
      title: '基本信息',
    }, {
      label: '收藏乡村',
      value: 'collect-village',
      title: '收藏列表',
    }, {
      label: '密码设置',
      value: 'password-set',
      title: '密码修改',
    }]
  },
  components: {
    Zheader,
    Zfooter,
    'password-set': passwordSet,
    'village-manager': villageManager,
    'upload-item': uploadItem,
    'person-info': personInfo,
    'collect-village': collectVillage
  }
})