var ec_world = echarts.init(document.getElementById('world'),'dark');

ec_world.showLoading();

$.get('../static/js/extention/eckert3-world.geojson', function (worldJson) {
	ec_world.hideLoading();

	echarts.registerMap('World', worldJson, {

	});
	ec_world_option = {
		title: {
			text: 'World COVID-19 Death Cases',
			subtext: 'Data from World Health Organization',
			sublink: 'http://www.who.int',
			left: 'left'
		},
		tooltip: {
			trigger: 'item',
			showDelay: 0,
			transitionDuration: 0.2,
			formatter: function (params) {
				var value = (params.value + '').split('.');
				value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
				return params.seriesName + '<br/>' + params.name + ': ' + value;
			}
		},
		visualMap: {
			show: false,
			left: 'right',
			min: 0,
			max: 50000,
			// baseTexture: "../static/js/extention/world.topo.bathy.200401.jpg",
			inRange: {
				color: ['#a8a8a8', '#ada4a4', '#b1a0a0', '#b59b9b', '#ba9797', '#be9393', '#c28e8e', '#c78a8a',
					'#cb8686', '#cf8181', '#d47d7d', '#d87979', '#dc7474', '#e17070', '#e56c6c', '#e96767', '#ee6363',
					'#f25f5f', '#f65a5a', '#fb5656', '#ff5050', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000',
				 	'#e60000', '#cc0000', '#b30000', '#990000', '#800000',  '#660000', '#4d0000']
			},
			text: ['High', 'Low'],           // 文本，默认为数值文本
			calculable: true
		},
		toolbox: {
			show: true,
			//orient: 'vertical',
			left: 'right',
			top: 'top',
			feature: {
				dataView: {readOnly: false},
				restore: {},
				saveAsImage: {}
			}
		},
		series: [
			{
				name: 'Death',
				type: 'map',
				roam: true,
				map: 'World',
				emphasis: {
					label: {
						show: true
					}
				},
				data:[

				]
			}
		]
	};

	ec_world.setOption(ec_world_option);
});