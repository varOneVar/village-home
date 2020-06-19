const Zheader = {
  data() {
    return {
      status: 'login',
      activeIndex: '1',
      navList: [
        {
          index: '1',
          label: '首页',
          path: '/'
        }, {
          index: '2',
          label: '应用下载',
          children: [{
            index: '2-1',
            label: 'IOS下载',
            path: '/ios'
          }, {
              index: '2-2',
              label: 'Android下载',
              path: '/android'
            }]
        }, {
          index: '3',
          label: '关于我们',
          path: '/path'
        }
      ]
    }
  },
  methods: {
    handleSelect(index) {
      console.log(index)
      // this.activeIndex =
    }
  },
  template: `
    <div class="zheader">
      <div class="zheader-inner flex-sb-c">
        <el-image
          style="width: 313px; height: 61px"
          src="./images/logo@2x.png"
          fit="cover"></el-image>
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
                  {{v.label}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="nav.index"
                :index="nav.index"
              >
                {{nav.label}}
              </el-menu-item>
            </template>
          </el-menu>
          <div class="zheader-btn-box">
            <span class="zheader-btn"
             :class="{active:status==='login'}">
             登陆
            </span>
            <span class="zheader-btn" :class="{active:status==='register'}">
              注册
            </span>
          </div>
        </div>
      </div>
    </div>
  `
}
