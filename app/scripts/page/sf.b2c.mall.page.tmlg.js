define(
  'sf.b2c.mall.page.tmlg',
  [
    'can',
    'zepto',
    'fastclick',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
  	'sf.b2c.mall.widget.message',
  	'sf.b2c.mall.api.user.regstAocart4Pmter'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness, SFMessage, SFRegstAocart4Pmter) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    errorMap = {
    	"1000020": "账户已注册",
    	"1000470": "邀请人并非推广员"
    };

    var tmlgPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
      	var that = this;
        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {
      },

      /**
       * @author zhang.ke
       * @description 从服务器端获取数据
       */
	    initRegstAocart4Pmter: function(inviterMobile, inviteeMobile, itemIds) {
	      var that = this;
	      var regstAocart4Pmter = new SFRegstAocart4Pmter({
	      	"inviterMobile": inviterMobile,
	      	"inviteeMobile": inviteeMobile,
	      	"itemIds": itemIds,
	      });
	      return regstAocart4Pmter.sendRequest()
	        .done(function(result) {
	        })
	        .fail(function(error) {
	        	new SFMessage(null, {
		          'tip': errorMap[error],
		          'type': 'error'
		        });
	        });
	    },

	    "#submit-form-btn click": function() {

	    },

      submitForm: function() {

      	var promoterPhone = $("[name=promoterPhone]").val();
      	var customerPhone = $("[name=customerPhone]").val();
      	var itemIds = $("[name=itemIds]").val();

      	can.when(this.initRegstAocart4Pmter(promoterPhone, customerPhone, itemIds))
      		.done(function(result) {
      			if (result.value) {
      				new SFMessage(null, {
			          'tip': '操作成功!',
			          'type': 'error'
	        		});
      			} else {
      				new SFMessage(null, {
			          'tip': '操作失败!',
			          'type': 'error'
	        		});
      			}
      		})
      },

	    trim: function(str) {
	      return str.replace(/(^\s*)|(\s*$)/g, "");
	    }

    });

    new tmlgrPage();
  })
