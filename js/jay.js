//来来来，到这里运行你的Javascript
function jayfunction() {
console.log("running Jay function");
require(["framework7.min"],function() {
    //实例化app
	var app = new Framework7({
		animateNavBackIcon: true,
        swipePanel: 'right'
	});
	var $7 = Dom7;
	// Add view 实例化view层
	var mainView = app.addView('.view-main', {
		dynamicNavbar: true
	});
    mainView.hideNavbar();
    $7("#test").on("click",function() {
       app.params.swipePanel = false;
    });
    console.log(app)
    
});
//@jayfunction end
}