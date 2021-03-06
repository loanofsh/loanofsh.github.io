//来来来，到这里运行你的Javascript
function jayfunction() {
console.log("running Jay function");
/*require(["fastclick"],function(Fastclick){
    Fastclick.attach(document.body);
}); */
require.config({
	shim:{
		"jquery.scrollbox": {
			deps:['jquery-1.11.1.min']
		}
	}
})
require(["framework7.min","jquery.scrollbox"],function() {
	//实例化app
    var PreloaderTimer;
    var showPreloaderTimer;
	var app = new Framework7({
        //fastClicks:false,
        modalTitle:"个人贷",
        modalButtonOk:"确定",
        modalPreloaderTitle:"加载中...",
        modalButtonCancel:"取消",
        swipePanelActiveArea:false,
        onAjaxStart:function(){
            showPreloaderTimer = setTimeout(function() {
                app.showPreloader();
            },120);
            //当1分钟你的网络还没有反应的话，那么抛出超时交互流程
            PreloaderTimer = setTimeout(function() {
                app.hidePreloader();
                app.alert('似乎你的网络出了点问题','');
            }, 6000);
        },
        onAjaxComplete:function() {
            clearTimeout(showPreloaderTimer);
            clearTimeout(PreloaderTimer);
            app.hidePreloader();
        },
		animateNavBackIcon: true
//		,swipePanel: 'right'
	});
    window.appframe = app;
	var $7 = Dom7;
	// Add view 实例化view层
	var mainView = app.addView('.view-main', {
		dynamicNavbar: true
	});
    mainView.hideNavbar();
    app.hidePreloader();
    
	
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
				closeOnClick:true,
                onClose:function() {
                    closefunction();
                },
                custom:(function() {
					var html = $("<div>");
					html.append('<div id="scroll-text" class="scroll-text"><ul></ul></div>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息1</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息2</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息3</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息4</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息5</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息6</li>');
					html.find('#scroll-text ul').append('<li>个人贷广告通知信息7</li>');
					html = html.html();
					return html;
				})()
            });
			$('#scroll-text').scrollbox();
        };
        showfunction();
//        app.params.swipePanel = "left";
        $('.panel-left').on('opened.uiside', function() {
            closefunction();
//			app.params.swipePanelActiveArea = false;
        }).on("click", ".item-link", function(e) {
            app.closePanel();
        }).on('closed', function(e) {
//			app.params.swipePanelActiveArea = 20;
		});
		
		
        $("#feedback").off(".feedback_btn");
        $("#feedback").on("click.feedback_btn", function(e) {
            var popupHTML = '<div class="popup feedback-popup">'+
                    '<div class="list-block inset">'+
                    '<ul>'+
                        '<li>'+
                            '<div class="item-content">'+
                                '<div class="item-inner">'+
                                    '<div class="item-input">'+
                                        '<textarea placeholder="意见反馈"></textarea>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="content-block">'+
                        '<div class="row">'+
                            '<div class="col-50"><a href="#" class="button button-big button-fill color-red button-round close-popup">取消</a></div>'+
                            '<div class="col-50"><a href="#" class="button button-big button-fill color-green button-round" id="feedback_send">发送</a></div>'+
                        '</div>'+
                    '</div>'+
                  '</div>';
            app.popup(popupHTML);
            $(".feedback-popup").on("opened", function() {
               $("#feedback_send").on("click", function() {
                    app.showPreloader("发送中...");
                    //模拟发送成功
                    setTimeout(function(){
                        app.hidePreloader();
                        app.alert("您的意见我们已收到，感谢！","");
                        app.closeModal(".feedback-popup");
                    }, 300)
               });
            });
            
        });
        
        
        $("#Invite_friends").off('.inv');
        $("#Invite_friends").on('click.inv', function(e) {
            app.prompt('邀请好友(手机号码)','', function(val) {
                if (val == '' || val == null ) {
                    app.alert('您没有邀请任何人','');
                    return;
                }
                app.alert('已经向'+val+'发送邀请','');
            })
        });
    });
    /*app.onPageBeforeRemove("user_index", function() {
        app.params.swipePanel = "right";
        $('.panel-left').off('.uiside');
    });*/
    $7(document).on('pageAfterAnimation',function(e) {
        var pageArry = e.detail.page;
        if (pageArry.name != "user_index") {
//            app.params.swipePanel = "right";
            $('.panel-left').off('.uiside');
        }
        console.log(mainView.activePage.name)
        if (mainView.activePage.name !== 'user_index' && mainView.activePage.name !== "index") {
            app.closeNotification();
            $(".user_index_show_noti").remove();
            mainView.showNavbar();
        }
		
		if (mainView.activePage.name === 'index') {
			mainView.hideNavbar();
		}
		
    }).on("pageInit", function(e) {
		var pageArry = e.detail.page;
		if (pageArry.name == "user_setting") {
			//安全退出按钮
			$("#safe_exit").on("click", function(e) {
				app.confirm("确定退出？","", function() {
					mainView.router.load({
						url:"index.html"
					})
				})
			});
		}
		
		
		if (pageArry.name == "user_integration") {
			$("#ingBtn").on("click", function() {
					var buttons1 = [
						{
							text: '积分操作',
							label: true
						},
						{
							text: '积分充值',
							bold: true,
							onClick:function() {
								mainView.router.load({
									url:"user_recharge.html"
								})
							}
						},
						{
							text: '积分转让',
							onClick:function() {
								mainView.router.load({
									url:"user_integ_transfer.html"
								})
							}
						},
						{
							text: '积分记录',
							onClick:function() {
								mainView.router.load({
									url:"user_integ_rec.html"
								})
							}
							
						}
					];
					var buttons2 = [
						{
							text: '取消',
							color: 'red'
						}
					];
					var groups = [buttons1, buttons2];
					app.actions(groups);
			})
		}
			
    });
});
//@jayfunction end
}