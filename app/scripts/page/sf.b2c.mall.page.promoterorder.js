define(
  'sf.b2c.mall.page.promoterorder',
  [
    'can',
    'zepto',
    'fastclick',
    'store',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',
  	'sf.b2c.mall.widget.message',
  	'sf.b2c.mall.api.user.regstAocart4Pmter'
  ],
  function(can, $, Fastclick, store, SFFrameworkComm, SFFn, SFBusiness, SFMessage, SFRegstAocart4Pmter) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    errorMap = {
    	"1000020": "账户已注册",
    	"1000470": "邀请人并非推广员"
    };

    var promoterorderPage = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
      	var that = this;
        var sf_promoter_phone = store.get('sf_promoter_phone');
        if (sf_promoter_phone) {
          $("[name=promoterPhone]").val(sf_promoter_phone);
        }
      	$("#submit-form-btn").on("click", function() {
      		that.submitForm();
      	});
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
        var itemIds = [];
        var itemId1 = this.trim($("[name=itemId1]").val() || "");
        var itemId2 = this.trim($("[name=itemId2]").val() || "");
        var itemId3 = this.trim($("[name=itemId3]").val() || "");
        var itemId4 = this.trim($("[name=itemId4]").val() || "");
        var itemId5 = this.trim($("[name=itemId5]").val() || "");
        if (itemId1) {
          itemIds.push(itemId1);
        }
        if (itemId2) {
          itemIds.push(itemId2);
        }
        if (itemId3) {
          itemIds.push(itemId3);
        }
        if (itemId4) {
          itemIds.push(itemId4);
        }
        if (itemId5) {
          itemIds.push(itemId5);
        }

        itemIds = itemIds.join(",");
      	if (!promoterPhone) {
      		new SFMessage(null, {
	          'tip': '请填写推广员手机号码！',
	          'type': 'error'
	        });
	        return;
      	}
      	if (!customerPhone) {
      		new SFMessage(null, {
	          'tip': '请填写用户手机号码！',
	          'type': 'error'
	        });
	        return;
      	}

      	promoterPhone = this.trim(promoterPhone);
      	customerPhone = this.trim(customerPhone);
      	itemIds = this.trim(itemIds);

      	if (!this.validCellphone(promoterPhone)) {
					new SFMessage(null, {
	          'tip': '推广员手机号码填写有误!',
	          'type': 'error'
	        });
	        return;
      	}
      	if (!this.validCellphone(customerPhone)) {
					new SFMessage(null, {
	          'tip': '用户手机号码填写有误!',
	          'type': 'error'
	        });
	        return;
      	}

        store.set('sf_promoter_phone', promoterPhone);

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

      validCellphone: function(cellphone) {
      	if (!/^1\d{10}$/.test(cellphone)) {
        	return false;
      	} else {
      		return true;
      	}
      },

	    trim: function(str) {
	      return str.replace(/(^\s*)|(\s*$)/g, "");
	    }

    });

    new promoterorderPage();
  })
