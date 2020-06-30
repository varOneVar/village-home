const passwordSet = {
    data() {
        return {
            initTime: 60, // 发送验证码倒计时
            verifyCode: '',
            newPwd: '',
            oldPwd: ''
        }
    },
    methods: {
        gainVerifyCode() { // 获取验证码
            if (this.initTime!==60) return;
            simulateInterval(() => {
              if (this.initTime === 0) {
                this.initTime = 60
                return true
              }
              this.initTime--
            }, 1000)
          },
    },
    template: `
        <div class="password-set">
            <div class="password-item flex-baseline">
                <label class="password-item-label">手机号码：</label>
                <p class="password-item-p">1860000002020</p>
            </div>
            <div class="password-item flex-baseline" style="margin-top:30px;">
                <label class="password-item-label">手机验证码：</label>
                <el-input class="password-item-input" v-model="verifyCode" placeholder="请输入手机验证码" />
                <span class="code"
                    :class="{disabled:initTime!==60}"
                    @click="gainVerifyCode">
                    {{initTime===60?'获取动态码':initTime+'s后重发'}}</span>
            </div>
            <div class="password-item flex-baseline">
                <label class="password-item-label">新密码：</label>
                <el-input class="password-item-input" v-model="verifyCode" placeholder="请输入新密码" />
            </div>
            <div class="password-item flex-baseline">
                <label class="password-item-label">确认密码：</label>
                <el-input class="password-item-input" v-model="verifyCode" placeholder="请输入确认密码" />
            </div>
            <el-button class="password-submit" type="success">确认</el-button>
        </div>
    `
}