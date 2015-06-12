frompath=/Users/jiyanliang/haitao-b2c-h5/.tmp/concat/scripts
topath=/Users/jiyanliang/sfhaitao/platforms/ios/www

echo "copy from: "  $frompath  " to: "  $topath

echo "copy order..."
cp ${frompath}/sf.b2c.mall.h5.page.gotopay.js  ${topath}/order/scripts/sf.b2c.mall.h5.page.gotopay.js
cp ${frompath}/sf.b2c.mall.h5.page.order.detail.js  ${topath}/order/scripts/sf.b2c.mall.h5.page.order.detail.js
cp ${frompath}/sf.b2c.mall.h5.page.order.js  ${topath}/order/scripts/sf.b2c.mall.h5.page.order.js
cp ${frompath}/sf.b2c.mall.h5.page.order.list.js  ${topath}/order/scripts/sf.b2c.mall.h5.page.order.list.js
cp ${frompath}/sf.b2c.mall.h5.page.paysuccess.js  ${topath}/order/scripts/sf.b2c.mall.h5.page.paysuccess.js
echo "copy order finished."

echo "copy center..."
cp ${frompath}/sf.b2c.mall.h5.page.center.js  ${topath}/center/scripts/sf.b2c.mall.h5.page.center.js
cp ${frompath}/sf.b2c.mall.h5.page.coupon.js  ${topath}/center/scripts/sf.b2c.mall.h5.page.coupon.js
cp ${frompath}/sf.b2c.mall.h5.page.luckymoneyaccept.js  ${topath}/center/scripts/sf.b2c.mall.h5.page.luckymoneyaccept.js
cp ${frompath}/sf.b2c.mall.h5.page.luckymoneyshare.js  ${topath}/center/scripts/sf.b2c.mall.h5.page.luckymoneyshare.js
cp ${frompath}/sf.b2c.mall.h5.page.recaddrmanage.js  ${topath}/center/scripts/sf.b2c.mall.h5.page.recaddrmanage.js
echo "copy center finished."

echo "copy detail..."
cp ${frompath}/sf.b2c.mall.h5.page.detail.js  ${topath}/detail/scripts/sf.b2c.mall.h5.page.detail.js
echo "copy detail finished."

echo "copy main..."
cp ${frompath}/sf.b2c.mall.h5.page.main.js  ${topath}/main/scripts/sf.b2c.mall.h5.page.main.js
echo "copy main finished."