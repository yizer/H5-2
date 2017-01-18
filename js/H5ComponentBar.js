/* 柱状图组件对象 */

var H5ComponentBar =function ( name, cfg ) {
   var component =  new H5ComponentBase( name ,cfg );

    $.each( cfg.data,function (idx,item) {
      var line =$('<div class="line">');
      var name =$('<div class="name">');
      var rate =$('<div class="rate">');
      var per =$('<div class="per">');

      var width = item[1]*100 + '%';

      if (item[2]) {
        var bgStyle = 'style = "background-color:'+item[2]+'"';
      }

      rate.css('width',width);
      rate.html('<div class="bg"'+bgStyle+'></div>')


      per.text(width);
      name.text(item[0]);
      line.append(name).append(rate).append(per);
      component.append(line);

    });
   return component;
}
