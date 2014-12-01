//配置页面加载模块参数
require.config({
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'css.min'
		}
	},
	//配置Javascript文件映射路径
	paths: {
		"modernizr"			:"modernizr.custom",
		//"Framework7"		:"framework7.min",
		//"jquery"			:"jquery-1.11.1.min",
		"jay"				:"jay"
	},
	shim: {//模块依赖关系 demo
		//'swiperscrollbar': {deps:['swiper']},
		//'swiper': {deps: ['jquery']},
		//'jay'  : {deps: ['swiper','swiperscrollbar']}
	}
});



//加载对应css模块
require([
//	"css!http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min",
//	"css!../css/style1",
//	"css!../css/style2"
]);



//配置页面加载模块
require(['modernizr'],function(modernizr) {
	!Modernizr.cssanimations?window.location="np.html":'';
});


require(['domReady'], function (domReady) {
	domReady(function () {
	require(['jay'],function() {
        jayfunction()
    });
	//@Dom ready
	});
});

