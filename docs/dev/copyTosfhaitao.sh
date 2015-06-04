frompath=/Users/jiyanliang/haitao-b2c-h5
topath=/Users/jiyanliang/sfhaitao

echo "copy from: "  $frompath  " to: "  $topath

echo "copy order..."
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.gotopay.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.gotopay.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.order.detail.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.order.detail.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.order.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.order.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.order.list.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.order.list.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.paysuccess.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.paysuccess.js
echo "copy order finished."

echo "copy center..."
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.center.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.center.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.coupon.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.coupon.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.luckymoneyaccept.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.luckymoneyaccept.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.luckymoneyshare.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.luckymoneyshare.js
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.recaddrmanage.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.recaddrmanage.js
echo "copy center finished."

echo "copy detail..."
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.detail.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.detail.js
echo "copy detail finished."

echo "copy main..."
cp ${frompath}/.tmp/concat/scripts/sf.b2c.mall.h5.page.main.js  ${topath}/www/order/scripts/sf.b2c.mall.h5.page.main.js
echo "copy main finished."