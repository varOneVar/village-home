const Zheader = {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userinfo: null,
      activeIndex: '1',
      navList: [
        {
          index: '1',
          label: '首页',
          path: './index.html'
        }, {
          index: '2',
          label: '应用下载',
          children: [{
            index: '2-1',
            label: 'IOS下载',
            path: './index.html'
          }, {
            index: '2-2',
            label: 'Android下载',
            path: './index.html'
          }]
        }, {
          index: '3',
          label: '关于我们',
          path: './index.html'
        }
      ]
    }
  },
  methods: {
    handleSelect(index) {
      // this.activeIndex =
    }
  },
  created() {
    this.userinfo = storage().get('userinfo') || null
  },
  template: `
    <div class="zheader">
      <div class="zheader-inner flex-sb-c">
        <a href="./index.html">
          <el-image
            style="width: 313px; height: 61px"
            src="./images/logo@2x.png"
            fit="cover"></el-image>
        </a>
        <div class="flex-align-center">
          <el-menu
            :default-active="activeIndex" class="zheader-menu" mode="horizontal" @select="handleSelect"
          >
            <template v-for="nav of navList">
              <el-submenu
                v-if="nav.children"
                :key="nav.index"
                :index="nav.index"
              >
                <template slot="title">{{nav.label}}</template>
                <el-menu-item
                  v-for="v of nav.children"
                  :key="v.index"
                  :index="v.index"
                >
                <a :href="v.path">
                {{nav.label}}
                </a>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="nav.index"
                :index="nav.index"
              >
              <a :href="nav.path">
              {{nav.label}}
              </a>
              </el-menu-item>
            </template>
          </el-menu>
          <div class="zheader-btn-box" v-if="!userinfo">
            <a class="zheader-btn"
              :href="status==='login'?'javascript:void(0);':'./login.html'"
             :class="{active:status==='login'||!status}">
             登陆
            </a>
            <a class="zheader-btn"
            :href="status==='register'?'javascript:void(0);':'./register.html'"
              :class="{active:status==='register'}">
              注册
            </a>
          </div>
          <div class="is-logined" v-else>
            <el-avatar class="is-logined__avatar" :src="userInfo.member_head" fit="cover" />
            <ul class="active-board">
              <li class="active-board-item">
                <a class="active-board-item__a" href="">发布内容</a>
              </li>
              <li class="active-board-item">
                <a class="active-board-item__a" href="">个人中心</a>
              </li>
              <li class="active-board-item">
                <a class="active-board-item__a" href="">退出登录</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
}
