/* 公共参数获取*/

const baseUrl = {
  get url(){  // 域名
    return 'http://' + localStorage.getItem('baseUrl')
  },
  get user(){ // token
    return localStorage.getItem('user')
  }
}

export{
  baseUrl
}
