/* 饼图组件 */

var H5ComponentPie = function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  //绘制网格线-背景层
  var w = cfg.width;
  var h = cfg.height;


  //加入一个画布
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);
  $(cns).css("zIndex",1);
  var r = w/2;

  //加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = "#E2DCDC";
  ctx.strokeStyle = "#E2DCDC";
  ctx.lineWidth = 1;
  ctx.arc(r, r, r, 0 , 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  //绘制一个数据层
  // var cns1 = document.createElement('canvas');
  // var ctx1 = cns.getContext('2d');
  // cns1.width = ctx1.width = w;
  // cns1.height = ctx1.height = h;
  // component.append(cns1);
  var colors = ['red','green','blue','orange','grey']
  var sAngel = 1.5 * Math.PI;// 十二点位置
  var eAngel = 0;// 结束角度
  var aAngel = Math.PI * 2;// 100%圆结束的角度

  var step = cfg.data.length;
  for (var i = 0; i < step; i++) {
    var item = cfg.data[i];
    var color = item[2] || (item[2] = colors.pop());
    eAngel = sAngel + aAngel * item[1];
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.1;
    ctx.moveTo(r, r);
    ctx.arc(r, r, r, sAngel ,eAngel );
    ctx.fill();
    ctx.stroke();


    //加入所有项目文本以及百分比
    var text = $("<div class = 'text'>/<div>");
    text.text(cfg.data[i][0]);

    component.append(text);
    var per = $("<div class = 'per'>/<div>");
    per.text(cfg.data[i][1] * 100 + "%");
    text.append(per);

    var x = r + Math.cos(sAngel + (eAngel - sAngel) /2) * r * 1.4;
    var y = r + Math.sin(sAngel + (eAngel - sAngel) /2) * r * 1.4;
    if (x < r) {
      text.css("left",x/2);
    }else{
      text.css("right",(w-x)/2);
    }
     if (y < r) {
      text.css("top",y/2);
    }else{
      text.css("bottom",(h-y)/2);
    }
    if (cfg.data[i][2]) {
      text.css("color",cfg.data[i][2])
    }
    text.css("opacity",0)
    sAngel = eAngel;
  }

  //加入一个蒙版层
  var cns1 = document.createElement('canvas');
  var ctx1 = cns1.getContext('2d');
  cns1.width = ctx1.width = w;
  cns1.height = ctx1.height = h;
  $(cns1).css("zIndex",3);
  component.append(cns1);

  //生长动画
   var draw =function (per) {
     ctx1.clearRect(0,0,w,h);
     ctx1.beginPath();
     ctx1.fillStyle = "#eee";
     var R = r + 1
     ctx1.moveTo(r,r)
     if (per <= 0) {
       ctx1.arc(r, r, R, 0, 2 * Math.PI);
       component.find(".text").css("opacity",0)
     }else{
       ctx1.arc(r, r, R, 1.5 * Math.PI , 2 * Math.PI * per + 1.5 * Math.PI,true);
     }
     ctx1.fill();
     if (per >= 1) {
       component.find(".text").css("opacity",1)
     }
   }
   //先绘制表面蒙板
    draw(0);
  component.on('onLoad',function() {

    //饼图动画
    var s = 0;
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s += .01;
         draw(s);
      },i*10)
    }
  });
    component.on('onLeave',function() {
    //饼图动画
    var s = 1;
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s -= .01;
        draw(s);
      },i*10)
    }
  })

   return component;

}
