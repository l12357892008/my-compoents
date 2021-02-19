import axios from 'axios'
import qs from 'qs'
import CryptoJS from 'crypto-js'
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
if (process.env.NODE_ENV == 'development') {
	// 测试环境设置cookie
	//切换C_USERID_NEW模拟不同的用户
	// C_USERID_NEW=E61E5487CA57DB13  // 西部花样年华
	// C_USERID_NEW=6F3B5F6D377388DC 
	// C_USERID_NEW=8584CB768956196E
	let cookies = 'T_BARBASEID_NEW=6CC160E3CCBB127D31DBD352DAC1FCEE4F6ED2AC709CBDD203EBCF95E264FB1B6B13505E369484DC; admin_barbaseid=1FC9F878AEDFEAA8B329D719E4AD244FD2E971577EA8B055291CB5C2A5ED1A49ED0247ED75015603; SCREENV=212C998EBC3D0C0D49C89F8ACEC56182B0934D9FB535B19F48EA77E70A7B6E6B7D86092B07E64E0A; AU=4A52B01760B5DCC7C887DE76FC707951EDD8A8C74DBCE02784DE03C6F7867980C5C3EF2AC9E504A8275446661644AAB3; Hm_lvt_bbcfda495d9cf0463dc64c3b6b0c4187=1592965378; C_USERID_NEW=E61E5487CA57DB13; T_BARBASEID=1FC9F878AEDFEAA8B329D719E4AD244FD2E971577EA8B055291CB5C2A5ED1A49ED0247ED75015603; JSESSIONID=3540CCDE912C92A3CE5B5494C85E1E68; Hm_lpvt_bbcfda495d9cf0463dc64c3b6b0c4187=1592965698'
	let cookiesArr = cookies.split('; ')
	for (let i = 0; i < cookiesArr.length; i++) {
		setCookie(cookiesArr[i].split('=')[0], cookiesArr[i].split('=')[1])
	}
}

// 创建axios实例
export const http = axios.create({
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000, // request timeout //请求超时时间
})

// axios请求拦截器
http.interceptors.request.use((config) => {
	return config
}, (error) => {
	return Promise.reject(error)
})
// axios响应拦截器
http.interceptors.response.use(function (response) {
	try {
		response.data.resultMsg = JSON.parse(response.data.resultMsg)
	} catch (error) {
		console.log(error)
	}
	response.isResultTrue = response.isResultTrue || response.resultTrue
	return response.data;
}, (error) => {
	return Promise.reject(error);
});


//get
function get(url, data) {
	let config = { headers: { 'Content-Type': 'appliction/x-www-form-urlencoded' } };
	return http.get(url, { params: data }, config)
}
//post json
function post(url, data, config) {
	return http.post(url, data, config)
}
//post QueryString
function postQS(url, data) {
	let params = qs.stringify(data, { arrayFormat: 'indices' })
	return http.post(url, params)
}


//获取路径参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURIComponent(r[2]);
	return null;
}
//获取浏览器头
function getUrlHead(href) {
	href = href || window.location.href;
	var head = href.indexOf('https://') != -1 ? 'https://' : 'http://';
	var _href = href.replace('http://', '').replace('https://', '');
	if (_href.split('/').length > 0) {
		var s = _href.split('/')[0];
		head += s.split(':')[0];
		return head;
	}
	return false;
}
//预加载图片。返回promise对象
// @pramas list Array< string >
export function loadImgs(list) {
	// console.log(list)
	return new Promise((resolve) => {
		let loadNum = 0
		let errorNum = 0

		if (list.length == 0) {
			resolve()
		}
		for (let i = 0; i < list.length; i++) {
			let img = new Image()
			img.src = list[i]
			img.onload = function () {
				loadNum++
				if (loadNum == list.length) {
					resolve({ loadNum, errorNum })
				}
			}
			img.onerror = function () {
				loadNum++
				errorNum++
				if (loadNum == list.length) {
					resolve({ loadNum, errorNum })
				}
			}
		}
	})
}
//判断不为空
function isNotEmpty(value) {
	return value !== undefined && value !== null && value !== 'undefined' && value !== 'null' && value !== ''
}

let $http = function (params) {
	let { type = '', url, data, config } = params
	type = type.toLowerCase()
	if (type == 'get' && url !== '') {
		return get(url, data)
	}
	if (type == 'post' && url !== '') {
		return post(url, data, config)
	}
	if (type == 'postqs' && url !== '') {
		return postQS(url, data)
	}
	return http(params)
}
/*
* 对密码进行加密，传输给后台进行验证
* @param {String}   word  需要加密的密码
* @param {String}   keyStr  对密码加密的秘钥
* @return {String}   加密的密文
* */
function encrypt(word, keyStr) { // 加密
	let key = CryptoJS.enc.Utf8.parse(keyStr);
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
/*
* 对加密之后的密文在页面上进行解密，以便用户进行修改
* @param {String}   word  需要加密的密码
* @param {String}   keyStr  对密码加密的秘钥
* @return {String}   解密的明文
* */
function decrypt(word, keyStr) { // 解密
	let key = CryptoJS.enc.Utf8.parse(keyStr);
	let decrypt = CryptoJS.AES.decrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
$http.get = get
$http.post = post
$http.postQS = postQS
$http.getQueryString = getQueryString
$http.isNotEmpty = isNotEmpty
$http.getUrlHead = getUrlHead;
$http.loadImgs = loadImgs;
$http.encrypt = encrypt;
$http.decrypt = decrypt;
export default $http