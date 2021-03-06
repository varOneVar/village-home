const app = new Vue({
  el: '#login',
  data() {
    return {
      tipShow: false, // 手机号错误提示
      password: '', // 手机密码
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
    async submitData() { // 提交数据
      if (!(/^\d{11}$/.test(this.mobile))) {
        this.$message.error('请输入正确的手机号！')
        return;
      }
      if (!(/^\d{4, 6}$/.test(this.verifyCode))) {
        this.$message.error('请输入正确的验证码！')
        return;
      }
      if (!this.password) {
        this.$message.error('请输入密码！')
        return;
      }
      if (!this.isSucess) {
        this.$message.error('请拖动滑块验证！')
        return;
      }
      try {
        const { data, flag } = await API.java.post(API.constant.p_Register, {
          VerifyCode: this.verifyCode,
          MemberPhone: this.mobile,
          MemberPwd: this.password
        })
        console.log(data, flag)
        if (flag === API.FLAG) {
          API.STORAGE.set('key', data.key)
          API.STORAGE.set('userInfo', data)
          this.$notify({
            title: '成功',
            message: '注册成功！',
            type: 'success'
          });
          window.location.href = '/index.html'
        }
      } catch (error) {
        console.error(error)
      }
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
    gainVerifyCode() { // 获取验证码
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
    getLimitNumber(num, min, max) { // 算滑块松开反应
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
  },
  mounted() {
    setTimeout(() => {
      const slide = document.getElementById('slide')
      slide.addEventListener('mousedown', this.mousedownHandler)
    }, 200);
  },
  computed: {
    loginDisabled() {
      return !this.mobile || !this.verifyCode || !this.isSucess
    }
  },
  components: { Zheader }
})