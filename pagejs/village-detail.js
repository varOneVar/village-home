scrollTo(0, 0)
Vue.use(VueBaiduMap.default, {
  ak: '9yDUaKGksMcvbggD3gnoqsrDG3uzKEAZ'
})
const app = new Vue({
  el: '#app',
  data() {
    return {
      villageImage: './images/detail_avatar@2x.png',
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      radio: 1,
      titleStyle: {
        fontSize: '28px',
        color: '#454444',
        fontWeight: 500
      },
      search: '',
      number2Show: true,
      pushTypeList: [{
        label: '村景',
        value: 1
      }, {
        label: '特色照片',
        value: 2
      }, {
        label: '特色资讯',
        value: 3
      }, {
        label: '特色视频',
        value: 4
      }],
      villageList: [{
        image: 'http://img.mp.itc.cn/upload/20170712/4c4d31315706487db26956feb963a726_th.jpg',
        title: '岳阳县张谷英镇张谷英村',
        subTitle: '岳阳县-张谷英镇-张谷英村'
      }, {
        image: 'http://img.mp.itc.cn/upload/20170712/4c4d31315706487db26956feb963a726_th.jpg',
        title: '岳阳县张谷英镇张谷英村',
        subTitle: '岳阳县-张谷英镇-张谷英村'
      }, {
        image: 'http://img.mp.itc.cn/upload/20170712/4c4d31315706487db26956feb963a726_th.jpg',
        title: '岳阳县张谷英镇张谷英村',
        subTitle: '岳阳县-张谷英镇-张谷英村'
      }, {
        image: 'http://img.mp.itc.cn/upload/20170712/4c4d31315706487db26956feb963a726_th.jpg',
        title: '岳阳县张谷英镇张谷英村',
        subTitle: '岳阳县-张谷英镇-张谷英村'
      }, {
        image: 'http://img.mp.itc.cn/upload/20170712/4c4d31315706487db26956feb963a726_th.jpg',
        title: '岳阳县张谷英镇张谷英村',
        subTitle: '岳阳县-张谷英镇-张谷英村'
      }],
      info: {
        store: 4,
      },
      articleList: [],
      videoList: [],
      headerVideoList: [],
      vlist: [],
      hvlist: [],
      commentList: [],
      rankList: [],
      navActiveIdx: 0,
      navHashList: []
    }
  },
  methods: {
    markerDragend(event) {
      console.log(event)
    },
    searchcomplete(result) {
      console.log(result)
    }
  },
  mounted() {
    this.vlist = []
    this.hvlist = []
    this.$nextTick(() => {
      this.videoList.forEach((v, i) => {
        v.forEach((e, j) => {
          const video = videoPlayerInstance(`video-${i}-${j}`, e.url, e.poster, {
            width: '380px',
            height: '260px',
          })
          this.vlist.push(video)
        })
      });
      this.headerVideoList.forEach((v, i) => {
        const video = videoPlayerInstance(`video-header-${i}`, v.url, v.poster, {
          width: '800px',
          height: '480px',
        })
        this.hvlist.push(video)
      })
    })
  },
  created() {
    this.articleList = [...Array(4)].map(v => ({
      image: 'http://stc.zjol.com.cn/g1/M001956CggSDVoNReiAJiyUAAcKaKSFtLQ149.jpg',
      title: '塔河岸边罗布人 沙海深处驼铃韵...',
      content: '罗布人村寨位于尉犁县城西南35公里处，距库尔勒市南85公里处。村寨方圆72平方公里...'
    }))
    //   this.articleList = chunkArr(ar)
    const arr = [...Array(3)].map(v => ({
      url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
      title: '美丽乡村：黄河边上美自来',
      poster: 'http://www.yuanlinshigong.com/data/upload/image/20180313/1520926816936983.jpg',
      num: 28
    }))
    this.videoList = chunkArr(arr, 3)
    this.headerVideoList = [...arr, ...arr]
    this.rankList = [...Array(4)].map(v => ({
      rank: 1,
      village_name: '瓜皮村',
      imgUrl: 'http://www.yuanlinshigong.com/data/upload/image/20180313/1520926816936983.jpg',
      score: 50
    }))
    this.commentList = [...Array(2)].map(v => ({
      avatar: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      name: '西瓜不太圆',
      time: '2020-06-20',
      is_like: 1,
      like_num: 12,
      comment_content: '这家住宿距离湖南大学有3.1公里，距离爱晚亭有3.2公里。最近的机场是长沙黄花国际机场，距离麓墅精品民宿有29公里。',
      reply_list: [{
        reply_name: '饭团不太大',
        reply_content: '这家住宿距离湖南大学有3.1公里，距离爱晚亭有3.2公里。最近的机场是长沙黄花国际机场，距离麓墅精品民宿有29公里。',
      }]
    }))
    this.navHashList = [{
      label: '乡村简介',
      value: '#village-desc',
      top: 0
    }, {
      label: '乡村位置',
      value: '#village-addr',
      top: 0
    }, {
      label: '特色照片',
      value: '#village-piture',
      top: 0
    }, {
      label: '特色资讯',
      value: '#village-article',
      top: 0
    }, {
      label: '特色视频',
      value: '#village-video',
      top: 0
    }, {
      label: '本村动态',
      value: '#village-action',
      top: 0
    }]
  },
  components: {
    Zheader,
    Zfooter,
    'home-title': homeTitle,
    'article-item': articleItem,
    'video-item': videoItem,
    'z-aside': Zaside,
    'comment-list': commentList,
  }
})