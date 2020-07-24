const app = new Vue({
  el: '#app',
  data() {
    return {
      info: {},
      search: '',
      value: [],
      video: null,
      commentList: [],
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.video = videoPlayerInstance('video', this.info.url, this.info.poster, {
        width: '800px',
        height: '546px',
      })
    })
  },
  created() {
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
    this.info = {
      title: '',
      poster: 'http://www.yuanlinshigong.com/data/upload/image/20180313/1520926816936983.jpg',
      url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
      article_list: [{
        title: '轻舟已过万重山，香港明天更美好'
      }, {
        title: '轻舟已过万重山，香港明天更...'
      }, {
        title: '轻舟已过万重山，香港明天更...'
      }, {
        title: '轻舟已过万重山，香港明天更...'
      }, {
        title: '轻舟已过万重山，香港明天更...'
      }, {
        title: '轻舟已过万重山，香港明天更...'
      }],
      video_list: [{
        title: '斥巨资推动生态文 明和美丽乡村...',
        image: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      }, {
        title: '斥巨资推动生态文 明和美丽乡村...',
        image: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      }, {
        title: '斥巨资推动生态文 明和美丽乡村...',
        image: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      }, {
        title: '斥巨资推动生态文 明和美丽乡村...',
        image: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      }, {
        title: '斥巨资推动生态文 明和美丽乡村...',
        image: 'https://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
      }]
    }
  },
  components: {
    Zheader,
    Zfooter,
    'comment-list': commentList,
    'z-aside': Zaside
  }
})