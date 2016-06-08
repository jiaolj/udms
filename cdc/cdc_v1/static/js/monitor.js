require.config({paths: {echarts: '/static/js/dist'}});
(function(){
	var MVP = MVP || {};
	MVP.model = (function(){
		var _tmlObj,
			_ishover = 0,
			_diseaseHtml= null,
			_symptomsHtml= null,
			_geoCoord={
				//美洲
				'起点':[0,0],
				'美国':[-100,40],
				'加拿大':[-110,58],
				'格陵兰':[-40,73],//+
				'冰岛':[-18,65],
				'墨西哥':[-102,23],
				'巴哈马':[-78.1,24.6],
				'百慕大':[-78.1,28.6],
				'古巴':[-78.1,21.3],
				'牙买加':[-77.2,18.1],
				'海地':[-72.2,18.9],
				'多明尼加共和国':[-70.4,18.9],
				'波多黎各':[-66.5,18.2],
				'危地马拉':[-90.6,15.1],
				'瓜地马拉':[-90.6,15.1],//就是危地马拉
				'伯利兹':[-88.6,17.1],
				'萨尔瓦多':[-89.1,13.8],
				'洪都拉斯':[-87.1,14.6],
				'尼加拉瓜':[-85.1,12.6],
				'哥斯达黎加':[-83.8,9.8],
				'巴拿马':[-80.9,8.3],
				'哥伦比亚':[-74.05,4.36],
				'委内瑞拉':[-66.56,8.3],
				'特里尼达和多巴哥':[-61.3,10.4],
				'圭亚那':[-58.1,5.4],
				'苏里南':[-55.3,4.5],
				'法属圭亚那':[-53.5,4.2],
				'厄瓜多尔':[-78.3,-1.1],
				'秘鲁':[-76.7,-8.2],
				'玻利维亚':[-65.7,-17.2],
				'巴西':[-48.7,-14.2],
				'智利':[-70.7,-30.2],
				'阿根廷':[-63.7,-30.2],
				'巴拉圭':[-56.7,-25.2],
				'乌拉圭':[-56.7,-33.2],
				'福克兰群岛':[-59.7,-51.7],
				//非洲
				'摩洛哥':[-6.2,31.6],
				'西撒哈拉':[-13.1,23.5],
				'阿尔及利亚':[3.1,27.4],
				'突尼斯':[9.5,34.2],
				'利比亚':[16.1,27.2],
				'埃及':[30.1,26.1],
				'毛里塔尼亚':[-11.2,18.4],
				'塞内加尔':[-15.6,14.8],
				'几内亚比绍':[-15.5,11.8],
				'几内亚':[-11.5,10.8],
				'冈比亚':[-15.6,13.4],
				'马里':[-2.8,18.1],
				'布基纳法索':[-2.8,12.1],
				'尼日尔':[9.1,17.1],
				'乍得':[17.8,14.4],
				'查德':[17.8,14.4],//乍得
				'苏丹':[31.1,15.3],
				'厄立特里亚':[37.7,15.5],
				'塞拉利昂':[-11.7,8.2],
				'利比里亚':[-9.7,6.2],
				'加纳':[-1.3,7.2],
				'象牙海岸':[-5.7,7.2],
				'多哥':[1.1,7.2],
				'贝宁':[2.3,10.1],
				'尼日利亚':[7.3,9.1],
				'喀麦隆':[11.31,3.5],
				'中非':[18.3,6.2],
				'中非共和国':[18.3,6.2],
				'南苏丹':[31.1,7.3],
				'埃塞俄比亚':[39.1,6.4],
				'吉布提':[42.3,11.5],
				'索马里兰':[46.3,9.5],
				'索马里':[49.3,8.5],
				'赤道几内亚':[10.1,1.6],
				'加蓬':[12.2,-1.1],
				'刚果':[13.1,-4.1],
				'刚果共和国':[13.1,-4.1],
				'刚果民主共和国':[20.1,-4.1],
				'乌干达':[32.2,0.2],
				'卢旺达':[30.2,-2.0],
				'布隆迪':[30.1,-3.4],
				'坦桑尼亚':[39.17,6.48],
				'坦桑尼亚联合共和国':[35.1,-5.1],
				'肯尼亚':[36.25,0.19],
				'安哥拉':[17.1,-12.1],
				'赞比亚':[25.1,-15.1],//+
				'尚比亚':[25.1,-15.1],//赞比亚
				'马拉维':[33.8,-12.1],
				'莫桑比克':[38.2,-14.1],//+
				'马达加斯加':[46.6,-19.1],
				'纳米比亚':[17.1,-23.1],
				'博茨瓦纳':[23.1,-23.1],
				'津巴布韦':[30.1,-19.1],//+
				'辛巴威':[30.1,-19.1],//津巴布韦
				'南非':[23.1,-30.1],
				'莱索托':[28.1,-29.7],//+
				'斯威士兰':[31.5,-26.7],//+
				'法属南半球和南极领地':[69.6,-49.4],
				//欧洲
				'爱尔兰':[-8.1,52.9],
				'英国':[-1.1,52.3],
				'挪威':[7.4,60.1],
				'瑞典':[15.1,59.2],
				'芬兰':[24.5,62.1],
				'葡萄牙':[-8.1,38.4],
				'西班牙':[-4.1,39.2],
				'法国':[2.2,46.5],
				'比利时':[4.2,50.5],
				'卢森堡':[6.0,49.8],
				'荷兰':[5.5,52.2],
				'丹麦':[12.3,55.4],
				'德国':[9.2,50.1],
				'瑞士':[8.1,46.6],
				'意大利':[14.2,41.5],
				'梵蒂冈':[11.5,43.9], //意大利里面的国中国
				'马耳他':[14.31,35.54], //意大利下面的岛国
				'波兰':[21.0,52.15],
				'捷克':[14.2,49.8],
				'捷克共和国':[14.2,49.8],
				'斯洛伐克':[18.1,48.1],
				'奥地利':[16.2,48.13],
				'匈牙利':[19.1,47.3],
				'斯洛文尼亚':[14.5,45.9],
				'克罗地亚':[16.5,45.6],
				'波斯尼亚和黑塞哥维那':[17.5,44.2],
				'塞尔维亚共和国':[20.6,44.1],
				'黑山':[19.5,42.8],
				'科索沃':[21.1,42.6],
				'阿尔巴尼亚':[19.9,41.2],
				'马其顿':[21.7,41.6],
				'希腊':[22.4,38.6],
				'爱沙尼亚':[25.5,58.2],
				'拉脱维亚':[24.1,56.5],
				'立陶宛':[25.2,54.4],
				'白俄罗斯':[27.3,53.5],
				'乌克兰':[30.3,49.2],
				'罗马尼亚':[26.1,45.2],
				'摩尔多瓦':[28.5,47.2],
				'保加利亚':[25.2,42.4],
				//亚洲
				'俄罗斯':[50.3,58.5],
				'格鲁吉亚':[44.3,41.6],//+
				'土耳其':[32.5,39.5],
				'北塞浦路斯':[33.7,35.2],
				'塞浦路斯':[33.0,34.8],
				'亚美尼亚':[44.8,40.1],
				'阿塞拜疆':[48.1,40.2],
				'叙利亚':[38.2,34.3],
				'黎巴嫩':[35.7,33.7],
				'以色列':[34.8,30.9],
				'西岸':[35.3,32.1],
				'巴勒斯坦地区':[35.3,31.9],//就是西岸
				'伊拉克':[44.2,33.2],
				'科威特':[47.6,29.3],
				'约旦':[36.6,31.6],
				'沙特阿拉伯':[46.4,24.4],//+
				'沙乌地阿拉伯':[46.4,24.4],//沙特阿拉伯
				'卡塔尔':[51.3,25.2],
				'巴林':[50.9,26.2],//卡塔尔上边
				'阿联酋':[54.2,23.2],
				'阿曼':[58.1,21.4],
				'也门':[44.12,15.2],
				'哈萨克斯坦':[74.6,47.1],
				'乌兹别克斯坦':[65.2,41.2],
				'吉尔吉斯斯坦':[75.4,41.5],
				'塔吉克斯坦':[69.5,38.3],
				'土库曼斯坦':[58.2,39.1],
				'伊朗':[51.2,35.4],
				'阿富汗':[69.1,34.31],
				'巴基斯坦':[72.1,32.4],
				'蒙古':[106.5,47.5],
				'中国':[111.1,31.1],
				'印度':[77.1,28.3],
				'斯里兰卡':[80.7,6.5],
				'马尔代夫':[73.3,4.4],//印度洋上的岛国
				'尼泊尔':[85.2,27.4],
				'不丹':[89.9,27.3],
				'孟加拉':[90.2,23.4],
				'孟加拉国':[90.2,23.4],
				'缅甸':[96.1,16.5],
				'泰国':[102.4,15.6],
				'老挝':[102.4,19.6],
				'东埔寨':[104.5,11.3],
				'柬埔寨':[104.5,11.3],
				'越南':[105.5,21.1],
				'朝鲜':[126.4,39.1],
				'北朝鲜':[126.4,39.1],
				'韩国':[127.6,36.3],
				'日本':[139.4,35.4],
				'菲律宾':[120.6,15.3],
				'印尼':[112.9,-1.6],
				'马来西亚':[112.9,2.3],
				'新加坡':[103.9,1.3],
				'文莱':[114.9,4.6],
				'汶莱':[114.9,4.6],
				'东帝汶':[125.9,-8.9],
				//大洋洲
				'印度尼西亚':[103.9,1],
				'巴布亚新几内亚':[147.1,-8.8],
				'所罗门群岛':[160.2,-9.7],
				'瓦努阿图':[166.9,-15.2],
				'斐':[178.2,-17.9],
				'斐济':[178.2,-17.9],//斐
				'新喀里多尼亚':[165.9,-21.6],
				'澳大利亚':[125.9,-25.9],
				'新西兰':[169.1,-45.6],//+
				'纽西兰':[169.1,-45.6],//新西兰

				"海门":[121.15,31.89],
				"鄂尔多斯":[109.781327,39.608266],
				"招远":[120.38,37.35],
				"舟山":[122.207216,29.985295],
				"齐齐哈尔":[123.97,47.33],
				"盐城":[120.13,33.38],
				"赤峰":[118.87,42.28],
				"青岛":[120.33,36.07],
				"乳山":[121.52,36.89],
				"金昌":[102.188043,38.520089],
				"泉州":[118.58,24.93],
				"莱西":[120.53,36.86],
				"日照":[119.46,35.42],
				"胶南":[119.97,35.88],
				"南通":[121.05,32.08],
				"拉萨":[91.11,29.97],
				"云浮":[112.02,22.93],
				"梅州":[116.1,24.55],
				"文登":[122.05,37.2],
				"上海":[121.48,31.22],
				"攀枝花":[101.718637,26.582347],
				"威海":[122.1,37.5],
				"承德":[117.93,40.97],
				
				"福建":[118.1,25.46],
				"福州":[119.3,26.08],
				"厦门":[118.1,24.46],
				"漳州":[117.4,24.46],
				"三明":[117.4,26.08],
				
				"汕尾":[115.375279,22.786211],
				"潮州":[116.63,23.68],
				"丹东":[124.37,40.13],
				"太仓":[121.1,31.45],
				"曲靖":[103.79,25.51],
				"烟台":[121.39,37.52],
				
				"瓦房店":[121.979603,39.627114],
				"即墨":[120.45,36.38],
				"抚顺":[123.97,41.97],
				"玉溪":[102.52,24.35],
				
				"台湾":[121.01,24.08],
				"台南市":[120.21,23.28],
				"高雄市":[120.41,22.68],
				
				"河北":[115.01,40.82],
				"张家口":[114.87,40.82],
				
				"内蒙古":[114.87,43.82],
				
				"阳泉":[113.57,37.85],
				"莱州":[119.942327,37.177017],
				"湖州":[120.1,30.86],
				"汕头":[116.69,23.39],
				"昆山":[120.95,31.39],
				
				"浙江":[121.1,29.3],
				"宁波":[121.56,29.86],
				"湛江":[110.359377,21.270708],
				
				"海南":[110,19.4],
				
				"揭阳":[116.35,23.55],
				"荣成":[122.41,37.16],
				"连云港":[119.16,34.59],
				"葫芦岛":[120.836932,40.711052],
				"常熟":[120.74,31.64],
				"河源":[114.68,23.73],
				"淮安":[119.15,33.5],
				
				"江苏":[119.9,33.49],
				"泰州":[119.9,32.49],
				
				"营口":[122.18,40.65],
				"江阴":[120.26,31.91],
				"蓬莱":[120.75,37.8],
				"韶关":[113.62,24.84],
				"嘉峪关":[98.289152,39.77313],
				"延安":[109.47,36.6],
				
				"山西":[112.53,38.87],
				"太原":[112.53,37.87],
				"忻州":[112.53,38.27],
				"吕梁":[111.53,37.37],
				"运城":[111.33,35.37],
				
				"广东":[114.01,23.7],
				"清远":[113.01,23.7],
				"中山":[113.38,22.52],
				"惠州":[114.4,23.09],
				"东莞":[113.75,23.04],
				
				"广西":[107.71,24],
				"南宁":[108.33,22.84],
				
				"云南":[101.73,25.04],
				"昆明":[102.73,25.04],
				"西双版纳":[101.03,22.14],
				
				"寿光":[118.73,36.86],
				"盘锦":[122.070714,41.119997],
				"长治":[113.08,36.18],
				
				"广州":[113.23,23.16],
				"深圳":[114.07,22.62],
				"香港":[114.47,22.32],
				"澳门":[114.47,22.02],
				
				"珠海":[113.52,22.3],
				"宿迁":[118.3,33.96],
				"咸阳":[108.72,34.36],
				"铜川":[109.11,35.09],
				"平度":[119.97,36.77],
				"佛山":[113.11,23.05],
				"海口":[110.35,20.02],
				"江门":[113.06,22.61],
				"章丘":[117.53,36.72],
				"肇庆":[112.44,23.05],
				
				"辽宁":[121.62,41.63],
				"锦州":[121.62,41.13],
				"朝阳市":[120.42,41.42],
				"大连":[121.62,38.92],
				
				"临汾":[111.5,36.08],
				"吴江":[120.63,31.16],
				"石嘴山":[106.39,39.04],
				"沈阳":[123.38,41.8],
				"苏州":[120.62,31.32],
				"茂名":[110.88,21.68],
				"嘉兴":[120.76,30.77],
				
				"吉林":[126.35,43.88],
				"长春":[125.35,43.88],
				"四平":[124.65,43.08],
				"辽源":[125.15,43.08],
				
				"胶州":[120.03336,36.264622],
				
				
				"宁夏":[106.27,37.47],
				"银川":[106.27,38.47],
				"固原":[106.27,36.07],
				
				"张家港":[120.555821,31.875428],
				"三门峡":[111.19,34.76],
				
				'江西':[114.89,27.68],
				'萍乡':[114.19,27.68],
				'宜春':[114.69,27.68],
				'赣州':[114.89,26.18],
				"南昌":[115.89,28.68],
				"抚州":[116.39,28.18],
				"鹰潭":[116.89,28.58],
				"景德镇":[116.39,29.18],
				"新余":[116.01,27.68],
				"吉安":[116.11,26.38],
				"上饶":[117.69,28.48],
				
				"柳州":[109.4,24.33],
				"三亚":[109.511909,18.252847],
				"自贡":[104.778442,29.33903],
				"吉林":[126.57,43.87],
				"阳江":[111.95,21.85],
				
				"四川":[102.39,30.91],
				"泸州":[105.39,28.91],
				
				"甘肃":[103.74,36.96],
				"兰州市":[103.74,36.16],
				
				"青海":[99.74,36.56],
				"黄南":[101.34,35.26],
				"西宁":[101.74,36.56],
				
				"宜宾":[104.56,29.77],
				"呼和浩特":[111.65,40.82],
				"成都":[104.06,30.67],
				"大同":[113.3,40.12],
				"镇江":[119.44,32.2],
				"桂林":[110.28,25.29],
				
				"湖南":[111.4,28],
				"湘西":[110.4,28],
				"张家界":[110.479191,29.117096],
				"怀化":[110.1,27.1],
				"郴州":[113.1,26.1],
				
				"宜兴":[119.82,31.36],
				"北海":[109.12,21.49],
				
				"陕西":[109.95,34.27],
				"榆林":[109.4,37.17],
				"西安":[108.95,34.27],
				
				"金坛":[119.56,31.74],
				"东营":[118.49,37.46],
				"牡丹江":[129.58,44.6],
				"遵义":[106.9,27.7],
				"绍兴":[120.58,30.01],
				"扬州":[119.42,32.39],
				"常州":[119.95,31.79],
				"潍坊":[119.1,36.62],
				"重庆":[106.54,29.59],
				"台州":[121.420757,28.656386],
				"南京":[118.78,32.04],
				"滨州":[118.03,37.36],
				
				"贵州":[106.71,26],
				"贵阳":[106.71,26.57],
				
				"无锡":[120.29,31.59],
				"本溪":[123.73,41.3],
				"克拉玛依":[84.77,45.59],
				"渭南":[109.5,34.52],
				"马鞍山":[118.48,31.56],
				"宝鸡":[107.15,34.38],
				"焦作":[113.21,35.24],
				"句容":[119.16,31.95],
				"北京":[116.46,39.92],
				"徐州":[117.2,34.26],
				"衡水":[115.72,37.72],
				"包头":[110,40.58],
				"绵阳":[104.73,31.48],
				
				"新疆":[87.68,41.77],
				"阿克苏":[81.1,41.17],
				"昌吉":[87.1,44.17],
				"乌鲁木齐":[87.68,43.77],
				"吐鲁番":[88.68,42.77],
				"和田":[79.01,35.07],
				"喀什":[76.1,39.17],
				
				"枣庄":[117.57,34.86],
				"杭州":[120.19,30.26],
				"淄博":[118.05,36.78],
				"鞍山":[122.85,41.12],
				"溧阳":[119.48,31.43],
				"库尔勒":[86.06,41.68],
				"安阳":[114.35,36.1],
				"开封":[114.35,34.79],
				"济南":[117,36.65],
				"德阳":[104.37,31.13],
				"温州":[120.65,28.01],
				"九江":[115.97,29.71],
				"邯郸":[114.47,36.6],
				"临安":[119.72,30.23],
				"兰州":[103.73,36.03],
				"沧州":[116.83,38.33],
				"临沂":[118.35,35.05],
				"南充":[106.110698,30.837793],
				"天津":[117.2,39.13],
				"富阳":[119.95,30.07],
				"诸暨":[120.23,29.71],
				
				"山东":[117.13,35.68],
				"泰安":[117.13,36.18],
				
				"河南":[113,33],
				"新乡":[113,35],
				"郑州":[113.65,34.76],
				
				"黑龙江":[126.63,47.75],
				"兴安":[127.63,47.75],
				"哈尔滨":[126.63,45.75],
				"佳木斯":[129.63,46.75],
				
				"聊城":[115.97,36.45],
				"唐山":[118.02,39.63],
				"平顶山":[113.29,33.75],
				"邢台":[114.48,37.05],
				"德州":[116.29,37.45],
				"济宁":[116.59,35.38],
				"荆州":[112.239741,30.335165],
				"宜昌":[111.3,30.7],
				"义乌":[120.06,29.32],
				"丽水":[119.92,28.45],
				"洛阳":[112.44,34.7],
				"秦皇岛":[119.57,39.95],
				"株洲":[113.16,27.83],
				"石家庄":[114.48,38.03],
				"莱芜":[117.67,36.19],
				"常德":[111.69,29.05],
				"保定":[115.48,38.85],
				"湘潭":[112.91,27.87],
				"金华":[119.64,29.12],
				"岳阳":[113.09,29.37],
				
				"湖南":[113,29.01],
				"长沙":[113,28.21],
				"娄底":[112,27.71],
				"永州":[111.7,26.51],
				"益阳":[112,29.01],
				
				"衢州":[118.88,28.97],
				"廊坊":[116.7,39.53],
				"菏泽":[115.480656,35.23375],
				
				"安徽":[117,31],
				"合肥":[117.27,31.86],
				"六安":[116.67,31.86],
				"滁州":[118.07,32.46],
				"池州":[117.27,30.86],
				"宿州":[117,33],
				"黄山":[117,30.5],
				"芜湖":[118.38,31.33],
				"宣城":[118.68,30.33],
				"铜陵":[118.18,31.03],
				
				"湖北":[114,31],
				"武汉":[114.31,30.52],
				"黄冈":[113,30],
				"黄石":[113,30.52],
				"大庆":[125.03,46.58]
			},
			_chartMenu = $('#chartMenu>.active').attr('t');
		return {
			getGeoCoord : function(){
				return _geoCoord;
			},
			setDiseaseHtml : function(d){
				_diseaseHtml = d;
				return this;
			},
			getDiseaseHtml : function(){
				return _diseaseHtml;
			},
			setSymptomsHtml : function(d){
				_symptomsHtml = d;
				return this;
			},
			getSymptomsHtml : function(){
				return _symptomsHtml;
			},
			setDataURL : function(d){
				_tmlObj = d;
				return this;
			},
			getDataURL : function(){
				return _tmlObj.getDataURL();
			},
			setHover : function(d){
				_ishover = d;
				return this;
			},
			getHover : function(){
				return _ishover;
			},
			setChartMenu : function(d){
				_chartMenu = d;
				return this;
			},
			getChartMenu : function(){
				return _chartMenu;
			},
		}
	})();
	MVP.view = (function(){
		return {
			getTimeLine : function(cid, data){
				var obj = document.getElementById(cid),
					counts = data.counts,
					news = data.news,
					cmax = Math.max.apply(null, counts),
					ewith = parseInt((90/7).toFixed(2));
				require(
					['echarts','echarts/chart/line','echarts/chart/scatter','echarts/chart/treemap'],
					function (ec) {
						var o = ec.init(obj),
							option = {
								tooltip : {
									showDelay : 300,
									hideDelay : 300,
									enterable : true,
									trigger: 'item',
								},
								toolbox: {
									show : false,
									feature : {
										mark : {show: true},
										dataView : {show: true, readOnly: false},
										restore : {show: true},
										saveAsImage : {show: true}
									}
								},
								dataRange: {
									show : false,
									min: 0,
									max: 100,
									orient: 'horizontal',
									y: 'top',
									//text:['高','低'],           // 文本，默认为数值文本
									color:['lightgreen','yellow'],
									splitNumber: 5
								},
								xAxis : [
									{
										type : 'category',
										boundaryGap : false,
										splitLine: {show:false},
										data : data.dates/*function (){
											var list = [];
											for (var i = 1; i <= 7; i++) {
												list.push('2013-03-' + i);
											}
											return list;
										}()*/
									},
									{
										type : 'value',
										scale : true,
										splitNumber: 29,
										splitLine: {show:false},
										axisLabel: {show:false},
										splitLine: {show:false}
									}
								],
								yAxis : [
									{
										splitLine: {show:false},
										type : 'value'
									},
									{
										splitLine: {show:false},
										type : 'value'
									}
								],
								//animation: false,
								//animationThreshold : 5000,
								//animationDurationUpdate : 2000,
								animationDuration : 5000,
								legend: {
									x: 'left',
									data:['事件','微博']
								},
								color : ['#69B0A2'],
								series : [
									{
										name:'事件',
										type:'scatter',
										tooltip : {
											show : true,
											trigger: 'item',
											padding : 8,
											formatter : function (params) {
												var data = params.data[3];
												return '日期：' + data.pubTime + ' &nbsp;&nbsp;热度：' + data.heat + '<br/>'
														+ params.seriesName + ' : ' + data.title + '<br />'
														//+ '摘要：' + data.title + '...'
											}
										},
										yAxisIndex:1,
										xAxisIndex:1,
										symbol: 'circle',
										symbolSize: function (value){
											return Math.round(value[2]/10);
										},
										itemStyle : {
											normal : {
												color : '#F9C074',
												borderColor : '#3281C5',
												borderWidth : 1
											},
											emphasis : {
												label : {
													show: false
												}
											}
										},
										data: (function () {
											var d = [],
												lft = 10,
												cd,pct,
												//cw = o.dom.clientWidth,
												nd,heat;
											for( var n in news){
												cd = parseInt(counts[n]*200/cmax);
												pct = parseInt(cd/9);
												nd = news[n];
												//log(cd);
												for (var n2 in nd){
													heat = nd[n2].count;
													heat = 60+heat*30;
													if (heat>360){
														heat = 360;
													}
													d.push([
														lft + parseInt(Math.random()*10), //Math.round(Math.random()*29) + 1,
														cd - pct*n2, //(Math.random()*30).toFixed(2) - 0,
														heat, {tp:'evt',id:nd[n2].id,title:nd[n2].title,pubTime:nd[n2].pubTime,heat:nd[n2].count}
													])
												}
												lft += ewith + 100 ;
											};
											/*var len = 10;
											var value;
											while (len--) {
												d.push([
													Math.round(Math.random()*29) + 1,
													(Math.random()*30).toFixed(2) - 0,
													parseInt((Math.random()*200))+20, {tp:'evt',id:1}
												])
											}
											log(d);*/
											return d;
										})(),
									},
									{
										name:'微博',
										type:'scatter',
										tooltip : {
											show : true,
											trigger: 'item',
											padding : 8,
											formatter : function (params) {
												return '日期：2013-03-' + params.value[0] + '<br/>'
														+ params.seriesName + ' : 标题标题标题标题' + '<br />'
														+ '摘要：摘要摘要摘要摘要摘要摘要摘要<br />摘要摘要摘要摘要...'
											}
										},
										yAxisIndex:1,
										xAxisIndex:1,
										symbol: 'circle',
										symbolSize: function (value){
											return Math.round(value[2]/10);
										},
										itemStyle : {
											normal : {
												color : '#A99782'
											},
											emphasis : {
												label : {
													show: false
												}
											}
										},
										data: (function () {
											var d = [],
												lft = 5,
												news = data.blog,
												nd,heat,cd;
											for( var n in news){
												cd = parseInt(counts[n]*96/cmax);
												pct = parseInt(cd/10);
												nd = news[n];
												//log(cd);
												for (var n2 in nd){
													heat = nd[n2].count;
													if (heat<160){
														heat = 80+heat*20;
													}
													d.push([
														lft, //Math.round(Math.random()*29) + 1,
														cd - pct*n2, //(Math.random()*30).toFixed(2) - 0,
														heat, {tp:'blog',id:1}
													])
												}
												lft += ewith;
											};
											/*var len = 10;
											var value;
											while (len--) {
												d.push([
													Math.round(Math.random()*29) + 1,
													(Math.random()*30).toFixed(2) - 0,
													parseInt((Math.random()*200))+20, {tp:'evt',id:1}
												])
											}
											log(d);*/
											return d;
										})()
									},
									{
										smooth:true,
										name:'折线',
										type:'line',
										data:counts/*function (){
											var list = [];
											for (var i = 1; i <= 7; i++) {
												list.push(Math.round(Math.random()* 9));
											}
											return list;
										}()*/
									}
								]
							};
						var lfts = 10,cds,dd;
						for(var cts in counts){
							dd = news[cts]&&news[cts][0]&&news[cts][0].title;
							if(dd){
								if(dd.length>=20) dd=dd.substring(0,17)+'...';
								cds = 100-parseInt(counts[cts]*100/cmax);
								if(cds<=10) cds=16;
								else if(cds<=50) cds=cds*1.2;
								else cds=cds*0.9;
								option.series.push({
									name:'',
									tooltip: {show:false},
									type:'treemap',
									center:[lfts+'%',cds+'%'],
									size:[(60+dd.length*11)+'px','28px'],
									itemStyle: {
										normal: {
											label: {
												show: true,
												formatter: "{b}"
											},
											borderWidth: 1
										},
										emphasis: {
											label: {
												show: true
											}
										}
									},
									data:[
										{
											name: '  '+dd,
											value: 1,
											tp:'news',
											d:news[cts][0]
										}
									]
								});
								lfts += ewith;
							}
						}
						o.setOption(option);
						o.on('click',function(p){
							if(p.seriesName=='事件'||p.data.tp=='news'){
								var dt = p.data[3]||p.data.d;
								open('/analyze/?evt_id='+dt.id);
							}
							if(p.seriesName=='微博'){
								var dt = p.data[3];
								open('/analyze/?blog_id='+dt.id);
							}
						})
						MVP.model.setDataURL(o);
					}
				)
				return this;
			},
			getMapChart : function(cid,data){
				var obj = document.getElementById(cid),
					areaDir = {};
				require(
					['echarts','echarts/chart/map'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							title : {
								text: '地域分布',
								subtext: '',
								sublink: '',
								x:'center'
							},
							tooltip : {
								//show:false,
								//showDelay : 300,
								hideDelay : 1400,
								//backgroundColor:'#000',
								enterable : true,
								trigger: 'item',
								padding : 8,
								formatter : function (params) {
									var label = params[1], rhtm ='', news = params.data.news;
									news = areaDir[label];
									rhtm = '地区 : ' + label + '<br />';
									rhtm += '标题 ：<ol>';
									for(var ns in news) rhtm += '<li><a href="/analyze/?evt_id='+news[ns].id+'" target="_blank">'+news[ns].title+'</a></li>';
									return  rhtm+'</ol>';
								}
							},
							legend: {
								show : false,
								orient: 'vertical',
								x:'left',
								data:['pm2.5']
							},
							dataRange: {
								min : 0,
								max : data[1].count || 10,
								calculable : true,
								color: ['maroon','purple','red','orange','yellow','lightgreen']
							},
							series : [
								{
									name: 'pm2.5',
									type: 'map',
									mapType: 'china',
									hoverable: false,
									roam:false,
									itemStyle:{
										normal: {
											borderColor:'#fff',
											//borderWidth:'1',
											//color:'rgba(0,0,0,0)'
										}
									},
									data : [],
									markPoint : {
										symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
										symbol : 'circle',
										itemStyle: {
											normal: {
												borderColor: '#87cefa',
												borderWidth: 1,            // 标注边线线宽，单位px，默认为1
												label: {
													show: false
												}
											},
											emphasis: {
												borderColor: '#1e90ff',
												borderWidth: 5,
												label: {
													show: false
												}
											}
										},
										data : (function(){
											var lst = [];
											for(var d in data) {
												areaDir[data[d].name] = data[d].news;
												if(data[d].name!='中国') lst.push({name:data[d].name,value:data[d].count,news:data[d].news})
											};
											return lst;
										})()
									},
									geoCoord: MVP.model.getGeoCoord()
								},
								{
									name: 'Top5',
									type: 'map',
									mapType: 'china',
									data:[],
									markPoint : {
										symbol:'emptyCircle',
										symbolSize : function (v){
											return 10 + v/100
										},
										effect : {
											show: true,
											shadowBlur : 0
										},
										itemStyle:{
											normal:{
												label:{show:false}
											}
										},
										data : (function(){
											var lst = [],count = 0;
											for(var d in data){
												count++;
												if(count<5) if(data[d].name!='中国') lst.push({name:data[d].name,value:data[d].count,news:data[d].news});
												else break;
											}
											return lst;
										})()
									}
								}
							]
						};
						o.setOption(option);
						//o.on('click',function(p){
							//log(p);
						//	open('/analyze/?evt_id=1');
						//})
						MVP.model.setDataURL(o);
					}
				)
				return this;
			},
			getPeopleChart : function(cid){
				var obj = document.getElementById(cid);
				require(
					['echarts','echarts/chart/map'],
					function (ec) {
						var o = ec.init(obj);
						var option = {
							title : {
								text: '人群特征分布',
								subtext: '',
								sublink: '',
								x:'center'
							},
							tooltip : {
								showDelay : 300,
								hideDelay : 300,
								enterable : true,
								trigger: 'item',
								padding : 8,
								formatter : function (params) {
									var label = params[1];
									if (params.value[0]=='-') return label;
									return  '地区 : ' + label + '<br />'
											+ '标题 : 标题标题标题标题' + '<br />'
											+ '摘要：摘要摘要摘要摘要摘要摘要摘要<br />摘要摘要摘要摘要...'
								}
							},
							legend: {
								show : false,
								orient: 'vertical',
								x:'left',
								data:['pm2.5']
							},
							dataRange: {
								min : 0,
								max : 500,
								calculable : true,
								color: ['maroon','purple','red','orange','yellow','lightgreen']
							},
							toolbox: {
								show : true,
								orient : 'vertical',
								x: 'right',
								y: 'center',
								feature : {
									mark : {show: true},
									dataView : {show: true, readOnly: false},
									restore : {show: true},
									saveAsImage : {show: true}
								}
							},
							series : [
								{
									name: 'pm2.5',
									type: 'map',
									mapType: 'china',
									hoverable: false,
									roam:true,
									data : [],
									markPoint : {
										symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
										symbol : 'heart',
										itemStyle: {
											normal: {
												borderColor: '#87cefa',
												borderWidth: 1,            // 标注边线线宽，单位px，默认为1
												label: {
													show: false
												}
											},
											emphasis: {
												borderColor: '#1e90ff',
												borderWidth: 2,
												label: {
													show: false
												}
											}
										},
										data : [
											{name: "事件1", value: 9,itemStyle: {normal:{color: '#FF5C00'}}, label: '四川'},
											{name: "事件2", value: 9,itemStyle: {normal:{color: '#365FD7'}}, label: '四川'},
										]
									},
									geoCoord: {
										"事件1":[101.15,29.89],
										"事件2":[102.15,29.89],
									}
								}
							]
						};
						o.setOption(option);
						o.on('click',function(p){
							open('/analyze/?evt_id=1');
						})
						MVP.model.setDataURL(o);
					}
				)
				return this;
			},
			getWordChart : function(cid,data){
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
							tooltip : {
								//showDelay : 300,
								hideDelay : 1400,
								//backgroundColor:'#000',
								enterable : true,
								trigger: 'item',
								padding : 8,
								formatter : function (params) {
									var label = params[1], rhtm ='', news = params.data.news;
									if (params.value[0]=='-') return label;
									rhtm = '主题词 : ' + label + '<br />';
									rhtm += '标题 ：<ol>';
									for(var ns in news) rhtm += '<li><a href="/analyze/?evt_id='+news[ns].id+'" target="_blank">'+news[ns].title+'</a></li>';
									return  rhtm+'</ol>';
								}
							},
							series: [{
								//name: 'Google Trends',
								type: 'wordCloud',
								//center:['50%', '50%'],
								size: ['100%', '100%'],
								textRotation : [0,90,45,-45],
								textPadding: v,
								data: (function(){
									var lst = [],val;
									for(var d in data){
										val = data[d].count;
										if(val<14) val=14;
										else if(val>36) val=36;
										lst.push({name:data[d].name,value:val,news:data[d].news,itemStyle:createRandomItemStyle()});
									}
									return lst;
								})()
							}]
						};
						o.setOption(option);
						//o.on('click',function(p){
						//	open('/analyze/?evt_id=1');
						//})
						MVP.model.setDataURL(o);
					}
				)
				return this;
			},
			/*getCircle : function(){
				var clist = [
					[{v:60,id:1},{v:70,id:2}],
					[{v:30,id:1},{v:40,id:1},{v:50,id:2},{v:60,id:2}],
					[{v:30,id:1},{v:40,id:1},{v:50,id:2},{v:60,id:2}],
					[{v:30,id:1},{v:40,id:1},{v:50,id:2},{v:60,id:2}],
					[{v:30,id:1},{v:40,id:1},{v:50,id:2},{v:60,id:2}],
					[{v:40,id:1},{v:50,id:2},{v:60,id:2}],
				];
				var x = 0, ev = 100/7, htm='';
				for(var cl in clist){
					x += ev;
					var cld = clist[cl];
					for(var c in cld){
						y = cld[c].v;
						//htm+='<circle cx="'+x+'%" cy="'+y+'%" nid="'+cld[c].id+'" r="20" stroke="#6FB2CC" stroke-width="1.2" fill="rgba(0,0,0,0)"/>';
						htm += '<div class="circle" style="left:'+x+'%;top:'+y+'%"></div>';
					}
				}
				$('#circle').html(htm).find('.circle').hover(function(e){
					var ts = $(this);
					ts.css({width:(parseInt(ts.css('width'))+4),height:(parseInt(ts.css('height'))+4),left:(parseInt(ts.css('left'))-2),top:(parseInt(ts.css('top'))-2)});
					$('#ctip').attr('auto','2').css({display:'block',left:ts[0].offsetLeft+100,top:ts[0].offsetTop});
					MVP.model.setHover(1);
				},function(){
					var ts = $(this);
					ts.css({width:(parseInt(ts.css('width'))-4),height:(parseInt(ts.css('height'))-4),left:(parseInt(ts.css('left'))+2),top:(parseInt(ts.css('top'))+2)});
					MVP.model.setHover(0);
				});
				return this;
			},*/
			changeMenuChart : function(){
				switch(MVP.model.getChartMenu()){
					case 'tml':
						this.timeLine();
						break;
					case 'map':
						this.mapChart();
						break;
					case 'word':
						this.wordChart();
						break;
					case 'people':
						this.getPeopleChart('chart');
						break;
				}
			},
			getSettings : function(){
				var cids = '',
					cid1 = MVP.ctrl.getCheck(1),
					cid2 = MVP.ctrl.getCheck(2);
				if(cid2) for(var c2 in cid2) cid1.push(cid2[c2]);
				return {begin:$('#bgtm').val(),end:$('#edtm').val(),keywords:$('#keyword').val(),cids:cid1.join(',')}
			},
			timeLine : function(){
				MVP.ctrl.ajax({
					arg:this.getSettings(),
					url:'news/monitor',
					suc:function(data){
						MVP.view.getTimeLine('chart',data);
					},
				})
			},
			mapChart : function(){
				MVP.ctrl.ajax({
					arg:this.getSettings(),
					url:'news/location',
					suc:function(data){
						//log(data);
						MVP.view.getMapChart('chart',data);
					},
				})
			},
			wordChart : function(){
				MVP.ctrl.ajax({
					arg:this.getSettings(),
					url:'news/keyword',
					suc:function(data){
						MVP.view.getWordChart('chart',data);
					},
				})
			},
			query : function(){
				this.changeMenuChart();
				//this.getTimeLine('chart');//.getCircle();
			}
		}
	})();
	MVP.ctrl = (function(){
		var _stxtDom = $('#stext'),
			_cicDom = $('.choice-concept'),
			_json = {
				host : 'http://10.13.93.252:8081/',
				//host : 'http://121.40.150.189:8080/',
			},
			_sdata = [],
			_tipslast = '',
			_sdata2 = [],
			_conceptJson = {},
			_checked1 = [],
			_checked2 = [],
			_setMadeHtml =function(){
				var htm = '', parid = _cicDom.attr('parid');
				//if(parid=='1') htm+='疾病名称：';
				for (var a in _sdata) htm+='<span d="'+_sdata[a]+'"><b>'+_conceptJson[_sdata[a]]+'</b><a>×</a></span>';
				if(parid=='1'){
					$('#setbtn1').html(htm);
					$('#setshow1').html(htm);
				}else if(parid=='48'){
					$('#setbtn2').html(htm);
					$('#setshow2').html(htm);
				}
			},
			_findSon = function(o){
				var arr = [],
					getData =function(obj){
						obj.each(function(x,y){
							var ob = $(y).parent().find("dl>dt>input[type='checkbox']:checked"), d = parseInt($(y).parent().attr('d'));
							if(ob.length>0){
								getData(ob);
							}
							else{
								if(arr.indexOf(d)==-1) arr.push(d);
							} 
						})
						/*obj.find('>dt').each(function(i,t){
							var c = $(t).find('>input').attr('checked'),d = parseInt($(t).attr('d')), dl, ck;
							if(c){
								dl = $(t).find('>dl');
								if(dl.length>0){
									ck = dl.find(">dt>input[type='checkbox']:checked");
									if(ck.length>0){
										ck.each(function(x,y){
											arr.push(parseInt($(y).parent().attr('d')));
										})
									}else arr.push(d);
								}else arr.push(d);
							}
						})*/
					};
				getData(o);
				_sdata = arr;
			},
			_findCheck = function(){
				var arr = [], parid = _cicDom.attr('parid'), arrall = [], varall = $('#choicecdl').find("input[type='checkbox']:checked");
				/*$('#choicecdl').find('>dt').each(function(i,t){
					var c = $(t).find('>input').attr('checked'),d = parseInt($(t).attr('d')), dl, ck;
					if(c){
						dl = $(t).find('>dl');
						if(dl.length>0){
							ck = dl.find(">dt>input[type='checkbox']:checked");
							if(ck.length>0){
								ck.each(function(x,y){
									arr.push(parseInt($(y).parent().attr('d')));
								})
							}
							else arr.push(d);
						}else{
							arr.push(d);
						}
					}
				})
				_sdata = arr;*/
				_findSon($('#choicecdl').find(">dt>input[type='checkbox']:checked"));
				varall.each(function(n,m){
					arrall.push(parseInt($(m).parent().attr('d')));
				})
				if(parid=='1'){
					_checked1 = arrall;
					MVP.model.setDiseaseHtml($('#choicecdl').html());
				}
				else if(parid=='48'){
					_checked2 = arrall;
					MVP.model.setSymptomsHtml($('#choicecdl').html());
				}
			},
			_changeCheck = function(parid){
				if(_cicDom.css('display')=='none') _cicDom.show();
				var dhtml1 = MVP.model.getDiseaseHtml(),
					dhtml2 = MVP.model.getSymptomsHtml();
				_cicDom.show().attr('parid',parid);
				if(parid=='1' && dhtml1){
					MVP.model.setDiseaseHtml(dhtml1);
					$('#choicecdl').html(dhtml1);
					$('#choicecdl dt').each(function(x,y){
						var d = parseInt($(y).attr('d'));
						if(_checked1.indexOf(d)!=-1) $(y).find('>input').attr('checked','checked');;
					})
					return;
				}else if(parid=='48' && dhtml2){
					MVP.model.setSymptomsHtml(dhtml2);
					$('#choicecdl').html(dhtml2);
					$('#choicecdl dt').each(function(x,y){
						var d = parseInt($(y).attr('d'));
						if(_checked2.indexOf(d)!=-1) $(y).find('>input').attr('checked','checked');;
					})
					return;
				}
				_ajax({
					arg : {parid:parid},
					url : 'concept',
					suc : function(data){
						var htm = '';
						for(d in data){
							_conceptJson[data[d].id] = data[d].name;
							htm+='<dt d="'+data[d].id+'"><input type="checkbox" />'+data[d].name+'</dt>';
						}
						$('#choicecdl').html(htm);
						if(parid=='1'){
							MVP.model.setDiseaseHtml(htm);
						}else if(parid=='48'){
							MVP.model.setSymptomsHtml(htm);
						}
					}
				});
			},
			_ajax = function(d){
				$.ajax({
					url: _json.host + d.url,
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
		$('#chartMenu>dt').click(function(){
			var tp = $(this).attr('t');
			if(tp=='people') return;
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			
			MVP.model.setChartMenu(tp);
			MVP.view.changeMenuChart(tp);
		})
		$('#openSettings').click(function(){
			var box = $(this).parent().find('.text');
			if(box.css('display')=='none') box.show();
			else box.hide();
		})
		$('#setok').click(function(){
			MVP.view.query();
			_stxtDom.hide();
			_cicDom.hide();
		})
		$('#keyword').keyup(function(e){
			if(e.keyCode==13) return;
			var val = $(this).val();
			if(_tipslast==val) return;
			else _tipslast = val;
			_ajax({
				arg:{prefix:val},
				url:'keyword',
				suc:function(data){
					if(data.length>0){
						var htm = '';
						for(var d in data) htm += '<dt did="' + data[d].id + '">' + data[d].name + '</dt>';
						$('#kwdtips').show().html(htm).find('>dt:eq(0)').addClass('active');
					}else $('#kwdtips').hide();
				},
			})
		}).keydown(function (e) {
			switch (e.keyCode) {
				case 13:
					$('#keyword').val($('#kwdtips>.active').text());
					$('#kwdtips').hide();
					break;
				case 37:
					//log('方向键-左');
					break;
				case 38:
					//log('方向键-上');
					if($('#kwdtips').css('display')=='block'){
						var atv = $('#kwdtips>.active'), idx = atv.index('#kwdtips>dt')-1;
						if(idx<0) return;
						atv.removeClass('active');
						$('#kwdtips>dt:eq('+idx+')').addClass('active');
					}
					break;
				case 39:
					//log('方向键-右');
					break;
				case 40:
					//log('方向键-下');
					if($('#kwdtips').css('display')=='block'){
						var atv = $('#kwdtips>.active'), idx = atv.index('#kwdtips>dt')+1;
						if(idx>=$('#kwdtips>dt').length) return;
						atv.removeClass('active');
						$('#kwdtips>dt:eq('+idx+')').addClass('active');
					}
					break;
			};
			//return false;
		});
		$('.setting .setbtn').click(function(){
			_changeCheck($(this).attr('parid'));
		})
		$('#ctip').hover(function(){
			MVP.model.setHover(1);
		},function(){
			MVP.model.setHover(0);
		})
		$('.setshow,.kwds').click(function(e){
			var tar = e.target,
				obj = $(tar);
			if(tar.nodeName.toLowerCase() === 'a'){
				//obj.parent().remove();
				var parid = parseInt(obj.parent().attr('d')),
					oparid = _cicDom.attr('parid'),
					rparid = obj.parent().parent().parent().find('>.setbtn').attr('parid') || obj.parent().parent().parent().attr('parid');
				if(oparid!=rparid) _changeCheck(rparid);
				$('#choicecdl dt[d='+parid+']>input').attr('checked',false);
				//_sdata = Base.arr.remove({arr:_sdata,k:parid});
				_findCheck();
				_setMadeHtml();
			}
		})
		_cicDom.click(function(e){
			var tar = e.target,
				obj = $(tar),
				prt = obj.parent(),
				parid = parseInt(prt.attr('d')),
				txt = prt.text();
			if(tar.nodeName.toLowerCase() === 'input'){
				if(obj.attr('checked')){
					if(prt.find('>dl').length==0){
						_ajax({
							arg : {parid:parid},
							url : 'concept',
							suc : function(data){
								if(data.length>0){
									var htm = '<dl>';
									for(var d in data){
										_conceptJson[data[d].id] = data[d].name;
										htm += '<dt d="'+data[d].id+'"><input type="checkbox" />'+data[d].name+'</dt>';
									}
									htm += '</dl>';
									obj.parent().append(htm);
								}
								_findCheck();
								_setMadeHtml();
							}
						})
					}else{
						_findCheck();
						_setMadeHtml();
					}
				}else{
					_findCheck();
					//_sdata = Base.arr.remove({arr:_sdata,k:parid});
					_setMadeHtml();
					obj.parent().find('>dl').remove();
				}
			}
		})
		return {
			ajax : function(d){
				_ajax(d);
			},
			gets : function(d){
				return _json[d];
			},
			getCheck : function(arg){
				if(arg==1) return _checked1;
				else if(arg==2) return _checked2;
			}
		}
	})();
	MVP.tml = (function(){
		var mainw = document.getElementById('main').clientWidth,
			mainWidth = parseInt(mainw*0.7),
			_allBegin = Base.tm.getStrTime({t:'year-1'}),
			_allEnd = Base.tm.getStrTime(),
			allbdom = $('#allbegin'),
			alledom = $('#allend'),
			bdom = $('#begin'),
			edom = $('#end'),
			_bgset = $('#bgtm'),//条件设置
			_edset = $('#edtm'),
			_ismove = 0,
			_tmType = 1,
			_allDays = Base.tm.str_def_day(_allBegin,_allEnd),
			_dragWidth = 0.3,
			_dragLeft = 0.7,
			_dragRight = 0,
			_end = _allEnd,
			_begin = Base.tm.str_add_day(_end,-365*_dragWidth),
			params = {
				left: 0,
				top: 0,
				width: parseInt(mainw*0.3),
				currentX: 0,
				currentY: 0,
				isLeft: false,
				isRight: false,
				flag: false
			},
			getCss = function(o,key){		//获取相关CSS属性
				return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
			};
		allbdom.text(_allBegin);
		alledom.text(_allEnd);
		bdom.text(_begin);
		edom.text(_end);
		_bgset.val(_begin);
		_edset.val(_end);

		$('.timeline>.data>.box>a').click(function(){
			var txt = $(this).text(),
				date = $(this).parent().find('span'),
				dateid = date.attr('id'),
				datetxt = date.text(),
				newdate,defday;
			if(txt == '+'){
				newdate = Base.tm.str_add_day(datetxt,_tmType+1),
				defday = Base.tm.str_def_day(newdate,_allEnd);
				if(dateid=='allbegin'&& defday < 365){
					alert('最大可选结束时间与可选开始时间至少需有1年');
					return;
				}
			}else if(txt == '-'){
				newdate = Base.tm.str_add_day(datetxt,-_tmType+1),
				defday = Base.tm.str_def_day(_allBegin,newdate);
				if(dateid=='allend' && defday < 365){
					alert('最大可选结束时间与可选开始时间至少需有1年');
					return;
				}
			}
			date.text(newdate);
			_allBegin = allbdom.text();
			_allEnd = alledom.text();
			_allDays = Base.tm.str_def_day(_allBegin,_allEnd);
			_begin = Base.tm.str_add_day(_allBegin, _allDays*_dragLeft);
			_end = Base.tm.str_add_day(_begin, _allDays*_dragWidth+1);
			edom.text(_end);
			bdom.text(_begin);
			_bgset.val(_begin);
			_edset.val(_end);
			MVP.view.query();
		})
		$('#box>.set').click(function(e){
			var setip = $(this).find('.setip'),
				setxt = $(this).find('span');
			if(setip.css('display')=='none') setip.show();
			else{
				var tar = e.target,
				obj = $(tar),d;
				if(tar.nodeName.toLowerCase() === 'dt'){
					d = obj.attr('d');
					setxt.text(d);
					_tmType = parseInt(d);
				}
				setip.hide();
			}
		})
		return {
			setTmType : function(d){
				_tmType = d;
				return this;
			},
			getTmType :function(){
				return _tmType;
			},
			start : function(bar, target, oLeft, oRight){
				if(getCss(target, "left") !== "auto"){
					params.left = getCss(target, "left");
				}
				if(getCss(target, "top") !== "auto"){
					params.top = getCss(target, "top");
				}
				//o是移动对象
				bar.onmousedown = function(e){
					params.flag = true;
					params.isLeft = false;
					params.isRight = false;
					target.style.width = params.width + 'px';
					/*if(!event){
						event = window.event;
						//防止IE文字选中
						bar.onselectstart = function(){
							return false;
						}  
					}*/
					var e = e || window.event;
					params.currentX = e.clientX;
				};
				oLeft.onmousedown = function(e){
					params.flag = true;
					params.isLeft = true;
					target.style.width = params.width + 'px';
					var e = e || window.event;
					params.currentX = e.clientX;
				};
				oRight.onmousedown = function(e){
					params.flag = true;
					params.isRight = true;
					target.style.width = params.width + 'px';
					var e = e || window.event;
					params.currentX = e.clientX;
				};
				document.onmouseup = function(){
					if(params.flag == true || params.isLeft == true || params.isRight == true){
						params.flag = false;
						params.isLeft = false;
						params.isRight = false;
						params.width = parseInt(target.style.width);
						if(getCss(target, "left") !== "auto"){
							params.left = getCss(target, "left");
						}
						if(getCss(target, "top") !== "auto"){
							params.top = getCss(target, "top");
						}
						if(_ismove>1){
							_ismove = 0;
							MVP.view.query();
						}
					}
				};
				document.onmousemove = function(event){
					var e = event ? event: window.event;
					if(params.flag){
						_ismove ++;
						var nowX = e.clientX,
							disX = nowX - params.currentX,
							moveX = parseInt(params.left) + disX,
							ws;
						
						if(params.isLeft){
							if(_dragLeft>=0){
								target.style.left = moveX + 'px';
								ws = params.width - disX;
								target.style.width = ws + 'px';
								_dragWidth = ws/mainw;
								_dragLeft = moveX/mainw;
								bdom.text(_begin);
								_bgset.val(_begin);
							}
						}
						else if(params.isRight){
							if((_dragWidth+_dragLeft)<=1){
								ws = params.width + disX;
								target.style.width = ws + 'px';
								_dragWidth = ws/mainw;
								_end = Base.tm.str_add_day(_begin, _allDays*_dragWidth+1);
								edom.text(_end);
								_edset.val(_end);
							}
						}else{
							if(moveX>=-1&&moveX<=mainWidth){
								target.style.left = moveX + 'px';
								
								_dragLeft = moveX/mainw;
								_begin = Base.tm.str_add_day(_allBegin, _allDays*_dragLeft);
								_end = Base.tm.str_add_day(_begin, _allDays*_dragWidth+1);
								edom.text(_end);
								bdom.text(_begin);
								_bgset.val(_begin);
								_edset.val(_end);
							}
						}
					}
				}
				return this;
			}
		}
	})();
	MVP.init = (function(){
		this.view.query();
		var oBox = document.getElementById("box"),
			oBar = document.getElementById("bar"),
			oLeft = document.getElementById("tleft"),
			oRight = document.getElementById("tright");
		this.tml.start(oBar, oBox, oLeft, oRight);
	})
	window.MVP = MVP;
})();
MVP.init();