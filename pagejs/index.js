scrollTo(0, 0)
const app = new Vue({
  el: '#app',
  data() {
    return {
      titleStyle: {
        fontSize: '28px',
      },
      info: {},
      search: '',
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
      }],
      articleList: [],
      videoList: [],
      vlist: [],
      commentList: []
    }
  },
  methods: {
    async Fn_initAsync() {
      try {
        const { data, flag } = await API.java.get(API.constant.j_getInformation)
        console.log(data, flag)
        if (flag === API.FLAG) {

        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.vlist = []
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
    })
  },
  created() {
    const ar = [...Array(4)].map(v => ({
      image: 'http://stc.zjol.com.cn/g1/M001956CggSDVoNReiAJiyUAAcKaKSFtLQ149.jpg',
      title: '塔河岸边罗布人 沙海深处驼铃韵...',
      content: '罗布人村寨位于尉犁县城西南35公里处，距库尔勒市南85公里处。村寨方圆72平方公里...'
    }))
    this.articleList = chunkArr(ar)
    const arr = [...Array(6)].map(v => ({
      url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
      title: '美丽乡村：黄河边上美自来',
      poster: 'http://www.yuanlinshigong.com/data/upload/image/20180313/1520926816936983.jpg',
      num: 28
    }))
    this.videoList = chunkArr(arr, 3)
    const arr1 = [...Array(9)].map(v => ({
      avatar: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
      name: '李狗蛋儿',
      sign: '走自己的路，让隔壁村无路可走',
      score: 3.5,
      comment: '罗布人村寨位的风景还是很漂亮的，沱江两岸依水而建的吊脚楼与清澈的江水相映成趣，不仅山川秀美，而且人杰地灵，确切的说，入夜后的凤凰才是它最有魅力，也是我最喜欢的模样...'
    }))
    this.commentList = arr1
    this.Fn_initAsync()
  },
  components: {
    Zheader,
    Zfooter,
    'home-title': homeTitle,
    'village-item': villageItem,
    'article-item': articleItem,
    'video-item': videoItem,
    'home-comment': homeComment,
    'z-aside': Zaside
  }
})