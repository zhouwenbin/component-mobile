1、执行打包。进入haitao-b2c-web目录执行如下命令

    ```
    grunt build:dev
    ```

2、文件压缩。进入dist目录，执行zip压缩

    ```
    cd dist
    zip -r dist.zip ./*
    ```

3、文件上传。文件上传到jiyanliang用户(密码：jiyanliang2)

    ```
    scp dist.zip jiyanliang@115.28.235.112:/home/jiyanliang
    ```

4、文件拷贝。使用jiyanliang用户登录开发环境115.28.235.112，执行如下命令

    ```
    ssh jiyanliang@115.28.235.112
    scp dist.zip jiyanliang@10.144.128.222:/home/jiyanliang

    ssh jiyanliang@10.144.128.222
    sudo cp dist.zip /home/admin/h5
    ```

5、文件解压。切换到admin用户下，进入statics目录后，确认有dist文件，使用admin用户执行解压

    ```
    sudo su admin
    cd
    cd h5
    unzip -o -d /home/admin/h5 dist.zip
    ```

--------------
zepto的各种坑：

1、编译zepto(有的有顺序，建议这个顺序即可):
MODULES="zepto event ajax form ie detect fx fx_methods assets data deferred callbacks selector touch gesture stack ios3" npm run-script dist

2、在

    ```
    window.Zepto = Zepto
    '$' in window || (window.$ = Zepto)
    ```

后增加如下代码，以便支持requirejs

    ```
    if ( typeof define === "function" && define.amd ) {
        define( "zepto", [], function () { return Zepto; } );
    }
    ```

3、加入如下代码，以支持微信的滑动

    ```
    if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 10){
          e.preventDefault()
        }
    ```
在如下方法中增加

    ```
    .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)

        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 10){
          e.preventDefault()
        }
      })
    ```