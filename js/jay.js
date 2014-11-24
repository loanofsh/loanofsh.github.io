//来来来，到这里运行你的Javascript
function jayfunction() {
console.log("running Jay function");
require(["framework7.min","jquery-1.11.1.min"],function() {
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
    //用户登录
    $7(".views").on("click", "#userlogin", function(e) {
        var loginformData = app.formToJSON("#USER_LOGIN_FORM");
        console.log(loginformData)
        if ( loginformData.tel_num != "13800138000" || loginformData.psw !== "123456") {
            app.alert("<span class='txa-l' style='display:block;'>用户名:13800138000</br>密码:123456</span>","提示：")
        } else {
            mainView.router.load({
                url:"user_index.html"
            });
        }
    });
    
    app.onPageInit("user_index",function(page) {
        var closefunction = function() {
            mainView.showNavbar();
            $(".user-index-noti").off("click");
            $(".user-index-noti").on("click", function(e) {
                console.log(1)
                mainView.hideNavbar();
                showfunction();
            });
            $(".user_index_show_noti").remove();
        };
        var showfunction = function() {
            app.addNotification({
                additionalClass:"user_index_show_noti",
                onClose:function() {
                    closefunction();
                },
                title:"Hello world",
                message:"yes"
            })
        };
        showfunction();
        
    });
});
//@jayfunction end
}