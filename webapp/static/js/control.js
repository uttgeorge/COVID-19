function get_time(){
		$.ajax({
			url:"/time",
			timeout:1000*20000,
			success:function(data){
				$("#time").html(data)
			},
			error:function(xhr,type,errorThrown){

			}
		});
	}

function get_m1_data(){
	$.ajax(
		{
			url:"/m1",
			success: function (data) {
				$('.num h1').eq(0).text(data['confirm']);
				// $('.num h1').eq(1).text(data['pending']);
				$('.num h1').eq(1).text(data['dead']);
			}
		}
	)
}

// $('.num h1').eq(2).text(data['recovered']);

function get_r2_data(){
	$.ajax(
	{
		url:"/r2",
		dataType: "json",
		success: function(data){
			ec_map_option.series[0].data = data.data
			ec_map.setOption(ec_map_option)
		},
		error: function(xhr, type, errorThrown){

		}
	})
}


function get_world_data(){
	$.ajax(
	{
		url:"/world",
		dataType: "json",
		success: function(data){
			ec_world_option.series[0].data = data.data
			ec_world.setOption(ec_world_option)
		},
		error: function(xhr, type, errorThrown){

		}
	})
}

function get_world_stats(){
	$.ajax(
	{
		url:"/mm",
		dataType: "json",
		success: function(data){
			ec_multi_option.series[0].data = data.data['Brazil']['Deaths']
			ec_multi_option.series[1].data = data.data['India']['Deaths']
			ec_multi_option.series[2].data = data.data['Iran, Islamic Republic of']['Deaths']
			ec_multi_option.series[3].data = data.data['Italy']['Deaths']
			ec_multi_option.series[4].data = data.data[ 'Mexico']['Deaths']
			ec_multi_option.series[5].data = data.data[ 'Russian Federation']['Deaths']
			ec_multi_option.series[6].data = data.data['United States of America']['Deaths']
			ec_multi_option.xAxis.data = data.data['Brazil']['Date']
			ec_multi.setOption(ec_multi_option)
		},
		error: function(xhr, type, errorThrown){

		}
	})
}

function get_usa_time(){
	$.ajax(
	{
		url:"/r1",
		dataType: "json",
		success: function(data){
			ec_r1_option.series[0].data = data.data['Deaths']
			ec_r1_option.series[1].data = data.data['Confirmed']
			ec_r1_option.xAxis[0].data = data.data['Date']
			ec_r1.setOption(ec_r1_option)
		},
		error: function(xhr, type, errorThrown){

		}
	})
}


function get_news_data(){
	$.ajax(
	{
		url:"/news",
		dataType: "json",
		success: function(data){
			// $('#p1 .text a').text(data.data[0].title);
			for(var i=0;i<$("#p1 li").length;i++){
				// alert($("#p1 li a")[i].innerHTML);
				// $('#p1 li a')[i].text(data.data[0].title)
				var oldInner = $("#p1 li a")[i].innerHTML;
				$("#p1 li a")[i].innerHTML = oldInner.replace("", data.data[i].source);
				$("#p1 li a")[i].href = data.data[i].url;
				var oldInner = $("#p1 li b")[i].innerHTML;
				$("#p1 li b")[i].innerHTML = oldInner.replace("", data.data[i].title);
				// $("#p1 li a")[i].href = data.data[i].url;
			}
		},
		error: function(xhr, type, errorThrown){

		}
	})
}

function get_top5_data(){
	$.ajax(
		{
			url:"/top5",
			dataType: "json",
			success: function(data){
				// for(var i=0;i<$(".top5-view-list li").length;i++) {
				//
				// 	$('.top5-view-list li .p1 a').replaceWith($(".top5-view-list li").length)//(data.data[i].name);
				// 	$('.top5-view-list li .p2 strong a').replaceWith(i)//(data.data[i].value)
				// }
					$('.top5-view-list .list1 .p1 a').replaceWith(data.data[0].name);
					$('.top5-view-list .list1 .p2 strong a').replaceWith(data.data[0].value)
					$('.top5-view-list .list2 .p1 a').replaceWith(data.data[1].name);
					$('.top5-view-list .list2 .p2 strong a').replaceWith(data.data[1].value)
					$('.top5-view-list .list3 .p1 a').replaceWith(data.data[2].name);
					$('.top5-view-list .list3 .p2 strong a').replaceWith(data.data[2].value)
					$('.top5-view-list .list4 .p1 a').replaceWith(data.data[3].name);
					$('.top5-view-list .list4 .p2 strong a').replaceWith(data.data[3].value)
					$('.top5-view-list .list5 .p1 a').replaceWith(data.data[4].name);
					$('.top5-view-list .list5 .p2 strong a').replaceWith(data.data[4].value)
			},
			error: function(xhr, type, errorThrown){

			}
		}
	)
}



get_time()
get_m1_data()
get_r2_data()
get_world_data()
get_news_data()
get_top5_data()
get_world_stats()
get_usa_time()

setInterval(get_time,1000)
setInterval(get_m1_data,1000*20000)
setInterval(get_r2_data,1000*20000)
setInterval(get_world_data,1000*20000)
setInterval(get_news_data,1000*10000)
setInterval(get_world_stats,1000*60000)
setInterval(get_top5_data,1000*20000)
setInterval(get_usa_time,1000*60000)

