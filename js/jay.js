//来来来，到这里运行你的Javascript
function jayfunction() {
console.log("running Jay function");
/*require(["fastclick"],function(Fastclick){
    Fastclick.attach(document.body);
}); */   
require(["framework7.min","jquery-1.11.1.min"],function() {
    //实例化app
	var app = new Framework7({
        //fastClicks:false,
        swipePanelThreshold:30,
        onAjaxStart:function(){
            app.showPreloader();
        },
        onAjaxComplete:function() {
            app.hidePreloader();
        },
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
        console.log(loginformData);
        if ( loginformData.tel_num != "13800138000" || loginformData.psw !== "123456") {
            app.alert("<span class='txa-l' style='display:block;'>用户名:13800138000</br>密码:123456</span>","提示：");
        } else {
            mainView.router.load({
                url:"user_index.html"
            });
        }
    });
    
    app.onPageAfterAnimation("user_index",function(page) {
        var closefunction = function() {
            mainView.showNavbar();
            $(".user-index-noti").off("click");
            $(".user-index-noti").on("click", function(e) {
                mainView.hideNavbar();
                showfunction();
            });
            $(".user_index_show_noti").remove();
        };
        var showfunction = function() {
            mainView.hideNavbar();
            app.addNotification({
                additionalClass:"user_index_show_noti",
                onClose:function() {
                    closefunction();
                },
                title:"Hello world",
                message:"yes"
            });
        };
        showfunction();
        app.params.swipePanel = "left";
        $('.panel-left').on('opened.uiside', function() {
            closefunction();
        }).on("click", ".item-link", function(e) {
            app.closePanel();
        });
    });
    /*app.onPageBeforeRemove("user_index", function() {
        app.params.swipePanel = "right";
        $('.panel-left').off('.uiside');
    });*/
    $7(document).on('pageAfterAnimation',function(e) {
        var pageArry = e.detail.page;
        if (pageArry.name != "user_index") {
            app.params.swipePanel = "right";
            $('.panel-left').off('.uiside');
        }
    });
});
//@jayfunction end
}