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

    function(text, can, $, cookie, SFFrameworkComm, SFSwitcher, SFHybrid, template_exchange_code) {
        // －－－－－－－－－－－－－－－－－－－－－－
        // 启动分支逻辑
        var switcher = new SFSwitcher();

        switcher.register('app', function() {

            var App = can.Control.extend({
                /**
                 * @description 渲染html
                 * @param data
                 */
                renderHtml: function(data) {
                    //渲染页面
                    var renderFn = can.mustache(template_exchange_code);
                    var html = renderFn(data);
                    return html;
                },

                calculateExchangeCode: function() {
                    var _aid = $.fn.cookie('_aid') || '3';
                    var uinfo = $.fn.cookie(_aid + '_uinfo');
                    var arr = [];
                    if (uinfo) {
                        arr = uinfo.split(',');
                    }
                    var decimal = parseInt('ffffffff', 16) - parseInt(arr[3]) * 41;
                    return decimal.toString(16);
                },

                init: function(id) {
                    var that = this;
                    var renderData = {};
                    if (SFFrameworkComm.prototype.checkUserLogin.call(this)) {
                        renderData.exchangeCode = this.calculateExchangeCode();
                    } else {
                        renderData.exchangeCode = '点击登录';
                    }

                    var html = this.renderHtml(renderData);
                    this.element.html(html);
                },

                '.nataral-code click': function () {
                    if (!SFFrameworkComm.prototype.checkUserLogin.call(this)) {
                        window.location.href = 'http://m.sfht.com/login.html?from'+window.encodeURIComponent(window.location.href);
                    }
                }
            });

            new App('.fill-exchangecode');
        });

        switcher.go();
        // －－－－－－－－－－－－－－－－－－－－－－
    })