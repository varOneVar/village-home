const app = new Vue({
  el: '#login',
  data() {
    return {
      status: 'mobile', // 切换登录方式
      tipShow: false, // 手机号错误提示
      username: '', // 账号
      password: '',// 密码
      mobile: '', // 手机
      verifyCode: '', // 验证码
      startX: 0, // 按下鼠标起始位置
      diffX: 0, // 拖动滑块距离
      initTime: 60, // 发送验证码倒计时
      processWidth: 0, // 滑块左侧橙快宽度
      isSucess: false, // 是否拖动滑块成功
      slide: '拖动滑块验证', // 滑块文字
      year: new Date().getFullYear()
    }
  },
  methods: {
    resetData() { // 重置数据
      this.tipShow = false
      this.mobile = ''
      this.username = ''
      this.password = ''
      this.verifyCode = ''
      this.startX = 0
      this.diffX = 0
      this.initTime = 60
      this.processWidth = 0
      this.isSucess = false
      this.slide = '拖动滑块验证'

    },
    async submitData() { // 提交数据
      let api = 'p_Msglogin'
      let args = {}
      if (this.status === 'mobile') {
        api = 'p_Msglogin'
        if (!(/^\d{11}$/.test(this.mobile))) {
          this.$message.error('请输入正确的手机号！')
          return;
        }
        if (!(/^\d{4, 6}$/.test(this.verifyCode))) {
          this.$message.error('请输入正确的验证码！')
          return;
        }
        args = {
          MemberPhone: this.mobile,
          VerifyCode: this.verifyCode
        }
      } else {
        api = 'p_Login'
        if (!this.username || !this.password) {
          this.$message.error('账号或密码未输入！')
          return;
        }
        args = {
          MemberPhone: this.username,
          MemberPwd: this.password
        }
      }
      if (!this.isSucess) {
        this.$message.error('请拖动滑块验证！')
        return;
      }
      try {
        const { data, flag } = await API.java.post(API.constant[api], args)
        console.log(data, flag)
        if (flag === API.FLAG) {
          API.STORAGE.set('key', data.key)
          API.STORAGE.set('userInfo', data)
          this.$notify({
            title: '成功',
            message: '登录成功！',
            type: 'success'
          });
          window.location.href = '/index.html'
        }
      } catch (error) {
        console.error(error)
      }
      // ELEMENT.Message.error("success");
    },
    async sendVerifyCode() { // 发送验证码
      try {
        const { data, flag } = await API.java.post(API.constant.j_getVerifycode, {
          member_mobile: this.mobile
        })
        console.log(data, flag)
        if (flag === API.FLAG) {
          console.log('验证码发送成功')
        }
      } catch (error) {
        console.error(error)
      }
    },
    gainVerifyCode() { // 发送验证码处理函数
      if (!(/^\d{11}$/.test(this.mobile))) {
        this.$message.error('请输入正确的手机号！')
        return;
      }
      this.sendVerifyCode()
      if (this.initTime !== 60) return;
      simulateInterval(() => {
        if (this.initTime === 0) {
          this.initTime = 60
          return true
        }
        this.initTime--
      }, 1000)
    },
    verifyMobile() { // 验证手机号提示
      if (this.mobile && !(/^\d{11}$/.test(this.mobile))) {
        this.tipShow = true
      } else {
        this.tipShow = false
      }
    },
    slideSuccess() { // 滑块滑动成功
      this.slide = '验证通过'
      this.isSucess = true
      const slide = document.getElementById('slide')
      slide.removeEventListener('mousemove', this.mousemoveHandler)
      slide.removeEventListener('mouseup', this.mouseupHandler)
      slide.removeEventListener('mouseleave', this.mouseupHandler)
      slide.removeEventListener('mousedown', this.mousedownHandler)
    },
    getLimitNumber(num, min, max) { // 计算滑块松开反应
      console.log(num, min, max, 'num, min, max')
      if (num > max) {
        num = max;
      } else if (num < min) {
        num = min;
      }
      return num;
    },
    mouseupHandler(e) { // 滑块松开鼠标事件
      if (!this.isSucess) {
        this.processWidth = 0
        this.diffX = 0
      }
      const slide = document.getElementById('slide')
      console.log('触发up')
      slide.removeEventListener('mousemove', this.mousemoveHandler)
      slide.removeEventListener('mouseup', this.mouseupHandler)
      slide.removeEventListener('mouseleave', this.mouseupHandler)
    },
    mousemoveHandler(event) { // 滑块拖动鼠标事件
      const moveX = event.clientX;
      console.log(moveX, 'moveX')
      console.log(moveX - this.startX, 'moveX - this.startX')
      this.diffX = this.getLimitNumber(moveX - this.startX, 0, 240);
      this.processWidth = this.diffX;
      console.log(this.processWidth)
      if (this.diffX === 240) {
        this.slideSuccess();
      }
      event.preventDefault();
    },
    mousedownHandler(event) { // 滑块按下鼠标事件
      if (this.isSucess) return;
      this.startX = event.clientX
      const slide = document.getElementById('slide')
      slide.addEventListener('mousemove', this.mousemoveHandler)
      slide.addEventListener('mouseup', this.mouseupHandler)
      slide.addEventListener('mouseleave', this.mouseupHandler)
    },
    navClickHandler(status) { // 切换登录方式
      this.status = status
      this.resetData()
    }
  },
  mounted() {
    setTimeout(() => {
      const slide = document.getElementById('slide')
      slide.addEventListener('mousedown', this.mousedownHandler)
    }, 200);
  },
  computed: {
    loginDisabled() {
      if (this.status === 'mobile') {
        return !this.mobile || !this.verifyCode || !this.isSucess
      }
      return !this.username || !this.password || !this.isSucess
    }
  },
  components: { Zheader }
})