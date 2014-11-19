//来来来，到这里运行你的Javascript
function jayfunction() {
console.log("running Jay function");
require(["framework7.min"],function() {
    //实例化app
	var app = new Framework7({
		animateNavBackIcon: true
	});
	var $7 = Dom7;
	// Add view 实例化view层
	var mainView = app.addView('.view-main', {
		dynamicNavbar: true
	});
    mainView.hideNavbar();
    console.log(mainView)
    
});
//@jayfunction end
}