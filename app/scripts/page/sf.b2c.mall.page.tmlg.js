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
  	'sf.b2c.mall.api.user.exchangeToken'
  ],
  function(can, $, Fastclick, SFFrameworkComm, SFFn, SFBusiness, SFMessage, SFExchangeToken) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var tmlgPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
      	var that = this;

        var params = can.deparam(window.location.search.substr(1));
        var tempToken = params.tt;
        if (tempToken) {
          this.initExchangeToken(tempToken);
        }
      },


      /**
       * @author zhang.ke
       * @description 从服务器端获取数据
       */
	    initExchangeToken: function(tempToken) {
	      var that = this;
	      var exchangeToken = new SFExchangeToken({
	      	"tempToken": tempToken
	      });
	      return exchangeToken.sendRequest()
	        .done(function(result) {
            window.location.href = "/shoppingcart.html";
	        })
	        .fail(function(error) {
            new SFMessage(null, {
              'tip': "登录信息已过期",
              'type': 'error'
            });
	        });
	    },

	    trim: function(str) {
	      return str.replace(/(^\s*)|(\s*$)/g, "");
	    }

    });

    new tmlgPage();
  })
