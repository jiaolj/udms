require.config({paths: {echarts: '/static/js/dist'}});
(function(){
	var MVP = MVP || {};
	MVP.view = (function(){
		return {
			getTimeChart : function(cid){
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
									data : ['01-01 08:01:01','01-01 08:02:01','01-01 08:03:01','01-02 08:01:01','01-02 08:05:01']
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
							grid : {x:'6%',y:'14%',x2:'6%',y2:'14%'},
							series : [
								{
									name:'最高气温',
									type:'line',
									smooth : true,
									data:[1, 11, 20, 14, 12],
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
			getWordChart : function(cid){
				function createRandomItemStyle() {
					return {
						normal: {
							color: 'rgb(' + [
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160)
							].join(',') + ')'
						}
					};
				}
				var obj = document.getElementById(cid), v = 24;
				require(
					['echarts','echarts/chart/wordCloud'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							tooltip: {
								showDelay : 300,
								hideDelay : 400,
								enterable : true,
								trigger: 'item',
								//padding : 0,
								formatter : function (params) {
									var label = params[1];
									if (params.value[0]=='-') return label;
									return  '详细内容 : <br />'
											+ '详细内容详细内容详细内容<br />详细内容详细内容详细内容'
								}
							},
							series: [{
								tooltip: {
									enterable : true,
								},
								//name: 'Google Trends',
								type: 'wordCloud',
								//center:['50%', '50%'],
								size: ['100%', '100%'],
								textRotation : [0,90,45,-45],
								textPadding: v,
								data: [
									{name:'苹果',value:v,itemStyle: createRandomItemStyle()},
									{name:'梨子',value:v,itemStyle: createRandomItemStyle()},
									{name:'香蕉',value:v,itemStyle: createRandomItemStyle()},
									{name:'葡萄',value:v,itemStyle: createRandomItemStyle()},
									{name:'奇异果',value:v,itemStyle: createRandomItemStyle()},
									{name:'榴莲',value:v,itemStyle: createRandomItemStyle()},
									{name:'橘子',value:v,itemStyle: createRandomItemStyle()},
									{name:'柿子',value:v,itemStyle: createRandomItemStyle()},
									{name:'橙子',value:v,itemStyle: createRandomItemStyle()},
								]
							}]
						}; 
						o.setOption(option);
						//o.on('click',function(p){
						//	open('/analyze/?evt_id=1');
						//})
						//MVP.model.setDataURL(o);
					}
				)
				return this;
			},
			getForceChart : function(cid){
				var obj = document.getElementById(cid);
				require(
					['echarts','echarts/chart/force',],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							title : {
								show : false,
								text: '人物关系：乔布斯',
								subtext: '数据来自人立方',
								x:'right',
								y:'bottom'
							},
							tooltip : {
								trigger: 'item',
								formatter: '{a} : {b}'
							},
							toolbox: {
								show : false,
								feature : {
									restore : {show: true},
									magicType: {show: true, type: ['force', 'chord']},
									saveAsImage : {show: true}
								}
							},
							legend: {
								show : false,
								x: 'left',
								data:['家人','朋友']
							},
							series : [
								{
									type:'force',
									center: ['40%', '50%'],
									size:'120%',
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
												show: false,
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
												type: 'curve',
												width : 0.4
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
									minRadius : 4,
									maxRadius : 16,
									gravity: 1.1,
									scaling: 1.1,
									roam: 'move',
									nodes:[
										{category:0, name: '乔布斯', value : 10, label: '乔布斯\n（主要）'},
										{category:1, name: '丽萨-乔布斯',value : 1},
										{category:1, name: '保罗-乔布斯',value : 1},
										{category:1, name: '克拉拉-乔布斯',value : 1},
										{category:1, name: '劳伦-鲍威尔',value : 7},
										{category:2, name: '史蒂夫-沃兹尼艾克',value : 1},
										{category:2, name: '奥巴马',value : 1},
										{category:2, name: '比尔-盖茨',value : 1},
										{category:2, name: '乔纳森-艾夫',value : 1},
										{category:2, name: '蒂姆-库克',value : 1},
										{category:2, name: '龙-韦恩',value : 1},
									],
									links : [
										{source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿'},
										{source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲'},
										{source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲'},
										{source : '劳伦-鲍威尔', target : '乔布斯', weight : 2},
										{source : '史蒂夫-沃兹尼艾克', target : '乔布斯', weight : 3, name: '合伙人'},
										{source : '奥巴马', target : '乔布斯', weight : 1},
										{source : '比尔-盖茨', target : '乔布斯', weight : 6, name: '竞争对手'},
										{source : '乔纳森-艾夫', target : '乔布斯', weight : 1, name: '爱将'},
										{source : '蒂姆-库克', target : '乔布斯', weight : 1},
										{source : '龙-韦恩', target : '乔布斯', weight : 1},
										{source : '克拉拉-乔布斯', target : '保罗-乔布斯', weight : 1},
										{source : '奥巴马', target : '保罗-乔布斯', weight : 1},
										{source : '奥巴马', target : '克拉拉-乔布斯', weight : 1},
										{source : '奥巴马', target : '劳伦-鲍威尔', weight : 1},
										{source : '奥巴马', target : '史蒂夫-沃兹尼艾克', weight : 1},
										{source : '比尔-盖茨', target : '奥巴马', weight : 6},
										{source : '比尔-盖茨', target : '克拉拉-乔布斯', weight : 1},
										{source : '蒂姆-库克', target : '奥巴马', weight : 1}
									]
								}
							]
						};
						o.setOption(option);
					}
				)
				return this;
			},
			getPieChart : function(cid,d,t){
				var labelFromatter = {
					normal : {
						label : {
							show:false,
							formatter : function (params){
								return 100 - params.value + '%'
							},
							textStyle: {
								baseline : 'top',
								fontSize:20
							}
						},
						labelLine : {
							show : false
						}
					},
				}
				if (t) var radius=['50%','70%'];
				else var radius='55%';
				require(
					['echarts','echarts/chart/pie',],
					function (ec) {
						var o = ec.init(document.getElementById(cid));
						var option = {
							tooltip : {
								trigger: 'item',
							},
							legend:d.l,
							series : [
								{
									type:'pie',
									radius : radius,
									center: ['50%', '45%'],
									itemStyle : labelFromatter,
									data : d.d,
								}
							]
						}; 
						o.setOption(option);
					}
				)
				return this;
			},
			getMapChart : function(cid){
				require(
					['echarts','echarts/chart/map',],
					function (ec) {
						var o = ec.init(document.getElementById(cid));
						var option = {
							tooltip : {
								trigger: 'item',
								formatter: '{b}'
							},
							dataRange: {
								min: 0,
								max: 2500,
								x: 'left',
								y: 'bottom',
								text:['高','低'],
								calculable : true
							},
							series : [
								{
									name: '中国',
									type: 'map',
									mapType: 'china',
									/*itemStyle:{
										normal:{label:{show:true}},
										emphasis:{label:{show:true}}
									},*/
									data:[
										{name:'广东',value:1000,itemStyle:{normal:{label:{show:true}},emphasis:{label:{show:true}}}}
									]
								}
							]
						}
						o.setOption(option);
					}
				)
				return this;
			},
			getGaugeChart : function(cid){
				require(
					['echarts','echarts/chart/gauge','echarts/chart/wordCloud',],
					function (ec) {
						var o = ec.init(document.getElementById(cid));
						option = {
							tooltip : {
								formatter: "{a} <br/>{b} : {c}%"
							},
							legend: {
								show:false,
								orient : 'horizontal',
								x : 'left',
								y:'bottom',
								data:[
								{name:'负能量',textStyle:{color:'#333'}},
								{name:'中性',textStyle:{color:'#333'}},
								{name:'正能量',textStyle:{color:'#333'}},
								]
							},
							series : [
								{
									name:'情感值',
									type:'gauge',
									center:['50%', '86%'],
									radius:['0%','120%'],
									startAngle:180,
									endAngle:0,
									detail : {show:false,formatter:'{value}%'},
									data:[{value: 30, name: '正能量'}],
									axisLabel: {		// 坐标轴文本标签，
										show: true,
										formatter: function(v){
											switch (v+''){
												case '0': return '-100';
												case '10': return '-80';
												case '20': return '-60';
												case '30': return '-40';
												case '40': return '-20';
												case '50': return '0';
												case '60': return '20';
												case '70': return '40';
												case '80': return '60';
												case '90': return '80';
												case '100': return '100';
												default: return '';
											}
										},
										textStyle: {		// 其余属性默认使用全局文本样式，详见TEXTSTYLE
											color: '#333'
										}
									}
								},
								{
									name: '情感值',
									type: 'wordCloud',
									size: ['80%', '80%'],
									center: ['12%', '24%'] ,
									textRotation : [0,0],
									textPadding: 0,
									autoSize: {
										enable: true,
										minSize: 14
									},
									data: [
										{
											name: '-40',
											value: 10000,
											itemStyle: {
												normal: {
													color: 'black'
												}
											}
										}
									]
								}
							]
						};
						o.setOption(option);
						clearInterval(timeTicket);
						var timeTicket = setInterval(function (){
							var v = parseInt(Math.random()*100);
							option.series[0].data[0].value = v;
							option.series[1].data[0].name = (v-50)*2;
							o.setOption(option, true);
						},2000);
					}
				)
				return this;
			},
			query : function(){
				var labelBottom = {
					normal : {
						color: '#ccc',
						label : {
							show : true,
							position : 'center'
						},
						labelLine : {
							show : false
						}
					},
					emphasis: {
						color: 'rgba(0,0,0,0)'
					}
				}
				var labelTop = {
					normal : {
						label : {
							show : true,
							position : 'center',
							formatter : '{b}',
							textStyle: {
								baseline : 'bottom',
								fontSize:20
							}
						},
					}
				};
				var dst={t:['男','女'],d:[{name:'男', value:60, itemStyle : labelTop},{name:'女', value:40,itemStyle : labelBottom}],l:{orient : 'vertical',x:'center',y:'bottom',data:['男','女']}};
				this.getTimeChart('chart2').getForceChart('chart1').getPieChart('chart3',dst,1).getWordChart('chart4').getGaugeChart('chart5').getPieChart('chart6',dst,1).getMapChart('chart7').getNetChart('chart8');
			}
		}
	})()
	MVP.init = (function(){
		this.view.query();
	})
	window.MVP = MVP;
})();
MVP.init();