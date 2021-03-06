var ec_r1 = echarts.init(document.getElementById('r1'),'dark');

var ec_r1_option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'line']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['Death', 'Confirmed']
    },
    xAxis: [
        {
            type: 'category',
            data: [], //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Death',
            min: 0,
            max: 150,
            interval: 30,
            axisLabel: {
                formatter: '{value} k'
            }
        },
        {
            type: 'value',
            name: 'Comfirmed',
            min: 0,
            max: 5000,
            interval: 1000,
            axisLabel: {
                formatter: '{value} k'
            }
        }
    ],
    series: [
        {
            name: 'Death',
            type: 'line',
            yAxisIndex: 0,
            data: []//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: 'Confirmed',
            type: 'line',
            yAxisIndex: 1,
            data: []//[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
        // {
        //     name: '平均温度',
        //     type: 'line',
        //     yAxisIndex: 1,
        //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        // }
    ]
};

ec_r1.setOption(ec_r1_option);
