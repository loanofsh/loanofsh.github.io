//来来来，到这里运行你的Javascript
function jayfunction() {    
define(["framework7.min"],function() {
    //实例化app
	var app = new Framework7({
		animateNavBackIcon: true
	});
	var $7 = Dom7;
	// Add view 实例化view层
	var mainView = app.addView('.view-main', {
		dynamicNavbar: true
	});
});
//@jayfunction end
};