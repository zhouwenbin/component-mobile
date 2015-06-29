define(
    'sf.b2c.mall.module.exchangecode', [
        'text',
        'can',
        'zepto',
        'zepto.cookie',
        'sf.b2c.mall.framework.comm',
        'sf.env.switcher',
        'sf.hybrid',
        'text!template_exchange_code'
    ],

    function(text, can, $, cookie, SFSwitcher, SFFrameworkComm, SFHybrid, template_exchange_code) {
        // －－－－－－－－－－－－－－－－－－－－－－
        // 启动分支逻辑
        var switcher = new SFSwitcher();

        switcher.register('app', function() {
            var app = {
                initialize: function() {
                    this.bindEvents();
                },

                bindEvents: function() {
                    document.addEventListener('deviceready', this.onDeviceReady, false);
                },

                onDeviceReady: function() {
                    app.receivedEvent('deviceready');
                },

                /**
                 * @description 渲染html
                 * @param data
                 */
                renderHtml: function(data) {
                    //渲染页面
                    var renderFn = can.mustache(template_exchange_code);
                    var html = renderFn(data);
                    this.element.html(html);
                },

                calculateExchangeCode: function(){
                    var uinfo = $.fn.cookie('3_uinfo');
                    var arr = [];
                    if (uinfo) {
                      arr = uinfo.split(',');
                    }
                    var decimal = parseInt('ffffffff',16)-parseInt(arr[3])*41;
                    return decimal.toString(16);
                }

                receivedEvent: function(id) { 
                    var that = this;
                    var renderData={};
                    if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
                         renderData.exchangeCode = calculateExchangeCode();
                    }else{
                        renderData.exchangeCode = '请登入后查看';
                    }
                    renderHtml(renderData);
                }
            };

            app.initialize();
        });

        switcher.go();
        // －－－－－－－－－－－－－－－－－－－－－－
    })
