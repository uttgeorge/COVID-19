var ec_map = echarts.init(document.getElementById('r2'),'dark');

// var mydata = [{'name': 'New Jersey', 'value': 15684}, {'name': 'Massachusetts', 'value': 8402}, {'name': 'Washington', 'value': 1427}, {'name': 'Delaware', 'value': 521}, {'name': 'American Samoa', 'value': 0}, {'name': 'Guam', 'value': 5}, {'name': 'Minnesota', 'value': 1573}, {'name': 'Nevada', 'value': 637}, {'name': 'Texas', 'value': 3735}, {'name': 'Florida', 'value': 4912}, {'name': 'Montana', 'value': 37}, {'name': 'Rhode Island', 'value': 990}, {'name': 'Alaska', 'value': 17}, {'name': 'Nebraska', 'value': 299}, {'name': 'New Mexico', 'value': 562}, {'name': 'West Virginia', 'value': 100}, {'name': 'Utah', 'value': 235}, {'name': 'Louisiana', 'value': 3509}, {'name': 'Maryland', 'value': 3359}, {'name': 'Connecticut', 'value': 4396}, {'name': 'Indiana', 'value': 2803}, {'name': 'Pennsylvania', 'value': 6992}, {'name': 'Puerto Rico', 'value': 177}, {'name': 'Vermont', 'value': 56}, {'name': 'Hawaii', 'value': 22}, {'name': 'Idaho', 'value': 114}, {'name': 'South Carolina', 'value': 1096}, {'name': 'Arizona', 'value': 2583}, {'name': 'Kansas', 'value': 299}, {'name': 'North Dakota', 'value': 82}, {'name': 'Virgin Islands', 'value': 6}, {'name': 'Alabama', 'value': 1265}, {'name': 'Maine', 'value': 115}, {'name': 'Colorado', 'value': 1615}, {'name': 'Iowa', 'value': 784}, {'name': 'Kentucky', 'value': 658}, {'name': 'Virginia', 'value': 2013}, {'name': 'Wisconsin', 'value': 840}, {'name': 'California', 'value': 7475}, {'name': 'New Hampshire', 'value': 395}, {'name': 'Arkansas', 'value': 353}, {'name': 'Oregon', 'value': 254}, {'name': 'Illinois', 'value': 7465}, {'name': 'District of Columbia', 'value': 577}, {'name': 'North Carolina', 'value': 1606}, {'name': 'Oklahoma', 'value': 445}, {'name': 'New York', 'value': 25024}, {'name': 'Wyoming', 'value': 24}, {'name': 'Missouri', 'value': 1121}, {'name': 'Ohio', 'value': 3112}, {'name': 'South Dakota', 'value': 116}, {'name': 'Northern Mariana Islands', 'value': 2}, {'name': 'Michigan', 'value': 6355}, {'name': 'Tennessee', 'value': 815}, {'name': 'Mississippi', 'value': 1332}, {'name': 'Georgia', 'value': 3132}]

// Specify configurations and data graphs 
ec_map.showLoading();

$.get('../static/js/extention/USA_geo.json', function (usaJson) {
    ec_map.hideLoading();

    echarts.registerMap('USA', usaJson, {
        Alaska: {
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,
            top: 28,
            width: 5
        },
        'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2
        }
    });
    ec_map_option = {
        title : {
            text: 'USA COVID-19 Death',
            subtext: 'Data from USA CDC',
            sublink: 'https://www.cdc.gov/',
            left: 'left',
            top: 'top'
        },
        tooltip : {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter : function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.seriesName + '<br/>' + params.name + ' : ' + value;
            }
        },
        visualMap: {
            show : false,
            left: 'right',
            min: 0,
            max: 8000,
            inRange: {
                color: ['#a8a8a8', '#ada4a4', '#b1a0a0', '#b59b9b', '#ba9797', '#be9393', '#c28e8e', '#c78a8a',
					'#cb8686', '#cf8181', '#d47d7d', '#d87979', '#dc7474', '#e17070', '#e56c6c', '#e96767', '#ee6363',
					'#f25f5f', '#f65a5a', '#fb5656', '#ff5050', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000',
				 	'#e60000', '#cc0000', '#b30000', '#990000', '#800000',  '#660000', '#4d0000']
            },
            text:['High','Low'],           // 文本，默认为数值文本
            calculable : true
        },
        toolbox: {
            show : true,
            //orient : 'vertical',
            left: 'left',
            top: 'bottom',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name: 'Death',
                type: 'map',
                roam: false,
                map: 'USA',
                itemStyle:{
                    emphasis:{label:{show:true}}
                },

                textFixed : {
                    Alaska : [20, -20]
                },
                data:[]
            }
        ]
    };

	    ec_map.setOption(ec_map_option);
});