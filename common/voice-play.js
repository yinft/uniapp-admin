let voiceReminder;

function warehouse(_this) {
	if (voiceReminder.warehouse) {
		speaking(_this, "入库成功");
	}
}

function movehouse(_this) {
	if (voiceReminder.movehouse) {
		speaking(_this, "移库成功");
	}
}

function sendback(_this) {
	if (voiceReminder.sendback) {
		speaking(_this, "退回成功");
	}
}

function urging(_this) {
	if (voiceReminder.urging) {
		speaking(_this, "催取成功");
	}
}

function speaking(_this, text) {
	_this.$plugin.playVoicelWithOptions({
		voiceText: text,
		volume: 1,
		language: "zh_CN",
		rate: 0.57,
	}, result => {});
}

function init(_this) {
	_this.$http.get('voice_reminder/getVoiceReminderByUserId').then(res => {
		voiceReminder = res.data;
	});
}

export default {
	init,
	warehouse,
	movehouse,
	sendback,
	urging
}
