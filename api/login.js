import Request from '../components/request/index'
export function login(data) {
	return Request().request({
		url: 'user/login',
		method: 'post',
		data:data
	})
}