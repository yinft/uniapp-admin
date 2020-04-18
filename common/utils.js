// var CryptoJS =require("crypto-js")
import CryptoJS from "crypto-js"

function Encrypt(word){
	var key = CryptoJS.enc.Utf8.parse("12345678")
	let encrypted = CryptoJS.DES.encrypt(word,key,{
		mode:CryptoJS.mode.ECB,
		padding:CryptoJS.pad.Pkcs7
	})
	return encrypted.toString();
}

function listenPush() {
	try {
		plus.push.addEventListener('click', (msg) => {
			uni.navigateTo({
				url: msg.payload
			});
		}, false);
	} catch (e) {
		console.log(e);
	}
}

function checkUpdate(_this, showNoUpdate) {
	const platform = (uni.getSystemInfoSync().platform).toLowerCase();
	_this.$http.post('app/_check_update', {
		data: {
			'app_id': 'express',
			'platform': platform,
			'version': plus.runtime.version
		}
	}).then(res => {
		if (res.statusCode === 200 && res.data.status === 1) {
			res.data.release_notes = res.data.release_notes.replace(/\\n/g, '\n');
			_this.$plugin.apkDownloadAndInstall({
				release_notes: res.data.release_notes,
				force_update: res.data.force_update,
				update_url: res.data.update_url
			}, result => {});
		} else {
			if (showNoUpdate) {
				uni.showToast({
					title: '暂无更新',
					icon: 'none'
				});
			}
		}
	}).catch(error => {
		if (showNoUpdate) {
			uni.showToast({
				title: '更新失败，请检查网络或手动更新',
				icon: 'none'
			});
		}
	});
};

function showErrorModal(_this, type, successNum, errorNum, errorMessages) {
	let content;
	if (type === "入库") {
		content = "成功";
		content += type;
		content += successNum;
		content += "件，失败";
		content += errorNum;
		content += "件，失败原因：{";
		for (let i = 0; i < errorMessages.length; i++) {
			content += errorMessages[i];
			content += ",";
		}
		content = content.substring(0, content.length - 1);
		content += "}；请重试或联系我们！";
	} else {
		content = "操作失败，原因：{";
		content += errorMessages[0];
		content += "}；请重试或联系我们！";
	}
	_this.$plugin.showModal({
		content: content,
		confirmText: "联系我们",
		cancelText: "取消"
	}, result => {
		if (result.type === "confirm") {
			_this.$plugin.showModal({
				content: "联系电话：025-84815959转635<br/>工作时间：9:00~18:00",
				confirmText: "致电我们",
				cancelText: "取消"
			}, result1 => {
				if (result1.type === "confirm") {
					try {
						uni.makePhoneCall({
							phoneNumber: '025-84815959'
						});
					} catch (e) {
						console.log(e);
					}
				}
			});
		}
	});
}

function formatDate(dateStr) {
	if (dateStr === undefined || dateStr === null || dateStr === '') {
		return '';
	}
	dateStr = dateStr.substring(0, 19);
	dateStr = dateStr.replace(/\s/g, ',').replace(/-/g, ',').replace(/:/g, ',');
	let dateArr = dateStr.split(',');
	return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]);
}

function dateFormat(fmt, date) {
	if (fmt === undefined || fmt === null || fmt === '' || date === undefined || date === null || date === '') {
		return '';
	}
	let year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString();
	let day = date.getDate().toString();
	let hours = date.getHours().toString();
	let minutes = date.getMinutes().toString();
	let seconds = date.getSeconds().toString();
	let opt = {
		"yyyy": year,
		"yy": year.substring(2, 4),
		"MM": month.length === 1 ? "0" + month : month,
		"M": month,
		"dd": day.length === 1 ? "0" + day : day,
		"d": day,
		"HH": hours.length === 1 ? "0" + hours : hours,
		"H": hours,
		"mm": minutes.length === 1 ? "0" + minutes : minutes,
		"m": minutes,
		"ss": seconds.length === 1 ? "0" + seconds : seconds,
		"s": seconds
	};
	for (let k in opt) {
		let ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], opt[k])
		};
	};
	return fmt;
}

function getQueryString(args, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = args.match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	};
	return null;
}

function getUserInfo(_this) {
	let token = getApp().globalData.token;
	if (token !== undefined && token !== null && token.startsWith('Bearer')) {
		_this.$http.get('user/getUserInfo').then(res => {
			res.data.user_photo = '';
			try {
				uni.setStorageSync('userInfo', res.data);
			} catch (e) {
				console.log(e);
			}
		});
	}
}

function signIn(args, _this) {
	plus.runtime.arguments = '';
	if (args === undefined || args === null || args === '') {
		return;
	}
	args = args.replace('expressend://?', '');
	args = args.replace('expressend://', '');
	let type = getQueryString(args, 'type');
	if (type !== 'login') {
		return;
	}
	let userTelephone = getQueryString(args, 'user_telephone');
	if (userTelephone === undefined || userTelephone === null || userTelephone.length !== 11) {
		return;
	}
	let authorization = getQueryString(args, 'Authorization');
	if (authorization === undefined || authorization === null || !authorization.startsWith('Bearer')) {
		return;
	}
	authorization = decodeURI(authorization);
	let currentUser = uni.getStorageSync('userInfo');
	if (currentUser !== undefined && currentUser !== null && currentUser !== '' && currentUser.user_telephone ===
		userTelephone) {
		return;
	}
	_this.$http.post('data_api/getUserToken', {
		data: {
			'user_telephone': userTelephone,
			'Authorization': authorization
		}
	}).then(res => {
		if (res.data.success === 1) {
			login(_this, userTelephone, res.data.token);
		}
	});
}

function login(token) {
	if (token !== undefined && token !== null && token.startsWith('Bearer')) {
		try {
			getApp().globalData.token = token;
			uni.setStorageSync('token', token);
		} catch (e) {
			console.log(e);
		}
		// getUserInfo(_this);
		uni.hideKeyboard();
		uni.reLaunch({
			url: '/pages/report/reportHome'
		});
	}
}

function logout() {
	let agreeProtocolVersion = uni.getStorageSync('agreeProtocolVersion');
	let agreeProtocolVersionHome = uni.getStorageSync('agreeProtocolVersionHome');
	getApp().globalData.token = '';
	try {
		uni.clearStorageSync();
	} catch (e) {
		console.log(e);
	}
	try {
		if (agreeProtocolVersion !== undefined && agreeProtocolVersion !== null && agreeProtocolVersion !== '') {
			uni.setStorageSync('agreeProtocolVersion', agreeProtocolVersion);
		}
		if (agreeProtocolVersionHome !== undefined && agreeProtocolVersionHome !== null && agreeProtocolVersionHome !== '') {
			uni.setStorageSync('agreeProtocolVersionHome', agreeProtocolVersionHome);
		}
	} catch (e) {
		console.log(e);
	}
	uni.hideKeyboard();
	uni.reLaunch({
		url: '/pages/login/login'
	});
}

export default {
	listenPush,
	checkUpdate,
	showErrorModal,
	formatDate,
	dateFormat,
	getQueryString,
	getUserInfo,
	signIn,
	login,
	logout,
	Encrypt
}
