const app = new Vue({
  el: '#app',
  data() {
    return {
      search: '',
      value: [],
      articleList: [],
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
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
    const arr = [...Array(9)].map(v => ({
      url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
      title: '美丽乡村：黄河边上美自来',
      poster: 'http://www.yuanlinshigong.com/data/upload/image/20180313/1520926816936983.jpg',
      num: 28
    }))
    this.videoList = chunkArr(arr, 3)
  },
  components: {
    Zheader,
    Zfooter,
    'video-item': videoItem,
    'z-aside': Zaside
  }
})