const Zfooter = {
  data() {
    return {
     
    }
  },
  template: `
    <div class="zfooter">
        <ul class="zfooter-topper">
            <li class="li first">
                <img class="logo" src="./images/footer_logo2@2x.png" />
            </li>
            <li class="li two">
                <p class="static"><a class="link">首页</a></p>
                <p class="static"><a class="link">应用下载</a></p>
                <p class="static"><a class="link">关于我</a></p>
            </li>
            <li class="li three">
                <p class="static">地址：湖南省长沙市雨花区东湖壹号15栋</p>
                <p class="static">电话：0731-00008888</p>
                <p class="static">邮箱：admin@ncwl.com</p>
            </li>
            <li class="li">
                <img class="qrcode" src="./images/qrcode@2x.png" />
                <p class="text-center gz">关注公众号</p>
            </li>
        </ul>
        <div class="zfooter-tail">
            <p class="zfooter-tail-p-t">营业执照注册号：91430111MA4LCB2M1X - ICP备案号：湘ICP备17007263号</p>
            <p class="zfooter-tail-p-b">©Copyright 2017-{{new Date().getFullYear()}} 湖南农城旅游度假开发有限公司</p>
        </div>
    </div>
  `
}