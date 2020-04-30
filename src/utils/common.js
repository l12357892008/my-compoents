/* 公共参数获取*/

const baseData = {
  get domain(){  // 域名
    return 'http://' + localStorage.getItem('baseUrl')
  },
  get token(){ // token
    return localStorage.getItem('user')
  }
}

export default{
  baseUrl
}
