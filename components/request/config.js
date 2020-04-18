import helper from '../../common/helper.js';
import utils from '../../common/utils.js';
import Interceptor from "./core/interceptor";
import Request from "./index";

export const globalInterceptor = {
	request: new Interceptor(),
	response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * `header` 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
	baseURL: helper.baseUrl,
	header: {
		'Content-Type': 'application/json'
	}
};

/**
 * 全局 请求拦截器, 支持添加多个拦截器
 * 例如: 配置token、添加一些默认的参数
 *
 * `return config` 继续发送请求
 * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} config 发送请求的配置数据
 */
globalInterceptor.request.use(
	config => {
		let token = getApp().globalData.token;
		if (token !== undefined && token !== null && token.startsWith('Bearer')) {
			config.header.Authorization = token;
		}
		try {
			config.header.Version = plus.runtime.version;
			config.header.ClientId = plus.push.getClientInfo().clientid;
		} catch (e) {}
		return config;
	},
	err => {
		return false;
	}
);

/**
 * 全局 响应拦截器, 支持添加多个拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
	(res, config) => {
		let code = res.statusCode;
		code = code !== undefined && code !== null ? code : 500;
		if (200 <= code && code < 400) {
			return res;
		} else if (code == 401) {
			utils.logout();
			return false;
		} else {
			return Promise.reject(res, config);
		}
	},
	(err, config) => {
		return Promise.reject(err);
	}
);
