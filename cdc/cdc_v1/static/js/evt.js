require.config({paths: {echarts: '/static/js/dist'}});
(function(){
	var MVC = MVC || {};
	MVC.model = (function(){
		var _static = {
				host : 'http://10.13.93.252:8081/',
				requrl : Base.getRequest(),
			},
			_ajax = function(d){
				$.ajax({
					url: _static.host + d.url,
					type: 'GET',
					data: d.arg,
					dataType: 'json'
				}).done(function(data) {
					d.suc(data);
				}).fail(function(jqXHR,textStatus) {
					log(' request failed'+textStatus);
					d.fail && d.fail();
				});
			};
		return {
			gets : function(d){
				return _static[d];
			},
			ajax : function(d){
				_ajax(d);
			}
		}
	})();
	MVC.view = (function(){
		return {
			getTimeChart : function(cid,data){
				var obj = document.getElementById(cid);
				require(
					['echarts','echarts/chart/line'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							tooltip : {
								trigger: 'axis'
							},
							xAxis : [
								{
									type : 'category',
									boundaryGap : false,
									data : data.dates //['2015-01-01 08:01:01','2015-01-01 08:02:01','2015-01-01 08:03:01','2015-01-02 08:01:01','2015-01-02 08:05:01','2015-01-04 08:01:01','2015-01-08 08:01:01']
								}
							],
							yAxis : [
								{
									type : 'value',
									axisLabel : {
										formatter: '{value}'
									}
								}
							],
							grid : {x:'5%',y:'10%',x2:'5%',y2:'10%'},
							series : [
								{
									name:'最高气温',
									type:'line',
									smooth : true,
									data:data.counts //[1, 11, 20, 14, 12, 13, 10],
									/*markPoint : {
										data : [
											{name: '第一',value:20,yAxis:20,xAxis:2},
											{name: '第二',value:14,yAxis:14,xAxis:3},
											{name: '第三',value:13,yAxis:13,xAxis:5},
										]
									},*/
								}
							]
						};
						o.setOption(option);
					}
				)
				return this;
			},
			getMapChart : function(cid){
				var obj = document.getElementById(cid);
				require(
					['echarts','echarts/chart/map'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							title : {
								text: 'iphone销量',
								subtext: '',
								x:'center'
							},
							tooltip : {
								trigger: 'item'
							},
							legend: {
								show:false,
								orient: 'vertical',
								x:'left',
								data:['iphone']
							},
							dataRange: {
								min: 0,
								max: 2500,
								x: 'left',
								y: 'bottom',
								text:['高','低'],           // 文本，默认为数值文本
								calculable : true
							},
							series : [
								{
									name: 'iphone',
									type: 'map',
									mapType: 'china',
									roam: false,
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '北京',value: Math.round(Math.random()*1000)},
										{name: '天津',value: Math.round(Math.random()*1000)},
										{name: '上海',value: Math.round(Math.random()*1000)},
										{name: '重庆',value: Math.round(Math.random()*1000)},
										{name: '河北',value: Math.round(Math.random()*1000)},
										{name: '河南',value: Math.round(Math.random()*1000)},
										{name: '云南',value: Math.round(Math.random()*1000)},
										{name: '辽宁',value: Math.round(Math.random()*1000)},
										{name: '黑龙江',value: Math.round(Math.random()*1000)},
										{name: '湖南',value: Math.round(Math.random()*1000)},
										{name: '安徽',value: Math.round(Math.random()*1000)},
										{name: '山东',value: Math.round(Math.random()*1000)},
										{name: '新疆',value: Math.round(Math.random()*1000)},
										{name: '江苏',value: Math.round(Math.random()*1000)},
										{name: '浙江',value: Math.round(Math.random()*1000)},
										{name: '江西',value: Math.round(Math.random()*1000)},
										{name: '湖北',value: Math.round(Math.random()*1000)},
										{name: '广西',value: Math.round(Math.random()*1000)},
										{name: '甘肃',value: Math.round(Math.random()*1000)},
										{name: '山西',value: Math.round(Math.random()*1000)},
										{name: '内蒙古',value: Math.round(Math.random()*1000)},
										{name: '陕西',value: Math.round(Math.random()*1000)},
										{name: '吉林',value: Math.round(Math.random()*1000)},
										{name: '福建',value: Math.round(Math.random()*1000)},
										{name: '贵州',value: Math.round(Math.random()*1000)},
										{name: '广东',value: Math.round(Math.random()*1000)},
										{name: '青海',value: Math.round(Math.random()*1000)},
										{name: '西藏',value: Math.round(Math.random()*1000)},
										{name: '四川',value: Math.round(Math.random()*1000)},
										{name: '宁夏',value: Math.round(Math.random()*1000)},
										{name: '海南',value: Math.round(Math.random()*1000)},
										{name: '台湾',value: Math.round(Math.random()*1000)},
										{name: '香港',value: Math.round(Math.random()*1000)},
										{name: '澳门',value: Math.round(Math.random()*1000)}
									]
								}
							]
						};
						o.setOption(option);
					}
				)
				return this;
			},
			getNetChart : function(cid){
				var obj = document.getElementById(cid);
				require(
					['echarts','echarts/chart/force'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							title : {
								text: '相关内容',
								subtext: '',
								x:'center',
							},
							tooltip : {
								trigger: 'item',
								formatter: '{a} : {b}'
							},
							legend: {
								show: false,
								x: 'left',
								data:['家人','朋友']
							},
							series : [
								{
									type:'force',
									name : "人物关系",
									ribbonType: false,
									categories : [
										{
											name: '人物'
										},
										{
											name: '家人'
										},
										{
											name:'朋友'
										}
									],
									itemStyle: {
										normal: {
											label: {
												show: true,
												textStyle: {
													color: '#333'
												}
											},
											nodeStyle : {
												brushType : 'both',
												borderColor : 'rgba(255,215,0,0.4)',
												borderWidth : 1
											},
											linkStyle: {
												type: 'line'
											}
										},
										emphasis: {
											label: {
												show: false
												// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
											},
											nodeStyle : {
												//r: 30
											},
											linkStyle : {}
										}
									},
									useWorker: false,
									minRadius : 15,
									maxRadius : 25,
									gravity: 1.1,
									scaling: 1.1,
									roam: 'move',
									nodes:[
										{category:0, name: '乔布斯', value : 10, label: '乔布斯\n（主要）'},
										{category:1, name: '丽萨-乔布斯',value : 2},
										{category:1, name: '保罗-乔布斯',value : 3},
										{category:1, name: '克拉拉-乔布斯',value : 3},
									],
									links : [
										{source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿'},
										{source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲'},
										{source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲'},
									]
								}
							]
						}
						o.setOption(option);
					}
				)
				return this;
			},
			timeChart : function(){
				var prt = this, evt_id = MVC.model.gets('requrl').evt_id;
				MVC.model.ajax({
					url:'news/'+evt_id,
					arg:'',
					suc:function(d){
						$('.title').text(d.title);
						$('.content').html(d.contentFormatted);
					}
				})
				MVC.model.ajax({
					url:'news/'+evt_id+'/linechart',
					arg:'',
					suc:function(d){
						prt.getTimeChart('chart1',d);
					}
				})
			},
			query : function(){
				this.timeChart('chart1');
				//this.getTimeChart('chart1').getMapChart('chart2').getNetChart('chart3');
			}
		}
	})()
	MVC.init = (function(){
		this.view.query();
	})
	window.MVC = MVC;
})();
MVC.init();