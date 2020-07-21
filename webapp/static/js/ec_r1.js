var ec_r1 = echarts.init(document.getElementById('r1'),'dark');

var ec_r1_option = {
	title: {
		text: 'Daily Increase'
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['Death', 'Confirm', 'Suspect']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		show: false,
		boundaryGap: false,
		data: ['test_time1', 'test_time2', 'test_time3', 'test_time4', 'test_time5', 'test_time6', 'test_time7']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			name: 'Death',
			type: 'line',
			stack: '总量',
			data: [,, 101, 134, 90, 230, 210]
		},
		{
			name: 'Confirm',
			type: 'line',
			stack: '总量',
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: 'Suspect',
			type: 'line',
			stack: '总量',
			data: [150, 232, 201, 154, 190, 330, 410]
		}
	]
};

ec_r1.setOption(ec_r1_option);
