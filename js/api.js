const FLAG = 200
const CLIENT = 'PC'
const DEVICE_ID = ''
const VERSION = '1.0.0'
const STORAGE = storage()
// 接口文档地址 http://test.api.ncweilv.com/nongcheng_api/Public/nongcheng/listAllApis.php
const PHP_URL = 'https://internal.api.ncweilv.com/nongcheng_api/Public/nongcheng/?service='
// 接口文档地址 失效了
const JAVA_URL = 'https://internal.api.ncweilv.com/new/'
const IMG_URL = 'https://ncweilv-download.oss-cn-shenzhen.aliyuncs.com/mini-app/'
// 正式环境
// const PHP_URL = 'https://api.xiangcun1688.com/nongcheng_api/Public/nongcheng/?service='
// const JAVA_URL = 'https://api.xiangcun1688.com/new/'
// const IMG_URL = 'https://static.ncweilv.com/mini-app/'


const errors = [
  { flag: '-1', message: '服务器系统异常' },
  { flag: '410', message: 'Token已失效或不存在' },
  { flag: '420', message: '账号已在其他地方登陆，请重新登录' }
]
const getMessage = (flag, msg) => {
  const one = errors.find(v => v.flag === flag)
  return one ? one.message : msg
}

function qsStringify(obj) {
  const arr = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(`${key}=${obj[key]}`)
    }
  }
  return arr.join('&')
}

class CancelRepeatRequest {
  constructor(requestPool, requestParams) {
    this.requestPool = requestPool || []
    this.requestParams = requestParams || {}
  }
  add(config, params) {
    const { url, method } = config
    this.requestParams = params
    config.cancelToken = new axios.CancelToken((cancel) => {
      const cancelInfo = {
        flag: `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`,
        cancel
      }
      this.requestPool.push(cancelInfo)
    })
  }
  remove(config, params = this.requestParams) {
    const { url, method } = config
    const flag = `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`
    let i = 0
    while (i < this.requestPool.length) {
      if (this.requestPool[i].flag === flag) {
        this.requestPool[i].cancel()
        this.requestPool.splice(i, 1)
      } else {
        i++
      }
    }
    this.requestParams = {}
  }
}


function axiosInstance() {
  const service = axios.create({
    timeout: 60000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
  })
  function getParams(config) {
    const obj = {
      post: 'data',
      get: 'params'
    }
    const key = obj[config.method]
    return config[key]
  }
  // 取消重复请求
  const cancelRequest = new CancelRepeatRequest()

  service.interceptors.request.use(
    (config) => {
      const params = getParams(config)
      params.Client = CLIENT
      params.DeviceID = DEVICE_ID
      params.Version = VERSION
      params.Key = STORAGE.get('key') || 'f8000af8dd452892cc68404bf88c0e59'

      // 取消重复请求
      if (params.noCancel) {
        delete params.noCancel
      } else {
        cancelRequest.remove(config, params)
        cancelRequest.add(config, params)
      }
      if (config.method === 'post') {
        config.data = qsStringify(config.data)
      }

      return config
    },
    (error) => {
      Message({
        message: '请求异常 ' + error.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      const { config, data, data: { flag } } = response
      // 取消重复请求
      cancelRequest.remove(config)
      // 如果是blob二进制数据直接将整个response返回
      if (config.responseType === 'blob' || headers['content-disposition']) {
        return response
      }
      if (flag !== FLAG) {
        // 只是弹个提示，数据还是返回出去了，页面还是要判断code是否等于0
        const whiteList = ['Login.Register', 'Login.Login']
        const apiname = config.data.service
        if (!whiteList.includes(apiname) && (flag === 410 || flag === 420)) {
          location.href = '/login.html'
        }
        ELEMENT.Message.error(getMessage(flag, (data.msg || data.data)))
      }
      return data
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        Message.error('网络开小差(' + error.response.status + ')')
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        Message.error('请求无响应，网络较差或已断开！')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
        if (axios.isCancel(error)) {
          console.log('Request canceled（取消重复请求）', error.message)
        } else {
          Message.error(`请求失败：（${error.message}）！`)
        }
      }
      console.log(error.config)
      return Promise.reject(error)
    }
  )
  return service
}

const API = {
  FLAG: FLAG,
  STORAGE: STORAGE,
  service: axiosInstance(),
  java: {
    baseUrl: JAVA_URL,
    get(url, args = {}, config = {}) {
      return API.service.post(`${this.baseUrl}${url}`, { params: args, ...config })
    },
    post(url, args = {}, config = {}) {
      return API.service.post(`${this.baseUrl}${url}`, args, config)

    }
  },
  php: {
    baseUrl: PHP_URL,
    get(url, args = {}, config = {}) {
      return API.service.post(`${this.baseUrl}${url}`, { params: args, ...config })
    },
    post(url, args = {}, config = {}) {
      return API.service.post(`${this.baseUrl}${url}`, args, config)

    }
  },
  img: IMG_URL,
  constant: {
    j_getVerifycode: 'register/getVerifycode', // 获取验证码
    p_BindPhone: 'Login.BindPhone', // 绑定手机
    p_Login: 'Login.Login', // 账号登录
    p_Msglogin: 'Login.Msglogin', // 手机短信登录
    p_Register: 'Login.Register', // 注册
    j_currentCity: 'search/currentCity', //当前城市
    j_getSmallProceduresIndex: 'smallproduresindex/getSmallProceduresIndex', //小程序首页
    j_villageInfo: 'villagedetails/villageInfo', //乡村详情页信息
    j_getInformation: 'smallproduresindex/getInformation', //小程序首页（热门有趣乡村风采）
    j_addVillageVoteNum: 'smallproduresindex/addVillageVoteNum', //小程序乡村魅力版乡村投票
    j_getCharmingVillageRank: 'smallproduresindex/getCharmingVillageRank', //小程序魅力乡村排行
    j_getVillageImageList: 'villagedetails/getVillageImageList', //村景
    j_fileUpload: 'upload/fileUpload', //图片上传
    p_UploadImage: 'Upload.UploadImage', //php上传
    j_addVillageImgList: 'villagedetails/addVillageImgList', //村景图片上传
    j_getLabels: 'dictionary/getLabels', //获取标签列表 (0默认,1约伴标签,2问答标签3文章标签 5 村特色风采照片标签 6 乡村标签)
    j_getVillageCharacteristicImgList: 'villagedetails/getVillageCharacteristicImgList', //特色风采图片展示
    j_addCharacteristicImg: 'villagedetails/addCharacteristicImg', //特色风采添加图片
    j_getVillageInformatioinList: 'villagedetails/getVillageInformatioinList', //特色风采咨询展示
    j_getVillageVideoList: 'villagedetails/getVillageVideoList', //特色风采视频列表展示
    j_addVillageVideo: 'villagedetails/addVillageVideo', // 特色风采添加视频
    j_editVillageIntro: 'villagedetails/editVillageIntro', // 提交，编辑村简介
    j_getVillageIntegralRecord: 'villagedetails/getVillageIntegralRecord', // 微豆排行版
    j_getContributionRanking: 'villagedetails/getVillageRanking', // 贡献排名展示
    j_getVillageRanking: 'smallproduresindex/getVillageRank', // 村排名
    j_dayliTask: 'smallProduresContribution/dayliTask', // 获取小程序每日任务
    j_myContribution: 'account/myIntegralRecord', // 小程序贡献值明细
    p_GetDocument: 'Index.GetDocument', // 获取文档接口
    p_AskforAdmin: 'Village.AskforAdmin', // 村管理员申请
    j_villageEdit: 'villagedetails/villageEdit', // 编辑乡村详情
    p_GetAreaList: 'Index.GetAreaList', // 获取地区列表
    j_addMyVillage: 'villagedetails/addMyVillage', // 小程序添加我的家乡
    j_getSearchVillage: 'smallproduressearch/getSearchVillage', // 小程序搜索美丽乡村
    p_GetMemberInfo: 'Member.GetMemberInfo', // 获取用户信息
    p_editMember: 'Member.EditMember', // 修改用户信息
    j_getFansNum: 'member/getFansNum', // 获取我的关注，粉丝用户数
    j_getFriendList: 'member/getFriendList', // 获取我的好友列表
    j_getSpMessageByType: 'smallproduresMessage/getSpMessageByType', // 消息中心按照类别获取列表 3系统消息 5 本村消息 6 评论消息 7 点赞消息 8 粉丝消息
    j_getSpMessageCenterInfo: 'smallproduresMessage/getSpMessageCenterInfo', // 获取小程序的消息中心首页展示
    p_ThirdLogin: 'Login.ThirdLogin', // 第三方登录
    j_getDynamicList: 'smallproduresindex/getDynamicList', // 获取动态  1:最新 2:热门 3:关注人的动态
    p_adddynamic: 'Tourist.Adddynamic', // 动态点赞 //点赞/评论/回复 1.0.0
    p_evaPraise: 'Tourist.EvaPraise', // 对评论点赞
    p_GetWxMobile: 'Login.GetWxMobile', // 微信手机号解密
    p_AddTourist: 'Tourist.AddTourist', // 发布动态
    j_likeVideo: 'video/likeVideo', // 点赞视频
    j_viewVideo: 'video/viewVideo', // 更新观看视频数
    j_getVideoCommentList: 'video/getVideoCommentList', // 获取视频评论列表
    j_commentVideo: 'video/commentVideo', // 视频发布评论
    j_getFriendList: 'member/getFriendList', // 获取我的好友列表 1关注列表 2粉丝列表 3 好友列表
    j_getChatroomVillagerList: 'smallProduresChat/getChatroomVillagerList', // 获取聊天室村民列表
    j_getSearchVillageByAreaId: 'smallproduressearch/getSearchVillageByAreaId', // 小程序高级搜索根据镇查找村  传townId
    p_WxBindMobile: 'Login.WxBindMobile', // 微信绑定手机号
    j_getAddress: 'public/getAddress', //根据经纬度获取地址
    j_getLogAndLat: 'public/getLogAndLat', //根据地址获取经纬度
    j_JoinVillage: 'member/JoinVillage', //加入社区,村庄
    j_exitVillage: 'member/exitVillage', //退出社区,村庄
    j_villageDynamics: 'villagedetails/villageDynamics', //乡村详情页信息本村动态
    j_shareTouristCircle: 'tourist/shareTouristCircle', //分享动态
    j_addVillageEvaluatinParise: 'villagedetails/addVillageEvaluatinParise', // 村评价点赞  传evaluateId num点赞:1 取消点赞：-1 
    j_addAttention: 'attention/addAttention', // 用户添加关注
    j_cancelAttention: 'attention/cancelAttention', // 取消关注
    j_isAttention: 'attention/isAttention', // 是否关注
    j_getChatroomNum: 'smallProduresChat/getChatroomNum', // 获取聊天室房间号 
    j_getVillageEvaluation: 'villagedetails/getVillageEvaluation', // 村评价  传villageId 
    p_postVillageEvaluation: 'Extra.AddEvaluate', // 发布村评价
    j_getMemberCharacteristicImgList: 'smallprodureshome/memberCharacteristicImgList',// 特色风采图片展示
    j_getMemberDynamicList: 'smallprodureshome/memberDynamicList', // 用户发布的动态列表
    j_getMemberInformatioionList: 'smallprodureshome/memberInformatioinList', // 特色风采资讯展示
    j_getMemberVideoList: 'smallprodureshome/memberVideoList', // 特色风采视频列表展示
    j_getMyHomeInfo: 'smallprodureshome/myHomeInfo', // 我的个人主页
    j_getTargetHomeInfo: 'smallprodureshome/targetHomeInfo', //对方个人主页
    j_getOtherVillageList: 'smallproduresindex/getVillageList',//获取乡村游内容
    j_getCommentList: 'smallproduresindex/getCommentList', //获取评论列表
    j_getCorrelationVillage: 'smallproduressearch/getVillageAreaIds',//获取相关村
    // getVillageIntegralRecord: 'villagedetails/getVillageRanking' //获取村贡献排行榜
    getVillageLocation: 'villagedetails/villageInfoAdmin', //获取村地理位置 
    j_videoLikeComment: 'video/likeComment',//对视视频评论点赞
    j_deleteCharacteristicImg: 'villagedetails/deleteCharacteristicImg', // 删除特色风采图片
    j_deleteVillageInformation: 'villagedetails/deleteVillageInformation', // 删除特色风采资讯
    j_deleteVideos: 'video/deleteVideos', //删除特色风采视频
    p_InfomationDetail: 'Infomation.Detail', // 资讯详情
    p_InfomationEvaList: 'Infomation.EvaList', // 资讯评论
    p_InfomationInfoList: 'Infomation.InfoList', // 精选资讯
    p_InfomationPraise: 'Infomation.Praise', // 点赞
    p_InfomationAddEvaluate: 'Infomation.AddEvaluate', // 发表评论
    p_genInvitePoster: 'member/genInvitePoster', // 分享
    p_MemberMemberAuth: 'Member.MemberAuth', // 身份認證
    j_targetHomeInfo: 'smallprodureshome/targetHomeInfo',
    j_getVillageInfo: 'villagedetails/getVillageInfo',
    j_getReplaceText: 'smallproduresindex/getReplaceText'
  }
}
