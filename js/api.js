const FLAG = 200
const CLIENT = 'PC'
const DEVICE_ID = ''
const VERSION = '1.0.0'
const STORAGE = storage()


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
    for(const key in obj) {
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


function axiosInstance () {
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
          params.Key = STORAGE.get('key') || ''

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
      if (config.responseType === 'blob') {
        return response
      }
      if (flag !== FLAG) {
        // 只是弹个提示，数据还是返回出去了，页面还是要判断code是否等于0
        if (flag === 410 || flag === 420) {
            location.href = '/login.html'
        }
        ELEMENT.Message.error(getMessage(flag, (data.message || data.result)))
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
    service: axiosInstance(),
    java: {
        baseUrl: 'https://internal.api.ncweilv.com/new/',
        get(url, args = {}, config = {}) {
            return API.service.post(`${this.baseUrl}${url}`, { params: args, ...config })
        },
        post(url, args = {}, config = {}) {
            return API.service.post(`${this.baseUrl}${url}`, args, config)
            
        }
    },
    php: {
        baseUrl: 'https://internal.api.ncweilv.com/nongcheng_api/Public/nongcheng/?service=',
        get(url, args = {}, config = {}) {
            return API.service.post(`${this.baseUrl}${url}`, { params: args, ...config })
        },
        post(url, args = {}, config = {}) {
            return API.service.post(`${this.baseUrl}${url}`, args, config)
            
        }
    },
    img: 'https://ncweilv-download.oss-cn-shenzhen.aliyuncs.com/mini-app/',
    constant: {
        j_getVerifycode: 'register/getVerifycode', // 获取验证码
        p_BindPhone: 'Login.BindPhone', // 绑定手机
        p_Login: 'Login.Login', // 登录
        p_Register: 'Login.Register', // 注册
    }
}
