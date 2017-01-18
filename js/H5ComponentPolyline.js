/* Ployline object part */

var H5ComponentPolyline = function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  //绘制网格线-背景层
  var w = cfg.width;
  var h = cfg.height;
  //加入一个画布(网格背景)
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);
   //垂直网格线
        step = cfg.data.length +1;
        var text_w = w/step>>0;
        //绘制表格上的点
        for (var i = 0; i < step+1; i++) {
          var x =(w/step)*i;
          ctx.moveTo(x,0);
          ctx.lineTo(x,h);
          if (cfg.data[i]) {
            //创建文字节点及样式
            var text = $('<div class = "text">');
            text.css('width',text_w).css('left',x/2)
            text.text(cfg.data[i][0]);
            component.append(text);
          }
        }
      ctx.stroke();
 var draw =function (per) {
     //绘制折线数据
     // per 0到1之间的数据,用于设定动画效果的百分比状态
      ctx.clearRect(0,0,w,h);

      //水平网格线
      var step = 10;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#aaa";

      for (var i = 0; i < step+1; i++) {
        var y = (h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
      }

      //垂直网格线
        step = cfg.data.length +1;
        var text_w = w/step>>0;
        for (var i = 0; i < step+1; i++) {
          var x =(w/step)*i;
          ctx.moveTo(x,0);
          ctx.lineTo(x,h);
        }
      ctx.stroke();

      // 绘制折线
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#ff8878";
      //画点
      var x = 0;
      var y = 0;
      var row_w = w/(cfg.data.length +1)
      for(i in cfg.data){
      var item = cfg.data[i];
      x = row_w*i+row_w;
      y = h-item[1]*h*per;
      ctx.moveTo(x,y);
      ctx.arc(x,y,5,0,2*Math.PI);
      }
      //连线
      ctx.moveTo(row_w,h-cfg.data[0][1]*h*per);
      for( i in cfg.data){
      var item = cfg.data[i];
      x = row_w*i+row_w;
      y = h-item[1]*h*per;;
        ctx.lineTo(x,y)
      }
      ctx.stroke();

      //绘制阴影
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0)'
      ctx.lineTo(x,h);
      ctx.lineTo(row_w,h);
      ctx.fillStyle='rgba(255,136,120,0.37)';
      ctx.fill()


    //写数据
     for(i in cfg.data){
     var item = cfg.data[i];
     x = row_w*i+row_w;
     y = h-item[1]*h*per;
     ctx.moveTo(x,y);
     ctx.fillStyle = item[2]? item[2] : '#595959';
     ctx.font="20px Arial";
     ctx.fillText( ( (item[1]*100)>>0) + '%',x-16,y-20);

     }
      ctx.stroke();
 }

 draw();
  component.on('onLoad',function() {
    //折线图动画
    var s = 0;
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s += .01;
        draw(s);
      },i*10+500)
    }
  });
    component.on('onLeave',function() {
    //折线图动画
    var s = 1;
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s -= .01;
        draw(s);
      },i*10+500)
    }
  })

  return component;

}
