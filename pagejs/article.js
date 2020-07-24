import tableMixin from '../js/table.mixin.js'
new Vue({
  mixins: [tableMixin],
  el: '#app',
  data() {
    return {
      search: '',
      value: [],
      articleList: [],
    }
  },
  methods: {
    async Fn_initAsync() {
      try {
        const { data, flag } = await API.php.get(API.constant.p_InfomationInfoList, {
          PageIndex: this.paginationObj.page_num,
          PageSize: this.paginationObj.page_size
        })
        console.log(data, flag)
        if (flag === API.FLAG) {
          console.log('验证码发送成功')
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleChange(value) {
      console.log(value);
    }
  },
  created() {
    this.articleList = [...Array(5)].map(v => ({
      image: 'http://stc.zjol.com.cn/g1/M001956CggSDVoNReiAJiyUAAcKaKSFtLQ149.jpg',
      title: '塔河岸边罗布人 沙海深处驼铃韵...',
      content: '7年是以北欧极简主义的风格来设计的。我喜欢简单的人，简单的生活。简单而不平凡这就是我人生的理想。在每个房间风格上我们都采用了不一样的设计风格。同时我们爱丽江。也爱这里的乡土弄清，所以让客人们能在这里感受简单和不平凡的生活品质外，也能感受到丽江当地的特色与氛氛围。'
    }))
  },
  components: {
    Zheader,
    Zfooter,
    'article-item': articleItem,
    'z-aside': Zaside
  }
})